import { UseCase } from "../../../core/interfaces/use-case.interface";
import { PairDto, PairPositionQueryParamsDto } from "../dtos/pair.dto";
import { PairMapper } from "../mappers/pair.mapper";
import { PairModel, PairPositionQueryParamsModel } from "../models/pair.model";
import { PairRepository } from "../repositories/pair.repository";

export class PairPositionUseCase implements UseCase<PairPositionQueryParamsModel, PairModel[]>{

  mapper = new PairMapper();
  constructor(private pairRepository: PairRepository) { }

  async execute(paramsModel: PairPositionQueryParamsModel): Promise<PairModel[]> {
    const paramsDto: PairPositionQueryParamsDto = this.mapper.mapPositionQueryParamsModelToDto(paramsModel);
    const pairDto: PairDto[] = await this.pairRepository.sendPositions(paramsDto);
    const pairModel: PairModel[] = this.mapper.mapPositionDtoToModel(pairDto);
    return pairModel;
  }
}