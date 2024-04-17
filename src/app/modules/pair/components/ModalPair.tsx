import {useEffect, useState} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import clsx from 'clsx'
import {useGetAttachment} from '../../attachment/hooks/useGetAttachment'
import {ItemPairModal} from './ItemPairModal'
import {Attachment} from '../../attachment/interfaces/attachment.interface'
import {Modal} from 'react-bootstrap-v5'

interface Props {
  handleSelectedItem: (item: Attachment) => void
  isModalOpen: boolean
  handleModalClose: () => void
}

export const ModalPair = ({handleSelectedItem, isModalOpen, handleModalClose}: Props) => {
  const [tab, setTab] = useState('Select')
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)

  const {attachment, error, isLoading, getAttachments} = useGetAttachment()

  const updateConfig = () => {
    handleModalClose()
    if (selectedItemIndex !== null) {
      const selectedItem = attachment[selectedItemIndex]
      handleSelectedItem(selectedItem)
    }
  }

  useEffect(() => {
    getAttachments()
  }, [])

  const handleRadioChange = (index: number) => {
    setSelectedItemIndex(index)
  }

  //TODO: Solucionar el cargando, el modal se carga cuandp carga el Formulario, debe cargarse solo cuando se llame al Modal

  const renderContent = () => {
    if (isLoading) {
      return (
        <div>
          <span>Cargando ...</span>
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

    return (
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>Modal</h2>

          <div
            className='btn btn-sm btn-icon btn-active-color-primary'
            data-bs-dismiss='modal'
            onClick={handleModalClose}
          >
            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
          </div>
        </div>
        <div className='modal-body'>
          <div className='card card-custom'>
            <div className='card-header card-header-stretch justify-content-center p-0'>
              <ul
                className='nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap'
                role='tablist'
              >
                <li className='nav-item'>
                  <button
                    className={clsx(`nav-link bg-white`, {active: tab === 'Upload'})}
                    onClick={() => setTab('Upload')}
                    role='tab'
                  >
                    Subir imagen
                  </button>
                </li>
                <li className='nav-item'>
                  <button
                    className={clsx(`nav-link bg-white`, {active: tab === 'Select'})}
                    onClick={() => setTab('Select')}
                    role='tab'
                  >
                    Seleccionar imagen
                  </button>
                </li>
              </ul>
            </div>
            {/* end::Header */}

            {/* begin::Form */}
            <form className='form'>
              {/* begin::Body */}
              <div className='card-body mh-400px scroll-y mb-0 pb-0'>
                <div className='tab-content'>
                  {/* begin::Upload */}
                  <div className={clsx('tab-pane', {active: tab === 'Upload'})}></div>
                  {/* end::Upload */}

                  {/* begin::Select */}
                  <div className={clsx('tab-pane', {active: tab === 'Select'})}>
                    {/* begin::Body */}
                    <div className=''>
                      {/* begin::Table container */}
                      <div className='table-responsive'>
                        {/* begin::Table */}
                        <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                          {/* begin::Table head */}
                          <thead>
                            <tr className='fw-bolder text-muted'>
                              <th className='w-25px'></th>
                              <th className='min-w-150px'>Imagen</th>
                              <th className='min-w-140px'>Nombre</th>
                              <th className='min-w-120px'>Fecha</th>
                            </tr>
                          </thead>
                          {/* end::Table head */}
                          {/* begin::Table body */}
                          <tbody>
                            {attachment.map((item, index) => (
                              <ItemPairModal
                                key={index}
                                item={item}
                                index={index}
                                selectedItemIndex={selectedItemIndex!}
                                handleRadioChange={handleRadioChange}
                              />
                            ))}
                          </tbody>
                          {/* end::Table body */}
                        </table>
                        {/* end::Table */}
                      </div>
                      {/* end::Table container */}
                    </div>
                    {/* end::Body */}
                  </div>
                  {/* end::Select */}
                </div>
              </div>
              {/* end::Body */}

              {/* begin::Footer */}
              <div className='modal-footer'>
                <button
                  type='button'
                  onClick={handleModalClose}
                  className='btn btn-outline-primary text-hover-white'
                  data-bs-dismiss='modal'
                >
                  Cancelar
                </button>
                <button
                  type='button'
                  onClick={updateConfig}
                  data-bs-dismiss='modal'
                  className='btn btn-primary'
                >
                  Asignar
                </button>
              </div>
              {/* end::Footer */}
            </form>
            {/* end::Form */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Modal
      className='modal fade '
      data-backdrop='static'
      role='dialog'
      show={isModalOpen}
      dialogClassName='modal-xl modal-dialog-centered'
      aria-hidden='true'
    >
      {renderContent()}
    </Modal>
  )
}
