import {Attachment} from '../../attachment/interfaces/attachment.interface'
import { ImageBlob } from './ImageBlob';

interface Props {
  item: Attachment,
  index: number,
  selectedItemIndex: number,
  handleRadioChange: (index: number) => void;
}

export const ItemPairModal = ({item, index, selectedItemIndex, handleRadioChange}: Props) => {

  const handleRadioClick = () => {
    handleRadioChange(index); // Llama a la función de controlador de eventos proporcionada por el componente padre
  };

  return (
    <tr key={index} onClick={handleRadioClick} >
      <td>
        <div className='form-check form-check-sm form-check-custom form-check-solid'>
          <input
            className='form-check-input widget-13-check'
            type='radio'
            name='selectedItem'
            checked={selectedItemIndex === index}
            onChange={handleRadioClick}/>
        </div>
      </td>
      <td>
        <div className='symbol symbol-100px symbol-2by3 symbol-square'>
          <ImageBlob urlImagen={item.location!} />
        </div>
      </td>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{item.originalname}</span>
      </td>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{item.created_date}</span>
      </td>
    </tr>
  )
}
