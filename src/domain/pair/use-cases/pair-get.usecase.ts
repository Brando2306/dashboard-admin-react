import { UseCase } from "../../../core/interfaces/use-case.interface";
import { PairPageDto, PairPageQueryParamsDto } from "../dtos/pair.dto";
import { PairMapper } from "../mappers/pair.mapper";
import { PairPageModel, PairPageQueryParamsModel } from "../models/pair.model";
import { PairRepository } from "../repositories/pair.repository";

export class PairGetUseCase implements UseCase<PairPageQueryParamsModel, PairPageModel>{

  mapper = new PairMapper();
  constructor(private pairRepository: PairRepository) { }

  async execute(paramsModel: PairPageQueryParamsModel): Promise<PairPageModel> {
    const paramsDto: PairPageQueryParamsDto = this.mapper.mapPageQueryParamsModelToDto(paramsModel);
    const pairDto: PairPageDto = await this.pairRepository.getListPair(paramsDto);
    const pairModel: PairPageModel = this.mapper.mapPageDtoToModel(pairDto);
    return pairModel;
  }
}