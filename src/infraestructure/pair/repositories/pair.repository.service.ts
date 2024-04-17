import { PairService } from "../services/getListPair";
import { PairCreateDto, PairDto, PairEditDto, PairPageDto, PairPageQueryParamsDto, PairPositionQueryParamsDto, PairShowDto } from "../../../domain/pair/dtos/pair.dto";
import { PairRepository } from "../../../domain/pair/repositories/pair.repository";

export class PairRepositoryService implements PairRepository {

    constructor(private pairService: PairService) { }

    async getListPair(params: PairPageQueryParamsDto): Promise<PairPageDto> {
        return await this.pairService.getListPair(params);
    }

    async sendPositions(params: PairPositionQueryParamsDto): Promise<PairDto[]> {
        return await this.pairService.postSortList(params);
    }

    async create(pair: PairCreateDto): Promise<PairDto> {
        return await this.pairService.postCreatePair(pair);
    }

    async update(pair: PairEditDto): Promise<PairDto> {
        return await this.pairService.putUpdatePair(pair);
    }

    async show(id: number): Promise<PairShowDto> {
        return await this.pairService.getShowPair(id);
    }

}