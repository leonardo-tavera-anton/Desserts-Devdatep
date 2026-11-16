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
    const response = await this.axiosInstance.get<Product>(`/products/${id}`);
    return response.data;
  }

  async getProducts(search = '', category = ''): Promise<Product[]> {
    const params: Record<string, string> = {};

    if (search.trim()) params['name:contains'] = search.trim();
    if (category) params.category = category;

    const response = await this.axiosInstance.get<Product[]>('/products', { params });
    return response.data;
  }
}

export const productService = new ProductService(api);
