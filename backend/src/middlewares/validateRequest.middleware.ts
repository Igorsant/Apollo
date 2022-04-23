import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export default function validateReq(
  schema: Joi.Schema,
  property: 'body' | 'params' | 'query'
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);

    const valid = !error;
    if (valid) {
      next();
    } else {
      res.status(400).json(error);
    }
  };
}
