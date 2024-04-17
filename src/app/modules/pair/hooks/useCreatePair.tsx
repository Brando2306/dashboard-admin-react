import { useContext, useState } from 'react';
import { IPairModal } from '../interfaces/pair.interface';
import { DependencyInjectionContext } from '../../../DependencyInjectionContext';
// import { postCreatePair } from '../services/getListPair';

export const useCreatePair = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { pairCreateUseCase } = useContext(DependencyInjectionContext);

  const createPair = async (pair: IPairModal) => {
    setIsLoading(true);
    try {
      await pairCreateUseCase.execute(pair);
      return null;
    } catch (error) {
      return 'Hubo un inconveniente al crear el par, inténtelo de nuevo o más tarde por favor.' + error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createPair
  };
};
