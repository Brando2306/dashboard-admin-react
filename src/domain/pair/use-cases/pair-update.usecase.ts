import { UseCase } from "../../../core/interfaces/use-case.interface";
import { PairDto, PairEditDto } from "../dtos/pair.dto";
import { PairMapper } from "../mappers/pair.mapper";
import { PairEditModel } from "../models/pair.model";
import { PairRepository } from "../repositories/pair.repository";

export class PairUpdateUseCase implements UseCase<PairEditModel, PairDto>{

  mapper = new PairMapper();
  constructor(private pairRepository: PairRepository) { }

  async execute(pair: PairEditModel): Promise<PairDto> {
    const pairEditDto: PairEditDto = this.mapper.mapEditModelToDto(pair);
    const pairDto: PairDto = await this.pairRepository.update(pairEditDto);
    return pairDto;
  }
}