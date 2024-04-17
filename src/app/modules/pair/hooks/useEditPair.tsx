import { useContext, useState } from 'react';
import { IPairModal } from '../interfaces/pair.interface';
import { DependencyInjectionContext } from '../../../DependencyInjectionContext';
import { PairEditModel } from '../../../../domain/pair/models/pair.model';

export const useEditPair = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { pairUpdateUseCase } = useContext(DependencyInjectionContext);

  const editPair = async (id: number, body: PairEditModel) => {
    const pair: PairEditModel = {
      ...body,
      id: id
    }
    setIsLoading(true);
    try {
      await pairUpdateUseCase.execute(pair);
      return null
    } catch (error) {
      return 'Hubo un inconveniente al actualizar el par, inténtelo de nuevo o más tarde por favor.' + error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    editPair
  };
};
