import { ObjectId } from 'mongodb';

export interface IRatings {
  star: number;
  comment: string;
}

export interface ProductType {
  _id?: ObjectId;
  name: string;
  price: string;
  brand: string;
  images: string[];
  colors: string[];
  size: string[];
  slug: string;
  ratings: IRatings[];
  quantity: number;
  create_at?: Date;
  update_at?: Date;
}

export default class Product {
  name: string;
  price: string;
  brand: string;
  images: string[];
  colors: string[];
  size: string[];
  slug: string;
  ratings: IRatings[];
  quantity: number;
  create_at: Date;
  update_at: Date;
  constructor(user: ProductType) {
    const date = new Date();
    this.name = user.name;
    this.price = user.price;
    this.brand = user.brand;
    this.images = user.images;
    this.colors = user.colors;
    this.size = user.size;
    this.ratings = user.ratings;
    this.slug = user.slug;
    this.quantity = user.quantity;
    this.create_at = user.create_at || date;
    this.update_at = user.update_at || date;
  }
}
