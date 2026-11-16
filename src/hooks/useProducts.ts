import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";

export const useProducts = (search = '', category = '') => {
  return useQuery({
    queryKey: ['products', { search, category }], //metodo d busqueda
    
    queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1200)); //declaracion primero antes d funcion para evitar errores
        const productList = await productService.getProducts(search, category);
        return productList;
        
    },
    
    staleTime: 1000 * 60 * 5, // 5min
    gcTime: 1000 * 60 * 10, // 10min cache a gc pq cambio por una version
  });
}