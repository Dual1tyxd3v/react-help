import { useContext } from 'react';
import { AppContext } from '../App';

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('Context must be used into Provider');
  }

  return context;
}
