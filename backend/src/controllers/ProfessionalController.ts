import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { cpfIsValid } from '../helpers/cpf.helper';
import databaseService from '../services/DatabaseService';
import { saveImageFromBase64 } from '../helpers/image.helper';
import { insertPhone } from '../helpers/professional.helper';
import { ServiceType } from '../types/service.type';
import { WorkHourType } from '../types/workhour.type';

const defaultPicturePath = '/pictures/default_user.jpg';

export default class ProfessionalController {
  public static async register(req: Request, res: Response) {
    const professional = req.body;
    let picturePath = '';

    if (!cpfIsValid(professional.cpf))
      return res
        .status(400)
        .json({ error: `cpf ${professional.cpf} é inválido.` });

    if (professional.pictureBase64) {
      try {
        picturePath = await saveImageFromBase64(
          professional.pictureBase64,
          'jpg'
        );
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
            picture_path: picturePath,
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
        professional.picturePath = picturePath || defaultPicturePath;

        return res.status(201).json(professional);
      })
      .catch((err) => {
        console.error(err);

        return res
          .status(500)
          .json('Erro ao inserir usuário no banco de dados');
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

    const accessToken = jwt.sign(
      {
        id: professional.id,
        fullName: professional.full_name,
        nickname: professional.nickname,
        picturePath: professional.picture_path,
        email: professional.email,
        phone: phone.phone,
        cpf: professional.cpf
      },
      process.env.JWT_LOGIN_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({ jwt: accessToken });
  }
}
