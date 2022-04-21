import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

import {
  DEFAULT_USER_PICTURE,
  PICTURES_FOLDER,
  PICTURES_PATH
} from '../helpers/consts.helper';
import { cpfIsValid } from '../helpers/cpf.helper';
import databaseService from '../services/DatabaseService';
import { saveImageFromBase64 } from '../helpers/image.helper';

export default class CustomerController {
  public static async register(req: Request, res: Response) {
    const customer = req.body;

    if (!cpfIsValid(customer.cpf))
      return res.status(400).json({ error: `cpf ${customer.cpf} é inválido.` });

    let pictureName: string;

    if (customer.pictureBase64) {
      try {
        pictureName = await saveImageFromBase64(customer.pictureBase64, 'jpg');
        delete customer.pictureBase64;
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: 'Erro interno ao salvar imagem.' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(customer.password, salt);
    delete customer.password;

    return databaseService.connection.transaction(async (trx) => {
      try {
        const [insertedPhone] = await trx('phone')
          .insert({
            phone: customer.phone
          })
          .returning('id');

        await trx('customer').insert({
          full_name: customer.fullName,
          nickname: customer.nickname,
          picture_name: pictureName,
          email: customer.email,
          phone_id: insertedPhone.id,
          cpf: customer.cpf,
          password_hash: hashedPassword
        });

        await trx.commit();

        customer.picturePath = `${PICTURES_PATH}/${
          pictureName || DEFAULT_USER_PICTURE
        }`;

        return res.status(201).json(customer);
      } catch (err) {
        if (pictureName) {
          fs.unlink(path.join(PICTURES_FOLDER, pictureName), (err) => {});
        }
        if (err.routine?.includes('unique')) {
          const [_, key] = err.constraint.split('_');

          return res.status(409).json({
            error: `Já existe um usuário registrado com ${key} ${customer[key]}`
          });
        }

        console.error(err);

        return res
          .status(500)
          .json({ error: 'Erro ao inserir usuário no banco de dados' });
      }
    });
  }

  public static async login(req: Request, res: Response) {
    const loginCredentials = req.body;

    const [customer] = await databaseService.connection
      .table('customer')
      .where('email', loginCredentials.email);

    if (!customer)
      return res.status(400).json({ error: 'Credenciais inválidas' });

    const passwordsMatch = await bcrypt.compare(
      loginCredentials.password,
      customer.password_hash
    );

    if (!passwordsMatch)
      return res.status(400).json({ error: 'Credenciais inválidas' });

    const [phone] = await databaseService.connection
      .table('phone')
      .where('id', customer.phone_id);

    const picturePath = `${PICTURES_PATH}/${
      customer.picture_name || DEFAULT_USER_PICTURE
    }`;

    const accessToken = jwt.sign(
      {
        id: customer.id,
        fullName: customer.full_name,
        nickname: customer.nickname,
        picturePath: picturePath,
        email: customer.email,
        phone: phone.phone,
        cpf: customer.cpf
      },
      process.env.JWT_LOGIN_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({ jwt: accessToken });
  }
}
