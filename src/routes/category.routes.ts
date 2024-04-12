import { Router } from 'express';
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController
} from '@/controllers/category.controller';

const categoryRouter = Router();

categoryRouter.delete('/:_id', deleteCategoryController);
categoryRouter.put('/:_id', updateCategoryController);
categoryRouter.post('/', createCategoryController);

categoryRouter.get('/:_id', getCategoryController);
categoryRouter.get('/', getCategoriesController);
export default categoryRouter;
