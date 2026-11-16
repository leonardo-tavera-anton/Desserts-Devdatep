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

  detail: (id: string) =>
    queryOptions({
      queryKey: ['product', id] as const,
      queryFn: () => productService.getProductById(id),
      staleTime: FRESH_TIME,
      gcTime: CACHE_TIME,
    }),
};