import { Draggable } from 'react-beautiful-dnd'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useHistory } from 'react-router-dom'
import { PairModel } from '../../../../domain/pair/models/pair.model'

type Props = {
  pair: PairModel
  index: number
}

export const ItemTablePair = ({ pair, index }: Props) => {
  const history = useHistory()

  return (
    <Draggable key={index} draggableId={`pair-${index}`} index={index}>
      {(provided, snapshot) => (
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            width: '100%',
            backgroundColor: snapshot.isDragging ? '#f5f8fa' : 'white',
          }}
        >
          <td>
            <div
              {...provided.dragHandleProps}
              className='text-dark fw-bolder text-hover-primary fs-6 d-flex justify-content-'
            >
              <i className='bi bi-grip-vertical fs-2'></i>
            </div>
          </td>
          <td>
            <div className='text-dark fw-bolder text-hover-primary fs-6'>{pair.Posicion}</div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <div className='d-flex justify-content-start flex-column'>
                <div className='text-dark text-hover-primary fs-7'>{pair.NombrePar}</div>
              </div>
            </div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <div className='d-flex justify-content-start flex-column'>
                <div className='text-dark text-hover-primary fs-7'>{pair.NombreSonido}</div>
              </div>
            </div>
          </td>
          <td>
            <div className='d-block fs-7'>
              {pair.Descripcion === null || pair.Descripcion === '' ? '' : pair.Descripcion}
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-end flex-shrink-0'>
              <button
                onClick={() => history.push(`/pair/edit/${pair.ParesID}`)}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              >
                <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
              </button>
            </div>
          </td>
        </tr>
      )}
    </Draggable>
  )
}
