import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { cpfIsValid } from '../helpers/cpf.helper';
import databaseService from '../services/DatabaseService';
import { saveImageFromBase64 } from '../helpers/image.helper';

export default class ProfessionalController {
  public static async register(req: Request, res: Response) {
    const professional = req.body;

    if (!cpfIsValid(professional.cpf))
      return res.status(400).json({ error: `cpf ${professional.cpf} é inválido.` });

    let picturePath = '/pictures/default_user.jpg';

    if (professional.pictureBase64) {
      try {
        picturePath = await saveImageFromBase64(professional.pictureBase64, 'jpg');
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
        const [insertedPhone] = await trx('phone')
          .insert({
            phone: professional.phone
          })
          .returning('id');

        await trx('professional').insert({
          full_name: professional.fullName,
          nickname: professional.nickname,
          picture_path: picturePath,
          email: professional.email,
          phone_id: insertedPhone.id,
          cpf: professional.cpf,
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

    professional.picturePath = picturePath;

    return res.status(201).json(professional);
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
