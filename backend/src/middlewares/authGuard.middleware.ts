import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization)
    return res.status(401).json({ error: 'Usuário não está autenticado' });

  const [_, token] = req.headers.authorization.split(' ');

  if (!token)
    return res.status(401).json({ error: 'Usuário não está autenticado' });
  try {
    const user = jwt.verify(token, process.env.JWT_LOGIN_SECRET);
    req.body.user = user;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: 'Usuário não está autenticado' });
  }
}
