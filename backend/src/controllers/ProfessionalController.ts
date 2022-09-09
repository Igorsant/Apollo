import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import databaseService from '../services/DatabaseService';
import { cpfIsValid } from '../helpers/cpf.helper';
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
import favoriteRepository from '../repositories/favorite.repository';
import phoneRepository from '../repositories/phone.repository';
import professionalRepository from '../repositories/professional.repository';
import reviewRepository from '../repositories/review.repository';
import ReviewType from '../types/review.type';
import serviceRepository from '../repositories/service.repository';
import ServiceType from '../types/service.type';
import workHourRepository from '../repositories/workHour.repository';
import WorkHourType from '../types/workHour.type';
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

    professional.type = 'PROFESSIONAL';

    delete professional.passwordHash;

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
    for (const p of professionals) {
      const reviews = await reviewRepository.findByProfessionalId(p.id);
      p.totalReviews = reviews.length;

      if (!reviews) {
        continue;
      }

      p.averageRating =
        reviews
          .map((r: ReviewType) => r.rating)
          .reduce((total: number, current: number) => total + current, 0.0) /
        p.totalReviews;
    }

    return res.status(200).json(professionals);
  }

  public static async update(req: Request, res: Response) {
    const user = res.locals.user;
    const id = +req.params.professionalId;

    if (user.id !== id) return forbidden(res);

    const updatedProfessional = req.body;
    const professional = await professionalRepository.findById(id);

    if (!professional)
      return notFound(res, `Profissional com id ${id} não encontrado`);

    const passwordsMatch = await bcrypt.compare(
      updatedProfessional.password,
      professional.passwordHash
    );
    delete updatedProfessional.password;

    if (!passwordsMatch) return badRequest(res, 'Senha incorreta');

    for (const field of ['fullName', 'cpf']) {
      if (updatedProfessional[field] !== professional[field])
        return badRequest(res, `Campo ${field} não pode ser alterado`);
    }

    let newPictureName: string;

    try {
      newPictureName = await saveBase64Image(updatedProfessional.pictureBase64);
      delete updatedProfessional.pictureBase64;
    } catch (err) {
      console.error(err);
      return internalError(res, 'Erro interno ao salvar imagem.');
    }

    updatedProfessional.pictureName =
      newPictureName ?? professional.pictureName;

    if (updatedProfessional.updatedPassword) {
      const salt = await bcrypt.genSalt(10);
      updatedProfessional.passwordHash = await bcrypt.hash(
        updatedProfessional.updatedPassword,
        salt
      );
      delete updatedProfessional.updatedPassword;
    } else {
      updatedProfessional.passwordHash = professional.passwordHash;
    }

    const oldServices = await serviceRepository.findByProfessionalId(id);
    const oldWorkHours = await workHourRepository.findByProfessionalId(id);

    const { services, workHours, workplace } = updatedProfessional;

    services.every((s: any) => (s.professionalId = id));
    workHours.every((w: any) => (w.professionalId = id));

    const servicesToUpdate = services.filter((s: any) => !!s.id);
    const servicesToCreate = services.filter((s: any) => !s.id);

    const workHoursToUpdate = workHours.filter((w: any) => !!w.id);
    const workHoursToCreate = workHours.filter((w: any) => !w.id);

    delete updatedProfessional.services;
    delete updatedProfessional.workHours;
    delete updatedProfessional.workplace;

    const updatedServicesIds = services
      .filter((s: any) => !!s.id)
      .map((s: any) => s.id);
    const deleteServicesIds = oldServices
      .filter((s: ServiceType) => !updatedServicesIds.includes(s.id))
      .map((s: ServiceType) => s.id);

    const updatedWorkHoursIds = workHours
      .filter((w: any) => !!w.id)
      .map((w: any) => w.id);
    const deleteWorkHoursIds = oldWorkHours
      .filter((w: WorkHourType) => !updatedWorkHoursIds.includes(w.id))
      .map((w: WorkHourType) => w.id);

    return databaseService.connection.transaction(async (trx) => {
      try {
        await serviceRepository.deleteAll(deleteServicesIds, trx);
        await serviceRepository.insertAll(servicesToCreate, trx);
        await serviceRepository.updateAll(servicesToUpdate, trx);

        await workHourRepository.deleteAll(deleteWorkHoursIds, trx);
        await workHourRepository.insertAll(workHoursToCreate, trx);
        await workHourRepository.updateAll(workHoursToUpdate, trx);

        await phoneRepository.update(
          professional.phoneId,
          { phone: updatedProfessional.phone },
          trx
        );

        delete updatedProfessional.phone;

        await workplaceRepository.update(
          professional.workplaceId,
          workplace,
          trx
        );

        await professionalRepository.update(id, updatedProfessional, trx);

        await trx.commit();

        const newProfessional = await professionalRepository.findByEmail(
          updatedProfessional.email
        );
        delete newProfessional.passwordHash;

        newProfessional.type = 'PROFESSIONAL';

        const accessToken = jwt.sign(
          newProfessional,
          process.env.JWT_LOGIN_SECRET,
          {
            expiresIn: '2h'
          }
        );

        return res.status(200).json({ jwt: accessToken });
      } catch (err) {
        if (newPictureName) deletePicture(newPictureName);

        if (err.routine?.includes('unique')) {
          const [_, key] = err.constraint.split('_');

          return conflict(res, key, updatedProfessional[key]);
        }

        console.error(err);
        return internalError(
          res,
          'Erro interno ao atualizar informações do usuário'
        );
      }
    });
  }

  public static async addFavorite(req: Request, res: Response) {
    const professionalId = +req.params.professionalId;
    const { id: userId } = res.locals.user;

    try {
      if (!(await professionalRepository.exists(professionalId)))
        return notFound(
          res,
          `Profissional com id ${professionalId} não encontrado`
        );
      if (await favoriteRepository.exists(userId, professionalId))
        return badRequest(res, 'Profissional já está favoritado');

      await favoriteRepository.insert(userId, professionalId);

      return res.status(204).json();
    } catch (err) {
      console.error(err);

      return internalError(res, 'Erro ao inserir favoritos no banco de dados');
    }
  }

  public static async removeFavorite(req: Request, res: Response) {
    const professionalId = +req.params.professionalId;
    const { id: userId } = res.locals.user;

    try {
      await favoriteRepository.delete(userId, professionalId);

      return res.status(204).json();
    } catch (err) {
      console.error(err);

      return internalError(res, 'Erro ao remover favoritos do banco de dados');
    }
  }

  public static async getFavorites(req: Request, res: Response) {
    const { id: userId } = res.locals.user;

    try {
      const professionalIds = await favoriteRepository.getProfessionalIds(
        userId
      );

      const professionals = await professionalRepository.findByIds(
        professionalIds
      );

      return res.status(200).json(professionals);
    } catch (err) {
      console.error(err);

      return internalError(res, 'Erro ao retornar profissionais favoritados.');
    }
  }

  public static async getById(req: Request, res: Response) {
    const { professionalId } = req.params;

    try {
      const professionalArray = await professionalRepository.findByIds([
        +professionalId
      ]);

      if (!(professionalArray && professionalArray.length))
        return badRequest(res, 'Profissional não existente');

      const professional = professionalArray[0];

      professional.totalReviews = await reviewRepository.numberOfReviews(
        professional.id
      );

      delete professional.id;
      delete professional.passwordHash;
      delete professional.pictureName;

      return res.status(200).json(professional);
    } catch (err) {
      console.error(err);

      return internalError(res, 'Erro interno ao buscar profissional');
    }
  }
}
