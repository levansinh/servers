import { ObjectId } from 'mongodb';

export interface CategoryType {
  _id?: ObjectId;
  name: string;
  slug: string;
  create_at?: Date;
  update_at?: Date;
}
export default class Category {
  name: string;
  slug: string;
  create_at?: Date;
  update_at?: Date;
  constructor(user: CategoryType) {
    const date = new Date();
    this.name = user.name;
    this.slug = user.slug;
    this.create_at = user.create_at || date;
    this.update_at = user.update_at || date;
  }
}
