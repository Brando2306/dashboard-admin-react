import { UseCase } from "../../../core/interfaces/use-case.interface";
import { PairCreateDto, PairDto } from "../dtos/pair.dto";
import { PairMapper } from "../mappers/pair.mapper";
import { PairCreateModel } from "../models/pair.model";
import { PairRepository } from "../repositories/pair.repository";

export class PairCreateUseCase implements UseCase<PairCreateModel, PairDto>{

  mapper = new PairMapper();
  constructor(private pairRepository: PairRepository) { }

  async execute(pair: PairCreateModel): Promise<PairDto> {
    const pairCreateDto: PairCreateDto = this.mapper.mapCreateModelToDto(pair);
    const pairDto: PairDto = await this.pairRepository.create(pairCreateDto);
    return pairDto;
  }
}