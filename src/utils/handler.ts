import { NextFunction, Request, Response, RequestHandler } from 'express';

export const wrapRequestHandler = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve();
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
