import { useContext, useState } from 'react'
import { GetPairContextProps, PairContext } from './PairContext'
import { DependencyInjectionContext } from '../../../DependencyInjectionContext'
import { PairModel, PairPageQueryParamsModel, PairPositionQueryParamsModel } from '../../../../domain/pair/models/pair.model'

export const PairProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [pairs, setPairs] = useState<PairModel[]>([])
  const [totalPairs, setTotalPairs] = useState(0)

  const { pairGetUseCase, pairPositionUseCase } = useContext(DependencyInjectionContext);

  const getPairs = async (params: PairPageQueryParamsModel) => {
    setIsLoading(true)
    try {
      const response = await pairGetUseCase.execute(params);
      setPairs(response.content)
      setTotalPairs(response.totalElements)
    } catch (error) {
      setError('Error al obtener la lista de pares: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  const sendPositions = async (data: PairPositionQueryParamsModel) => {
    setIsLoading(true)
    try {
      await pairPositionUseCase.execute(data)
      return null
    } catch (error) {
      return (
        'Hubo un inconveniente al actualizar las posiciones de pares, inténtelo de nuevo o más tarde por favor.' +
        error
      )
    } finally {
      setIsLoading(false)
    }
  }

  const contextValue: GetPairContextProps = {
    isLoading,
    error,
    pairs,
    getPairs,
    sendPositions,
    totalPairs,
  }

  return <PairContext.Provider value={contextValue}>{children}</PairContext.Provider>
}
