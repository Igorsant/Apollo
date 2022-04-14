import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { cpfIsValid } from '../helpers/cpf.helper';
import databaseService from '../services/DatabaseService';
import { saveImageFromBase64 } from '../helpers/image.helper';

export default class CustomerController {
  public static async register(req: Request, res: Response) {
    const customer = req.body;

    if (!cpfIsValid(customer.cpf))
      return res.status(400).json({ error: `cpf ${customer.cpf} é inválido.` });

    let picturePath = '/pictures/default_user.jpg';

    if (customer.pictureBase64) {
      try {
        picturePath = await saveImageFromBase64(customer.pictureBase64, 'jpg');
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

    databaseService.connection.transaction(async (trx) => {
      try {
        const [insertedPhone] = await trx('phone')
          .insert({
            phone: customer.phone
          })
          .returning('id');

        await trx('customer').insert({
          full_name: customer.fullName,
          nickname: customer.nickname,
          picture_path: picturePath,
          email: customer.email,
          phone_id: insertedPhone.id,
          cpf: customer.cpf,
          password_hash: hashedPassword
        });

        await trx.commit();
      } catch (err) {
        console.error(err);

        return res
          .status(500)
          .json('Erro ao inserir usuário no banco de dados');
      }
    });

    customer.picturePath = picturePath;

    return res.status(201).json(customer);
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

    const accessToken = jwt.sign(
      {
        fullName: customer.full_name,
        nickname: customer.nickname,
        picturePath: customer.picture_path,
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
