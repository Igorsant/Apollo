import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { cpfIsValid } from '../helpers/cpf.helper';
import schedulingRepository from '../repositories/scheduling.repository';
import {
  badRequest,
  conflict,
  forbidden,
  internalError,
  notFound
} from '../helpers/http.helper';
import {
  deletePicture,
  saveBase64Image,
  userPicture
} from '../helpers/image.helper';
import phoneRepository from '../repositories/phone.repository';

export default class SchedulingController {
  public static async create(req: Request, res: Response) {
    const scheduling = req.body;

    // if (!cpfIsValid(scheduling.cpf))
    //   return badRequest(res, `cpf ${scheduling.cpf} é inválido.`);

    // try {
    //   scheduling.pictureName = await saveBase64Image(scheduling.pictureBase64);
    //   delete scheduling.pictureBase64;
    // } catch (err) {
    //   console.error(err);
    //   return internalError(res, 'Erro interno ao salvar imagem.');
    // }

    // const salt = await bcrypt.genSalt(10);
    // scheduling.passwordHash = await bcrypt.hash(scheduling.password, salt);
    // delete scheduling.password;

    // try {
    //   await schedulingRepository.insert(scheduling);

    //   scheduling.picturePath = userPicture(scheduling.pictureName);

    //   delete scheduling.passwordHash;
    //   delete scheduling.pictureName;

    //   return res.status(201).json(scheduling);
    // } catch (err) {
    //   if (scheduling.pictureName) deletePicture(scheduling.pictureName);

    //   if (err.routine?.includes('unique')) {
    //     const [_, key] = err.constraint.split('_');

    //     return conflict(res, key, scheduling[key]);
    //   }

    //   console.error(err);

    //   return internalError(res, 'Erro ao inserir agendamento no banco de dados');
    // }
  }
}
