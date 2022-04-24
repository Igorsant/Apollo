import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers.authorization) {
    const [_, token] = req.headers.authorization.split(' ');

    if (token) {
      try {
        const user: any = jwt.verify(token, process.env.JWT_LOGIN_SECRET);

        res.locals.user = user;
      } finally {
        return next();
      }
    }
  }

  return next();
}
