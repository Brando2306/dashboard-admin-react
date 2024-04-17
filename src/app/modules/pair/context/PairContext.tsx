import { createContext } from 'react'
import { PairModel, PairPageQueryParamsModel, PairPositionQueryParamsModel } from '../../../../domain/pair/models/pair.model'

export interface GetPairContextProps {
  isLoading: boolean
  error: string
  pairs: PairModel[]
  totalPairs: number
  getPairs: (params: PairPageQueryParamsModel) => Promise<void>
  sendPositions: (data: PairPositionQueryParamsModel) => Promise<string | null>
}

export const PairContext = createContext<GetPairContextProps>({
  isLoading: false,
  error: '',
  pairs: [],
  totalPairs: 0,
  getPairs: async (params: PairPageQueryParamsModel) => { },
  sendPositions: async (data: PairPositionQueryParamsModel) => '',
})