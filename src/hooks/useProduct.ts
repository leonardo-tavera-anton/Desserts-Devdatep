import { useQuery } from '@tanstack/react-query';
import { productQueries } from '../queries/productQueries';

// Hook que conecta los componentes con la consulta del detalle.
export function useProduct(id: string) {
  return useQuery(productQueries.detail(id));
}
