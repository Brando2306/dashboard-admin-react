import axios from 'axios'
import { useEffect, useState, useRef } from 'react'

type Props = {
  urlImagen: string
  originalname?: string
}

export const ImageBlob = ({ urlImagen, originalname }: Props) => {
  const [imagenSrc, setImagenSrc] = useState('')
  const isMounted = useRef(true)

  const obtenerImagenAutenticada = async () => {
    try {
      // const urlImagen = `${process.env.REACT_APP_API_URL}/api/attachment/download/${filename}`
      const respuesta = await axios.get(urlImagen, { responseType: 'arraybuffer' })
      const imagenBase64 = Buffer.from(respuesta.data, 'binary').toString('base64')
      const imagenSrc = `data:${respuesta.headers['content-type']};base64,${imagenBase64}`
      if (isMounted.current) {
        setImagenSrc(imagenSrc)
      }
    } catch (error) {
      setImagenSrc('https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg')
      // console.error('Error al obtener la imagen: === ', error)
    }
  }

  useEffect(() => {
    obtenerImagenAutenticada()
    return () => {
      isMounted.current = false
    }
  })

  if (!imagenSrc) {
    return <p>Cargando imagen...</p>
  }

  return <img src={imagenSrc} alt={originalname} className='' />
}
