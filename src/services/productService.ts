import type { AxiosInstance } from 'axios';
import type { Product } from '../types/product';
import api from './api';

// ProductService define las peticiones; api.ts configura Axios.
class ProductService {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getProductById(id: string): Promise<Product> {
    const response = await this.axiosInstance.get<Product>(`/products/${id}`);//segun su id
    return response.data;
  }

  async getProducts(
    search = '',
    category = ''
  ): Promise<Product[]> {
    const params: Record<string, string> = {};

    //mantiene filtro por categoria en la API
    if (category) {
      params.category = category;
    }
    const response = await this.axiosInstance.get<Product[]>(
      '/products',
      { params }
    );

    let products = response.data;

    //busqueda por nombre
    if (search.trim()) {
      products = products.filter((product) => product.name
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      );
    }

    return products;
  }
}

export const productService = new ProductService(api);