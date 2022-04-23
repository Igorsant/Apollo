import { Response } from 'express';

export const unauthorizedAccess = (res: Response) => {
  const error = 'Usuário não está autenticado';
  return res.status(401).json({ error });
};
