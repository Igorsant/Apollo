import { Response } from 'express';

export const unauthorizedAccess = (res: Response) => {
  const error = 'Usuário não está autenticado';
  return res.status(401).json({ error });
};

export const badRequest = (res: Response, msg: string) => {
  return res.status(400).json({ error: msg });
};

export const conflict = (res: Response, key: string, value: any) => {
  return res.status(409).json({
    error: `Já existe um usuário registrado com ${key} ${value}`
  });
};

export const internalError = (res: Response, msg: string) => {
  return res.status(500).json({ error: msg });
};
