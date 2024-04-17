import { PairCreateDto, PairDto, PairEditDto, PairPageDto, PairPageQueryParamsDto, PairPositionQueryParamsDto, PairShowDto } from '../../../domain/pair/dtos/pair.dto'
import { ApiManager } from '../../../setup/axios/ApiManager'

export class PairService {
  async getListPair(params: PairPageQueryParamsDto): Promise<PairPageDto> {
    const path = `/api/peer/list`
    const response = await ApiManager.get<PairPageDto>(path, { params })
    return response.data
  }

  async postSortList(params: PairPositionQueryParamsDto): Promise<PairDto[]> {
    const path = `/api/peer/position`
    const response = await ApiManager.post<PairDto[]>(path, { data: params })
    return response.data
  }

  async postCreatePair(pair: PairCreateDto): Promise<PairDto> {
    const path = `/api/peer/create`
    const response = await ApiManager.post<PairDto>(path, { data: pair })
    return response.data
  }

  async putUpdatePair(pair: PairEditDto): Promise<PairDto> {
    const path = `/api/peer/update/${pair.id}`
    delete pair.id;
    const response = await ApiManager.put<PairDto>(path, { data: pair })
    return response.data
  }

  async getShowPair(id: number): Promise<PairShowDto> {
    const path = `/api/peer/show/${id}`
    const response = await ApiManager.get<PairShowDto>(path)
    return response.data
  }
}