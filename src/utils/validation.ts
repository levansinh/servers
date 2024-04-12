import httpStatus from '@/constants/httpStatus';
import ErrorWithStatus from '@/models/Errors';
import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema';

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req);
    const errors = validationResult(req);
    const errorsObject = errors.mapped();
    for (const key in errorsObject) {
      const { msg } = errorsObject[key];
      if (msg instanceof ErrorWithStatus && msg.status === httpStatus.UNPROCESSABLE_ENTITY) {
        return next(msg);
      }
    }
    if (errors.isEmpty()) {
      return next();
    }
  };
};
