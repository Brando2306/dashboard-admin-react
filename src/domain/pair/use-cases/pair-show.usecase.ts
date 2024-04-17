import { UseCase } from "../../../core/interfaces/use-case.interface";
import { PairShowDto } from "../dtos/pair.dto";
import { PairMapper } from "../mappers/pair.mapper";
import { PairModel } from "../models/pair.model";
import { PairRepository } from "../repositories/pair.repository";

export class PairShowUseCase implements UseCase<number, PairModel>{

  mapper = new PairMapper();
  constructor(private pairRepository: PairRepository) { }

  async execute(id: number): Promise<PairModel> {
    const pairDto: PairShowDto = await this.pairRepository.show(id);
    const pairModel: PairModel = this.mapper.mapOneDtoToOneModel(pairDto);
    return pairModel;
  }
}