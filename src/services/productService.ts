import type { AxiosInstance } from 'axios';
import type { Product, ProductPage } from '../types/product';
import api from './api';

// ProductService define las peticiones; api.ts configura Axios.
class ProductService {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }
  //CREATE
  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const response = await this.axiosInstance.post<Product>('/products', product);
  return response.data;
  }
  //PUT
  async updateProduct(
    id: string,
    product: Omit<Product, 'id'>
    ): Promise<Product> {
    const response = await this.axiosInstance.put<Product>(
      `/products/${id}`,
      product
    );
  return response.data;
  }
  //DELETE
  async deleteProduct(id: string): Promise<void> {
  await this.axiosInstance.delete(`/products/${id}`);
  }

 //GET por id
  async getProductById(id: string): Promise<Product> {
    const response = await this.axiosInstance.get<Product>(`/products/${id}`);//segun su id
    return response.data;
  }
//GET general
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

  //servicio de paginacion
  async getPaginatedProducts(
    search: string,
    category: string,
    page: number,
    perPage: number
  ): Promise<ProductPage> {
    const params: Record<string, string | number> = {
      _page: page,
      _per_page: perPage,
    };

    if (search.trim()) {
      params['name:contains'] = search.trim();
    }

    if (category) {
      params.category = category;
    }
    //utiliza axios espera q le d los productos d la pagina
    const response = await this.axiosInstance.get<ProductPage>('/products', {
      params,
    });

    return response.data;
  }
}

export const productService = new ProductService(api);