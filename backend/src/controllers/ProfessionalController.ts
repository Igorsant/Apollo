import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import { cpfIsValid } from '../helpers/cpf.helper';
import databaseService from '../services/DatabaseService';
import { saveImageFromBase64 } from '../helpers/image.helper';
import { insertPhone } from '../helpers/professional.helper';
import { ServiceType } from '../types/service.type';
import { WorkHourType } from '../types/workhour.type';
import {
  DEFAULT_USER_PICTURE,
  PICTURES_FOLDER,
  PICTURES_PATH
} from '../helpers/consts.helper';
import path from 'path';

export default class ProfessionalController {
  public static async register(req: Request, res: Response) {
    const professional = req.body;

    if (!cpfIsValid(professional.cpf))
      return res
        .status(400)
        .json({ error: `cpf ${professional.cpf} é inválido.` });

    let pictureName = '';

    if (professional.pictureBase64) {
      try {
        pictureName = await saveImageFromBase64(
          professional.pictureBase64,
          'jpg'
        );
        delete professional.pictureBase64;
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: 'Erro interno ao salvar imagem.' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(professional.password, salt);
    delete professional.password;

    return databaseService.connection
      .transaction(async (trx) => {
        const { workplace, services, workHours } = professional;

        const [insertedPhone1] = await insertPhone(trx, {
          phone: workplace.phone1,
          is_phone_whatsapp: workplace.isPhone1Whatsapp
        }).returning('id');

        let insertedPhone2;

        if (workplace.phone2) {
          [insertedPhone2] = await insertPhone(trx, {
            phone: workplace.phone2,
            is_phone_whatsapp: workplace.isPhone2Whatsapp
          }).returning('id');
        }

        const [insertedWorkplace] = await trx('workplace')
          .insert({
            street: workplace.street,
            street_number: workplace.streetNumber,
            complement: workplace.complement,
            phone1_id: insertedPhone1.id,
            phone2_id: insertedPhone2?.id
          })
          .returning('id');

        const [insertedPhone] = await insertPhone(trx, {
          phone: professional.phone
        }).returning('id');

        const [insertedProfessional] = await trx('professional')
          .insert({
            about_me: professional.aboutMe,
            cpf: professional.cpf,
            email: professional.email,
            full_name: professional.fullName,
            nickname: professional.nickname,
            password_hash: hashedPassword,
            phone_id: insertedPhone.id,
            picture_name: pictureName,
            workplace_id: insertedWorkplace.id
          })
          .returning('id');

        await trx('service').insert(
          services.map((service: ServiceType) => {
            return {
              name: service.name,
              price: service.startingPrice,
              estimated_duration: service.estimatedTime,
              professional_id: insertedProfessional.id
            };
          })
        );

        await trx('workday').insert(
          workHours.map((workHour: WorkHourType) => {
            return {
              start_time: workHour.startTime,
              end_time: workHour.endTime,
              break_time: false,
              week_day: workHour.weekday,
              professional_id: insertedProfessional.id
            };
          })
        );

        await trx.commit();
      })
      .then((_) => {
        professional.picturePath = `${PICTURES_PATH}/${
          pictureName || DEFAULT_USER_PICTURE
        }`;

        return res.status(201).json(professional);
      })
      .catch((err) => {
        if (pictureName) {
          fs.unlink(path.join(PICTURES_FOLDER, pictureName), (err) => {});
        }
        if (err.routine?.includes('unique')) {
          const [_, key] = err.constraint.split('_');

          return res.status(409).json({
            error: `Já existe um usuário registrado com ${key} ${professional[key]}`
          });
        }

        console.error(err);

        return res
          .status(500)
          .json({ error: 'Erro ao inserir usuário no banco de dados' });
      });
  }

  public static async login(req: Request, res: Response) {
    const loginCredentials = req.body;

    const [professional] = await databaseService.connection
      .table('professional')
      .where('email', loginCredentials.email);

    if (!professional)
      return res.status(400).json({ error: 'Credenciais inválidas' });

    const passwordsMatch = await bcrypt.compare(
      loginCredentials.password,
      professional.password_hash
    );

    if (!passwordsMatch)
      return res.status(400).json({ error: 'Credenciais inválidas' });

    const [phone] = await databaseService.connection
      .table('phone')
      .where('id', professional.phone_id);

    const [workplace] = await databaseService.connection
      .table('workplace')
      .select('street', 'street_number', 'complement', 'phone1_id', 'phone2_id')
      .where('id', professional.workplace_id);

    const [[workplacePhone1], [workplacePhone2]] = await Promise.all([
      databaseService.connection
        .table('phone')
        .select('phone', 'is_phone_whatsapp')
        .where('id', workplace.phone1_id),
      databaseService.connection
        .table('phone')
        .select('phone', 'is_phone_whatsapp')
        .where('id', workplace.phone2_id)
    ]);

    delete workplace.phone1_id;
    delete workplace.phone2_id;

    workplace.phones = [];
    workplace.phones.push(workplacePhone1);
    if (workplacePhone2) workplace.phones.push(workplacePhone2);

    const services = await databaseService.connection
      .table('service')
      .select('name', 'price', 'estimated_duration')
      .where('professional_id', professional.id);

    const workHours = await databaseService.connection
      .table('workday')
      .select('week_day', 'start_time', 'end_time', 'break_time')
      .where('professional_id', professional.id);

    const picturePath = `${PICTURES_PATH}/${
      professional.picture_name || DEFAULT_USER_PICTURE
    }`;

    const accessToken = jwt.sign(
      {
        id: professional.id,
        fullName: professional.full_name,
        nickname: professional.nickname,
        aboutMe: professional.about_me,
        picturePath: picturePath,
        email: professional.email,
        phone: phone.phone,
        cpf: professional.cpf,
        workplace,
        services,
        workHours
      },
      process.env.JWT_LOGIN_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({ jwt: accessToken });
  }
}
