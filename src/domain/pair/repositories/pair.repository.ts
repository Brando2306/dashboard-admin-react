import { PairCreateDto, PairDto, PairEditDto, PairPageDto, PairPageQueryParamsDto, PairPositionQueryParamsDto, PairShowDto } from "../dtos/pair.dto";

export abstract class PairRepository {
    abstract getListPair(params: PairPageQueryParamsDto): Promise<PairPageDto>;
    abstract sendPositions(params: PairPositionQueryParamsDto): Promise<PairDto[]>;
    abstract create(pair: PairCreateDto): Promise<PairDto>;
    abstract update(pair: PairEditDto): Promise<PairDto>;
    abstract show(id: number): Promise<PairShowDto>;
}