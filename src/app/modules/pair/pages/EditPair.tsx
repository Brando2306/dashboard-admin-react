import {useEffect, useState} from 'react'
import {FormPair} from '../components/FormPair'
import {useShowPair} from '../hooks/useShowPair'
import {IPairModal} from '../interfaces/pair.interface'
import {useParams} from 'react-router-dom'
import * as Yup from 'yup'
import {useEditPair} from '../hooks/useEditPair'
import { toast } from 'react-toastify';

interface RouteParams {
  pairId: string
}

export const EditPair = () => {
  const {pairId} = useParams<RouteParams>()
  const { editPair } = useEditPair()
  const {pair, showPair, isLoading, error} = useShowPair()

  const parsedPairId = parseInt(pairId, 10)

  const [initialValues, setInitialValues] = useState<IPairModal>({
    name: '',
    name_sound: '',
    description: '',
    symptomatology: '',
    etiology: '',
    observation: '',
    image_url: '',
  })

  useEffect(() => {
    showPair(parsedPairId)
  }, [])

  useEffect(() => {
    if (pair) {
      setInitialValues({
        name: pair.NombrePar ?? '',
        name_sound: pair.NombreSonido ?? '',
        description: pair.Descripcion ?? '',
        symptomatology: pair.Sintomatologia ?? '',
        etiology: pair.Etiologia ?? '',
        observation: pair.Observacion ?? '',
        image_url: pair.ImagenUrl ?? '',
        position: pair.Posicion ?? '',
      })
    }
  }, [pair])

  const profileDetailsSchema = Yup.object().shape({
    name: Yup.string().required('Nombre del par es requerido'),
    name_sound: Yup.string().required('Nombre del sonido del par es requerido'),
    description: Yup.string().required('Descripción es requerida'),
    position: Yup.string().required('Posición es requerida'),
  })

  const handleUpdatePair = async (values: IPairModal) => {
    const error = await editPair(parsedPairId, values)
    if(error != null){
      toast.error(error);
    } else {
      toast.success('El par ha sido actualizado.');
    }
  }

  if (isLoading) {
    return <div>Cargando para editar par...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <FormPair
        initialValues={initialValues}
        onSubmit={handleUpdatePair}
        isCreateMode={false}
        profileDetailsSchema={profileDetailsSchema}
      />
    </>
  )
}
