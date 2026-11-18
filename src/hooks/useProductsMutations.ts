import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product } from '../types/product';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';

export const useCreateProduct = () => { //C
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Omit<Product, 'id'>) => {
      await categoryService.ensureCategoryExists(product.category);
      return productService.createProduct(product);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }), //invalida la cache para actualizar
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
};

export const useUpdateProduct = () => { //U
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      product,
    }: {
      id: string;
      product: Omit<Product, 'id'>;
    }) => {
      await categoryService.ensureCategoryExists(product.category);
      return productService.updateProduct(id, product);
    },

    onSuccess: async (_updatedProduct, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['products'] }),
        queryClient.invalidateQueries({ queryKey: ['product', id] }),
      ]);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
};

export const useDeleteProduct = () => { //D
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: async (_data, id) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['products'] }),
        queryClient.invalidateQueries({ queryKey: ['product', id] }),
      ]);
    },
  });
};