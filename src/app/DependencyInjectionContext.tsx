import React from 'react';
import { PairGetUseCase } from '../domain/pair/use-cases/pair-get.usecase';
import { PairRepositoryService } from '../infraestructure/pair/repositories/pair.repository.service';
import { PairService } from '../infraestructure/pair/services/getListPair';
import { PairPositionUseCase } from '../domain/pair/use-cases/pair-position.usecase';
import { PairCreateUseCase } from '../domain/pair/use-cases/pair-create.usecase';
import { PairUpdateUseCase } from '../domain/pair/use-cases/pair-update.usecase';
import { PairShowUseCase } from '../domain/pair/use-cases/pair-show.usecase';

// Instancia las dependencias
const pairService = new PairService();
const pairRepository = new PairRepositoryService(pairService);

const pairGetUseCase = new PairGetUseCase(pairRepository);
const pairPositionUseCase = new PairPositionUseCase(pairRepository);
const pairCreateUseCase = new PairCreateUseCase(pairRepository);
const pairUpdateUseCase = new PairUpdateUseCase(pairRepository);
const pairShowUseCase = new PairShowUseCase(pairRepository);

// Crea el objeto de dependencias
export const dependencies = {
    pairGetUseCase,
    pairPositionUseCase,
    pairCreateUseCase,
    pairUpdateUseCase,
    pairShowUseCase
};

// Crea y exporta el contexto con un valor por defecto
export const DependencyInjectionContext = React.createContext(dependencies);
