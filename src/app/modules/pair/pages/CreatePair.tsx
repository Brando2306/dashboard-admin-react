import { useHistory } from 'react-router-dom'
import {FormPair} from '../components/FormPair'
import {useCreatePair} from '../hooks/useCreatePair'
import {IPairModal} from '../interfaces/pair.interface'
import * as Yup from 'yup'
import { toast } from 'react-toastify';

export const CreatePair = () => {
  const initialValues: IPairModal = {
    name: '',
    name_sound: '',
    description: '',
    symptomatology: '',
    etiology: '',
    observation: '',
    image_url: '',
  }

  const profileDetailsSchema = Yup.object().shape({
    name: Yup.string().required('Nombre del par es requerido'),
    name_sound: Yup.string().required('Nombre del sonido del par es requerido'),
    description: Yup.string().required('Descripción es requerida'),
  })

  const {createPair} = useCreatePair()
  const history = useHistory()

  const handleCreatePair = async (values: IPairModal) => {
    try {
      const error = await createPair(values)
      if(error != null){
        toast.error(error);
      } else {
        history.push('/pair/list')
        toast.success('El par ha sido creado.');
      }
    } catch (error) {}
  }

  return (
    <>
      <FormPair
        initialValues={initialValues}
        onSubmit={handleCreatePair}
        isCreateMode={true}
        profileDetailsSchema={profileDetailsSchema}
      />
    </>
  )
}
