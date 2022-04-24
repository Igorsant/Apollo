import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { toCamel, toSnake } from 'snake-camel';

import { cpfIsValid } from '../helpers/cpf.helper';
import databaseService from '../services/DatabaseService';
import {
  deletePicture,
  saveBase64Image,
  userPicture
} from '../helpers/image.helper';
import { badRequest, conflict, internalError } from '../helpers/http.helper';
import PhoneController from './PhoneController';
import ServiceController from './ServiceController';
import ServiceType from '../types/service.type';
import WorkplaceController from './WorkplaceController';
import WorkHourController from './WorkHourController';
import WorkHourType from '../types/workHour.type';

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
      await ProfessionalController.insertProfessional(professional);

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
    const loginCredentials = req.body;

    const professional = await ProfessionalController.getProfessionalByEmail(
      loginCredentials.email
    );

    if (!professional) return badRequest(res, 'Credenciais inválidas');

    const passwordsMatch = await bcrypt.compare(
      loginCredentials.password,
      professional.passwordHash
    );

    if (!passwordsMatch) return badRequest(res, 'Credenciais inválidas');

    const { phone } = await PhoneController.getPhoneById(professional.phoneId);
    professional.phone = phone;

    professional.workplace = await WorkplaceController.getWorkplaceById(
      professional.workplaceId
    );

    professional.services = await ServiceController.getServicesByProfessionalId(
      professional.id
    );

    professional.workHours =
      await WorkHourController.getWorkHoursByProfessionalId(professional.id);

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

    const ids = await ProfessionalController.findByCity(
      search.city,
      search.query
    );

    const professionals = await ProfessionalController.getProfessionalsByIds(
      ids
    );

    res.status(200).json(professionals);
  }

  private static async findByCity(
    city: string,
    query?: string
  ): Promise<number[]> {
    return databaseService.connection
      .select('professional.id')
      .from('professional')
      .join('workplace', 'professional.workplace_id', 'workplace.id')
      .where('workplace.city', city)
      .modify((queryBuilder) => {
        if (query)
          queryBuilder.whereILike('professional.full_name', `%${query}%`);
      })
      .then((rows) => rows.map((r: any) => r.id));
  }

  private static async getProfessionalByEmail(email: string): Promise<any> {
    return databaseService.connection
      .table('professional')
      .where('email', email)
      .first()
      .then(toCamel);
  }

  private static async getProfessionalsByIds(ids: number[]) {
    const professionals = await databaseService.connection
      .table('professional')
      .select(
        'id',
        'about_me',
        'phone_id',
        'workplace_id',
        'full_name',
        'nickname',
        'picture_name'
      )
      .whereIn('id', ids)
      .then((rows) => rows.map(toCamel) as any[]);

    for (const p of professionals) {
      [{ phone: p.phone }] = await databaseService.connection
        .table('phone')
        .select('phone')
        .where('id', p.phoneId);

      p.picturePath = userPicture(p.pictureName);

      p.workplace = await WorkplaceController.getWorkplaceById(p.workplaceId);

      p.services = await ServiceController.getServicesByProfessionalId(p.id);
      p.workHours = await WorkHourController.getWorkHoursByProfessionalId(p.id);

      delete p.phoneId;
      delete p.pictureName;
      delete p.workplaceId;
    }

    return professionals;
  }

  private static async insertProfessional(professional: any) {
    const localProfessional = JSON.parse(JSON.stringify(professional));

    return databaseService.connection.transaction(async (trx) => {
      const { workplace, services, workHours } = localProfessional;

      workplace.phone1Id = await PhoneController.insertPhone(trx, {
        phone: workplace.phone1,
        isPhoneWhatsapp: workplace.isPhone1Whatsapp
      });

      delete workplace.phone1;
      delete workplace.isPhone1Whatsapp;

      if (workplace.phone2)
        workplace.phone2Id = await PhoneController.insertPhone(trx, {
          phone: workplace.phone2,
          isPhoneWhatsapp: workplace.isPhone2Whatsapp
        });

      delete workplace.phone2;
      delete workplace.isPhone2Whatsapp;

      localProfessional.workplaceId = await WorkplaceController.insertWorkplace(
        trx,
        workplace
      );

      localProfessional.phoneId = await PhoneController.insertPhone(trx, {
        phone: localProfessional.phone
      });

      delete localProfessional.phone;
      delete localProfessional.workplace;
      delete localProfessional.services;
      delete localProfessional.workHours;

      const [{ id: professionalId }] = await trx('professional')
        .insert(toSnake(localProfessional))
        .returning('id');

      services.every((s: ServiceType) => (s.professionalId = professionalId));
      await ServiceController.insertServices(trx, services);

      workHours.every((w: WorkHourType) => (w.professionalId = professionalId));
      await WorkHourController.insertWorkHours(trx, workHours);

      await trx.commit();
    });
  }

  public static async professionalExists(id: number): Promise<boolean> {
    return await databaseService.connection
      .table('professional')
      .where('id', id)
      .then((rows) => rows.length > 0);
  }
}
