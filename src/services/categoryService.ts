import type { Category } from '../types/product';
import api from './api';

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },

  async ensureCategoryExists(name: string): Promise<void> {
    const normalizedName = name.trim();
    const response = await api.get<Category[]>('/categories');
    const categoryExists = response.data.some(
      (category) =>
        category.name.trim().toLocaleLowerCase() ===
        normalizedName.toLocaleLowerCase()
    );

    if (!categoryExists) {
      await api.post<Category>('/categories', {
        id: crypto.randomUUID(),
        name: normalizedName,
      });
    }
  },
};
