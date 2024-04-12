import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import productService from '@/services/product.services';

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const response = await productService.getProducts();
    return res.status(200).json({
      flat: true,
      msg: 'Get products successfully!',
      data: response
    });
  } catch (error) {
    return res.status(500).json({
      flat: false,
      msg: 'Server error!'
    });
  }
};

export const getProductController = async (req: Request, res: Response) => {
  const _id = new ObjectId(req.params._id);
  try {
    const response = await productService.getProduct({ _id });
    return res.status(200).json({
      flat: true,
      msg: 'Get product successfully!',
      data: response
    });
  } catch (error) {
    return res.status(500).json({
      flat: false,
      msg: 'Server error!'
    });
  }
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const response = await productService.createProduct(req.body);
    return res.status(200).json({
      flat: true,
      msg: 'Create product successfully!',
      data: response
    });
  } catch (error) {
    return res.status(500).json({
      flat: false,
      msg: 'Server error!'
    });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const response = await productService.updateProduct({ payload: req.body, query: new ObjectId(req.params._id) });
    return res.status(200).json({
      flat: true,
      msg: 'Update product successfully!',
      data: response
    });
  } catch (error) {
    return res.status(500).json({
      flat: false,
      msg: 'Server error!'
    });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  const _id = new ObjectId(req.params._id);
  try {
    const response = await productService.deleteProduct({ _id });
    return res.status(200).json({
      flat: true,
      msg: 'Delete product successfully!',
      data: response
    });
  } catch (error) {
    return res.status(500).json({
      flat: false,
      msg: 'Server error!'
    });
  }
};
