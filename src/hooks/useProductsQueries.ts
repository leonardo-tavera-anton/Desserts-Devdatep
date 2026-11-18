import { useQuery } from '@tanstack/react-query';
import { productQueries } from '../queries/productQueries';

// Hooks que conectan los componentes con las consultas de productos.
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

//hook que conecta los componentes con la consulta del detalle.
export const useProduct = (id: string) => {
  return useQuery(productQueries.detail(id));
};
