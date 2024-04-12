import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import categoryService from '@/services/category.services';
import { ObjectId } from 'mongodb';

export const getCategoriesController = async (req: Request, res: Response) => {
  try {
    const response = await categoryService.getCategories();

    return res.status(200).json({
      flat: true,
      msg: 'Get categories successfully!',
      data: response
    });
  } catch (error) {
    return res.status(500).json({
      flat: false,
      msg: 'Server error!'
    });
  }
};
export const getCategoryController = async (req: Request, res: Response) => {
  const _id = new ObjectId(req.params._id);
  try {
    const response = await categoryService.getCategory({ _id });
    return res.status(200).json({
      flat: true,
      msg: 'Get category successfully!',
      data: response
    });
  } catch (error) {
    return res.status(500).json({
      flat: false,
      msg: 'Server error!'
    });
  }
};

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const response = await categoryService.createCategory(req.body);
    return res.status(200).json({
      flat: true,
      msg: 'Create category successfully!',
      data: response
    });
  } catch (error) {
    return res.status(500).json({
      flat: false,
      msg: 'Server error!'
    });
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const response = await categoryService.updateCategory({ payload: req.body, query: new ObjectId(req.params._id) });
    return res.status(200).json({
      flat: true,
      msg: 'Update category successfully!',
      data: response
    });
  } catch (error) {
    return res.status(500).json({
      flat: false,
      msg: 'Server error!'
    });
  }
};
export const deleteCategoryController = async (req: Request, res: Response) => {
  const _id = new ObjectId(req.params._id);
  try {
    const response = await categoryService.deleteCategory({ _id });
    return res.status(200).json({
      flat: true,
      msg: 'Delete category successfully!',
      data: response
    });
  } catch (error) {
    return res.status(500).json({
      flat: false,
      msg: 'Server error!'
    });
  }
};
