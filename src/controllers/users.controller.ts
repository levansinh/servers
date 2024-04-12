import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import userService from '@/services/user.services';
import { ParamsDictionary } from 'express-serve-static-core';
import { LoginRequestParams } from '@/models/requests/User.request';
import HTTP_STATUS from '@/constants/httpStatus';

export const registerController = async (req: Request<ParamsDictionary, any, LoginRequestParams>, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  const existUser = await userService.getUser({ email });

  console.log(existUser);

  if (existUser) return res.status(HTTP_STATUS.BAD_REQUEST).json({ flat: false, msg: 'User existed' });

  const response = await userService.register({ email, password });
  console.log(response);
  return res.status(HTTP_STATUS.OK).json({
    flat: true,
    msg: 'User create successfully!',
    data: response
  });
};

export const loginController = async (req: Request, res: Response) => {
  const { user } = req;

  const _id = user?._id as ObjectId;

  const response = await userService.login({ _id: _id.toString() });

  return res.status(HTTP_STATUS.OK).json({
    flat: true,
    msg: 'User create successfully!',
    data: response
  });
};
