import { ObjectId } from 'mongodb';

import databaseService from '@/services/database.services';
import { convertSlug } from '@/utils/convertSlug';
import { ProductRequestParams } from '@/models/requests/Product.request';

class ProductService {
  async getProducts() {
    const response = await databaseService.product.find();
    return response;
  }

  async getProduct(payload: { _id: ObjectId }) {
    const { _id } = payload;
    const response = await databaseService.product.findOne({ _id });
    return response;
  }

  async createProduct(payload: ProductRequestParams) {
    const response = await databaseService.product.insertOne({ ...payload, slug: convertSlug(payload.name) });
    return response;
  }

  async updateProduct({ payload, query }: { payload: ProductRequestParams; query: ObjectId }) {
    const response = await databaseService.product.findOneAndUpdate(
      { _id: query },
      { ...payload, slug: convertSlug(payload.name) }
    );
    return response;
  }

  async deleteProduct(query: { _id: ObjectId }) {
    const response = await databaseService.product.findOneAndDelete({ _id: query });
    return response;
  }
}
const productService = new ProductService();

export default productService;
