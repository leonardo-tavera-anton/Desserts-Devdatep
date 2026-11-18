import { queryOptions } from '@tanstack/react-query';
import { categoryService } from '../services/categoryService';

export const categoryQueries = {
  list: () =>
    queryOptions({
      queryKey: ['categories'] as const,
      queryFn: () => categoryService.getCategories(),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),
};
