import { IRatings } from '../schemas/Product.schema';

export interface ProductRequestParams {
  name: string;
  price: string;
  brand: string;
  images: string[];
  colors: string[];
  size: string[];
  slug: string;
  ratings: IRatings[];
  quantity: number;
}
