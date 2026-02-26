import { IProductsinterface } from './productsinterface';

export interface AllProductsinterface {
  products: IProductsinterface[];
  total: number;
  skip: number;
  limit: number;
}
