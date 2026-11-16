import { useQuery } from '@tanstack/react-query';
import { productQueries } from '../queries/productQueries';

// Hook que conecta los componentes con la consulta de la lista.
export function useProducts(search = '', category = '') {
  return useQuery(productQueries.list(search, category));
}
