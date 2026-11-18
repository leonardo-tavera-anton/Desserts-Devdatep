import { useQuery } from '@tanstack/react-query';
import { productQueries } from '../queries/productQueries';

// Hook que conecta los componentes con la consulta de la lista.
export const useProducts = (
  search: string = '',
  category: string = ''
) => {
  return useQuery(productQueries.list(search, category));
};

export const usePaginatedProducts = (
  search: string,
  category: string,
  page: number,
  perPage: number
) => {
  return useQuery(
    productQueries.paginatedList(search, category, page, perPage)
  );
};

// Hook que conecta los componentes con la consulta del detalle.
export const useProduct = (id: string) => {
  return useQuery(productQueries.detail(id));
};
