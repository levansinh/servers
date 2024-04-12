import { ObjectId } from 'mongodb';

import databaseService from '@/services/database.services';
import { CategoryRequestParams } from '@/models/requests/Category.request';
import { convertSlug } from '@/utils/convertSlug';

class CategoryService {
  async getCategories() {
    const response = await databaseService.category.find();
    return response;
  }

  async getCategory(payload: { _id: ObjectId }) {
    const { _id } = payload;
    const response = await databaseService.category.findOne({ _id });
    return response;
  }

  async createCategory(payload: CategoryRequestParams) {
    const { name } = payload;
    const response = await databaseService.category.insertOne({ name, slug: convertSlug(name) });
    return response;
  }

  async updateCategory({ payload, query }: { payload: CategoryRequestParams; query: ObjectId }) {
    const { name } = payload;
    const response = await databaseService.category.findOneAndUpdate({ _id: query }, { name, slug: convertSlug(name) });
    return response;
  }

  async deleteCategory(query: { _id: ObjectId }) {
    const response = await databaseService.category.findOneAndDelete({ _id: query });
    return response;
  }
}
const categoryService = new CategoryService();

export default categoryService;
