import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { unauthorizedAccess } from '../helpers/http.helper';

export default function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization)
    return unauthorizedAccess(res)

  const [_, token] = req.headers.authorization.split(' ');

  if (!token)
    return unauthorizedAccess(res)
  try {
    const user = jwt.verify(token, process.env.JWT_LOGIN_SECRET);
    req.body.user = user;

    return next();
  } catch (err) {
    console.log(err);
    return unauthorizedAccess(res)
  }
}
