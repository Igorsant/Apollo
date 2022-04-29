import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { cpfIsValid } from '../helpers/cpf.helper';
import {
  deletePicture,
  saveBase64Image,
  userPicture
} from '../helpers/image.helper';
import { badRequest, conflict, internalError } from '../helpers/http.helper';
import phoneRepository from '../repositories/phone.repository';
import professionalRepository from '../repositories/professional.repository';
import serviceRepository from '../repositories/service.repository';
import workHourRepository from '../repositories/workHour.repository';
import workplaceRepository from '../repositories/workplace.repository';

export default class ProfessionalController {
  public static async register(req: Request, res: Response) {
    const professional = req.body;

    if (!cpfIsValid(professional.cpf))
      return badRequest(res, `cpf ${professional.cpf} é inválido.`);

    try {
      professional.pictureName = await saveBase64Image(
        professional.pictureBase64
      );
      delete professional.pictureBase64;
    } catch (err) {
      console.error(err);
      return internalError(res, 'Erro interno ao salvar imagem.');
    }

    const salt = await bcrypt.genSalt(10);
    professional.passwordHash = await bcrypt.hash(professional.password, salt);
    delete professional.password;

    try {
      await professionalRepository.insert(professional);

      professional.picturePath = userPicture(professional.pictureName);
      delete professional.pictureName;
      delete professional.passwordHash;

      return res.status(201).json(professional);
    } catch (err) {
      if (professional.pictureName) deletePicture(professional.pictureName);

      if (err.routine?.includes('unique')) {
        const [_, key] = err.constraint.split('_');

        return conflict(res, key, professional[key]);
      }

      console.error(err);

      return internalError(res, 'Erro ao inserir usuário no banco de dados');
    }
  }

  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const professional = await professionalRepository.findByEmail(email);

    if (!professional) return badRequest(res, 'Credenciais inválidas');

    const passwordsMatch = await bcrypt.compare(
      password,
      professional.passwordHash
    );

    if (!passwordsMatch) return badRequest(res, 'Credenciais inválidas');

    const { phone } = await phoneRepository.findById(professional.phoneId);
    professional.phone = phone;

    professional.workplace = await workplaceRepository.findById(
      professional.workplaceId
    );

    professional.services = await serviceRepository.findByProfessionalId(
      professional.id
    );

    professional.workHours = await workHourRepository.findByProfessionalId(
      professional.id
    );

    professional.picturePath = userPicture(professional.pictureName);
    professional.type = 'PROFESSIONAL';

    delete professional.passwordHash;
    delete professional.phoneId;
    delete professional.pictureName;
    delete professional.workplaceId;

    const accessToken = jwt.sign(professional, process.env.JWT_LOGIN_SECRET, {
      expiresIn: '2h'
    });

    return res.status(200).json({ jwt: accessToken });
  }

  public static async search(
    req: Request<{}, {}, {}, { city: string; query?: string }>,
    res: Response
  ) {
    const search = req.query;

    const ids = await professionalRepository.findIdsByCity(
      search.city,
      search.query
    );

    const professionals = await professionalRepository.findByIds(ids);

    res.status(200).json(professionals);
  }
}
