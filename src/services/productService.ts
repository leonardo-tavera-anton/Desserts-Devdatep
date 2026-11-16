import type { AxiosInstance } from 'axios';
import type { Product } from '../types/product';
import api from './api';

export class ProductService {
  private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async getProductById(id: string): Promise<Product> {
        const response = await this.axiosInstance.get<Product>(`/products/${id}`);
        return response.data;
    }
    async getProducts(search = '', category = ''): Promise<Product[]> {
        try {
            const params: Record<string, string> = {};
            if (search.trim()) params['name:contains'] = search.trim();
            if (category) params.category = category;

            const response = await this.axiosInstance.get<Product[]>('/products', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

} 
//todo se redirigue al api en lugar de a axios directamente, para poder centralizar
//la configuración de axios y poder reutilizarla en los servicios.
export const productService = new ProductService(api);