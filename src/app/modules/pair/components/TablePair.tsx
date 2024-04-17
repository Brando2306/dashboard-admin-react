import React, {useContext, useState, useEffect} from 'react'
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd'
import {PairContext} from '../context/PairContext'
import {toast} from 'react-toastify'
import CustomTooltip from '../../../../_metronic/helpers/components/CustomTooltip'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import {ItemTablePair} from './ItemTablePair'
import { PairPositionQueryParamsModel } from '../../../../domain/pair/models/pair.model'

type Props = {
  className: string
}

const TablePair: React.FC<Props> = ({className}) => {
  const {sendPositions, getPairs, pairs, totalPairs, isLoading, error} = useContext(PairContext)
  const [pageNumber, setPageNumber] = useState(1)
  const [searchFilter, setSearchFilter] = useState('')
  const [pageSize] = useState(10)
  const messageTooltip = 'Esta es la palabra que se escuchará en la aplicación móvil'

  useEffect(() => {
    getPairs({page_number: pageNumber, page_size: pageSize, search: searchFilter})
  }, [pageNumber, pageSize])

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return
    const updatedPairs = Array.from(pairs)
    const [reorderedPair] = updatedPairs.splice(result.source.index, 1)
    updatedPairs.splice(result.destination.index, 0, reorderedPair)

    const startIndex = (pageNumber - 1) * pageSize
    // const endIndex = startIndex + pageSize

    const listPairsIndex: number[] = []
    const listPositionsIndex: number[] = []

    updatedPairs.forEach((pair, index) => {
      listPairsIndex.push(pair.ParesID!)
      const position = startIndex + index + 1
      listPositionsIndex.push(position)
    })

    const data: PairPositionQueryParamsModel = {
      pairs: listPairsIndex,
      positions: listPositionsIndex,
    }

    try {
      const error = await sendPositions(data)
      if (error != null) {
        toast.error(error)
      } else {
        toast.success('Las posiciones han sido actualizadas.')
        await getPairs({page_number: pageNumber, page_size: pageSize, search: searchFilter})
      }
    } catch (error) {
      toast.error(error)
    }
  }

  const handleSearchClick = () => {
    getPairs({page_number: pageNumber, page_size: pageSize, search: searchFilter}) // Realiza la búsqueda cuando el usuario haga clic en el icono de búsqueda
  }

  const renderHeader = () => {
    return (
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <div className='d-flex align-items-center position-relative me-4'>
            <input
              type='text'
              id='kt_filter_search'
              className='form-control form-control-solid form-control-sm w-250px pe-9'
              placeholder='Buscar par por nombre o posición'
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearchClick()
                }
              }}
            />
            <span
              className='position-absolute end-0 me-3 cursor-pointer'
              onClick={handleSearchClick}
            >
              <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-3 ' />
            </span>
          </div>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <Link to='/pair/create' className='btn btn-sm btn-light-primary'>
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            Crear par
          </Link>
        </div>
      </div>
    )
  }

  const renderBody = () => {
    return (
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='pairs'>
              {(provided) => (
                <table
                  className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {/* begin::Table head */}
                  <thead>
                    <tr className='fw-bolder text-muted'>
                      <th className='min-w-50px'></th>
                      <th className='min-w-50px'>Posición</th>
                      <th className='min-w-100px'>Nombre</th>
                      <th className='min-w-100px'>
                        Nombre Sonido
                        <CustomTooltip title={messageTooltip} id='t-1'>
                          <i className='fas fa-question-circle text-primary ms-2'></i>
                        </CustomTooltip>
                      </th>
                      <th className='min-w-300px'>Descripción</th>
                      <th className='min-w-100px text-end'>Acciones</th>
                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}
                  <tbody>
                    {pairs.map((pair, index) => (
                      <ItemTablePair key={index} pair={pair} index={index} />
                    ))}
                    {provided.placeholder}
                  </tbody>
                  {/* end::Table body */}
                </table>
              )}
            </Droppable>
          </DragDropContext>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
    )
  }

  const renderFooter = () => {
    const totalPages = Math.ceil(totalPairs / pageSize)
    const paginationItems = []

    const visiblePages = 5
    const halfVisible = Math.floor(visiblePages / 2)
    let startPage = Math.max(1, pageNumber - halfVisible)
    let endPage = Math.min(totalPages, startPage + visiblePages - 1)

    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(1, endPage - visiblePages + 1)
    }

    if (startPage > 1) {
      paginationItems.push(
        <li key={1} className='page-item' onClick={() => handlePageChange(1)}>
          <button className='page-link'>1</button>
        </li>
      )

      if (startPage > 2) {
        paginationItems.push(
          <li key='ellipsis-start' className='page-item disabled'>
            <span className='page-link'>...</span>
          </li>
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <li
          key={i}
          className={`page-item ${i === pageNumber ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          <button className='page-link'>{i}</button>
        </li>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationItems.push(
          <li key='ellipsis-end' className='page-item disabled'>
            <span className='page-link'>...</span>
          </li>
        )
      }

      paginationItems.push(
        <li
          key={totalPages}
          className={`page-item ${totalPages === pageNumber ? 'active' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          <button className='page-link'>{totalPages}</button>
        </li>
      )
    }

    return (
      <div className='d-flex flex-stack flex-wrap pt-0'>
        <div className='fs-6 fw-bold text-gray-700'>
          Mostrando {pairs.length} de {totalPairs} resultados
        </div>

        <ul className='pagination'>
          <li className={`page-item ${pageNumber === 1 ? 'disabled' : 'previous'}`}>
            <button className='page-link' onClick={() => handlePageChange(pageNumber - 1)}>
              <i className='previous'></i>
            </button>
          </li>

          {paginationItems}

          <li
            className={`page-item ${
              pageNumber === Math.ceil(totalPairs / pageSize) ? 'disabled' : 'next'
            }`}
          >
            <button className='page-link' onClick={() => handlePageChange(pageNumber + 1)}>
              <i className='next'></i>
            </button>
          </li>
        </ul>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <span>Cargando lista de pares...</span>
      </div>
    )
  }

  if (error !== '') {
    return (
      <div>
        <span>{error}</span>
      </div>
    )
  }

  if (pairs.length === 0) {
    return (
      <div>
        <span>No hay registros encontrados</span>
      </div>
    )
  }


  return (
    <div>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        {renderHeader()}
        {/* end::Header */}

        {/* begin::Body */}
        {renderBody()}
        {/* end::Body */}
      </div>
      {/* begin::Footer */}
      {renderFooter()}
      {/* end::Footer */}
    </div>
  )
}

export {TablePair}
