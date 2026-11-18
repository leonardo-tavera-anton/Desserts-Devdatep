import { queryOptions } from '@tanstack/react-query';
import { productService } from '../services/productService';

const CACHE_TIME = 10 * 60 * 1000;
const FRESH_TIME = 5 * 60 * 1000;

export const productQueries = {
  list: (search: string, category: string) =>
    queryOptions({
      queryKey: ['products', { search, category }] as const,
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1200)); //1.2 segundos nivel 2
        return productService.getProducts(search, category);
      },
      staleTime: FRESH_TIME,
      gcTime: CACHE_TIME,
    }),

  paginatedList: (
    search: string,
    category: string,
    page: number,
    perPage: number
  ) =>
    queryOptions({
      queryKey: ['products', { search, category, page, perPage }] as const,
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        return productService.getPaginatedProducts(
          search,
          category,
          page,
          perPage
        );
      },
      staleTime: FRESH_TIME,
      gcTime: CACHE_TIME,
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: ['product', id] as const,
      queryFn: () => productService.getProductById(id),
      staleTime: FRESH_TIME,
      gcTime: CACHE_TIME,
    }),
};