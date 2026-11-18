import { useQuery } from '@tanstack/react-query';
import { categoryQueries } from '../queries/categoryQueries';

export const useCategories = () => useQuery(categoryQueries.list());
