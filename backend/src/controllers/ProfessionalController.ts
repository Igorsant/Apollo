import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { cpfIsValid } from '../helpers/cpf.helper';
import databaseService from '../services/DatabaseService';
import { saveImageFromBase64 } from '../helpers/image.helper';

const defaultPicturePath = '/pictures/default_user.jpg';

export default class ProfessionalController {
  public static async register(req: Request, res: Response) {
    const professional = req.body;

    if (!cpfIsValid(professional.cpf))
      return res
        .status(400)
        .json({ error: `cpf ${professional.cpf} é inválido.` });

    let picturePath = null;

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

    databaseService.connection.transaction(async (trx) => {
      try {
        const {
          aboutMe: about_me,
          cpf,
          email,
          fullName: full_name,
          nickname,
          phone,
          picturePath: picture_path,
          services,
          workHours: work_hours,
          workplace
        } = professional;

        const {
          complement,
          isPhone1Whatsapp,
          isPhone2Whatsapp,
          phone1,
          phone2,
          street,
          streetNumber: street_number
        } = workplace;

        const [insertedPhone1] = await trx('phone')
          .insert({ phone: phone1, is_phone_whatsapp: isPhone1Whatsapp })
          .returning('id');

        let insertedPhone2;

        if (phone2) {
          [insertedPhone2] = await trx('phone')
            .insert({ phone: phone2, is_phone_whatsapp: isPhone2Whatsapp })
            .returning('id');
        }

        const [insertedWorkplace] = await trx('workplace')
          .insert({
            street,
            street_number,
            complement,
            phone1_id: insertedPhone1.id,
            phone2_id: insertedPhone2?.id
          })
          .returning('id');

        const [insertedPhone] = await trx('phone')
          .insert({ phone })
          .returning('id');

        await trx('professional').insert({
          about_me,
          cpf,
          email,
          full_name,
          nickname,
          password_hash: hashedPassword,
          phone_id: insertedPhone.id,
          picture_path,
          services,
          work_hours,
          workplace: insertedWorkplace.id
        });

        await trx.commit();
      } catch (err) {
        console.error(err);

        return res
          .status(500)
          .json('Erro ao inserir usuário no banco de dados');
      }
    });

    professional.picturePath = picturePath || defaultPicturePath;

    return res.status(201).json(professional);
  }
}

/* 
  TODO Remover atributo 'password-hash' antes de retornar como json
  TODO Passar todas as inserções do 'phone' e 'workplace' em um Promise.all
*/
