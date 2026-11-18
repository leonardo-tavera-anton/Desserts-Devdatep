import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product } from '../types/product';
import { productService } from '../services/productService';

export const useCreateProduct = () => { //C
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Omit<Product, 'id'>) =>
      productService.createProduct(product),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }), //invalida la cache para actualizar
  });
};

export const useUpdateProduct = () => { //U
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      product,
    }: {
      id: string;
      product: Omit<Product, 'id'>;
    }) => productService.updateProduct(id, product),

    onSuccess: async (_updatedProduct, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['products'] }),
        queryClient.invalidateQueries({ queryKey: ['product', id] }),
      ]);
    },
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