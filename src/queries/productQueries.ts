import { queryOptions } from '@tanstack/react-query';
import { productService } from '../services/productService';

const CACHE_TIME = 10 * 60 * 1000;
const FRESH_TIME = 5 * 60 * 1000;

const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

// Aqui se definen las claves y funciones de consulta de productos.
export const productQueries = {
  list: (search = '', category = '') =>
    queryOptions({
      queryKey: ['products', { search, category }] as const,
      queryFn: async () => {
        // Retraso artificial requerido para mostrar el skeleton.
        await wait(1200);
        return productService.getProducts(search, category);
      },
      staleTime: FRESH_TIME,
      gcTime: CACHE_TIME,
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: ['product', id] as const,
      queryFn: () => productService.getProductById(id),
      enabled: Boolean(id),
      staleTime: FRESH_TIME,
      gcTime: CACHE_TIME,
    }),
};
