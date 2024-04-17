import { PairCreateDto, PairDto, PairEditDto, PairPageDto, PairPageQueryParamsDto, PairPositionQueryParamsDto, PairShowDto } from "../dtos/pair.dto";
import { PairCreateModel, PairEditModel, PairModel, PairPageModel, PairPageQueryParamsModel, PairPositionQueryParamsModel } from "../models/pair.model";

export class PairMapper {
    mapPageDtoToModel(pairDto: PairPageDto): PairPageModel {
        return {
            ...pairDto,
        };
    }

    mapPositionDtoToModel(pairPositionDto: PairDto[]): PairModel[] {
        return {
            ...pairPositionDto,
        };
    }

    mapOneDtoToOneModel(pairShowDto: PairShowDto): PairModel {
        return {
            ...pairShowDto,
        };
    }

    mapCreateModelToDto(pairCreateModel: PairCreateModel): PairCreateDto {
        return {
            ...pairCreateModel,
        };
    }

    mapEditModelToDto(pairEditModel: PairEditModel): PairEditDto {
        return {
            ...pairEditModel,
        };
    }

    mapPageQueryParamsModelToDto(paramsModel: PairPageQueryParamsModel): PairPageQueryParamsDto {
        return {
            ...paramsModel,
        };
    }

    mapPositionQueryParamsModelToDto(paramsModel: PairPositionQueryParamsModel): PairPositionQueryParamsDto {
        return {
            ...paramsModel,
        };
    }




}