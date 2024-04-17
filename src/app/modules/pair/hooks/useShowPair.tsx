import { useContext, useState } from 'react';
import { DependencyInjectionContext } from '../../../DependencyInjectionContext';
import { PairModel } from '../../../../domain/pair/models/pair.model';

export const useShowPair = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pair, setPair] = useState<PairModel | undefined>(undefined);
  const { pairShowUseCase } = useContext(DependencyInjectionContext);

  const showPair = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await pairShowUseCase.execute(id);
      setPair(response)
    } catch (error) {
      setError('Error al traer el detalle de un par, ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    pair,
    showPair
  };
};
