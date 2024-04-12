import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getProductsController,
  getProductController,
  updateProductController
} from '@/controllers/product.controller';

const productRoutes = Router();

productRoutes.delete('/:_id', deleteProductController);
productRoutes.put('/:_id', updateProductController);
productRoutes.post('/', createProductController);

productRoutes.get('/:_id', getProductController);
productRoutes.get('/', getProductsController);
export default productRoutes;
