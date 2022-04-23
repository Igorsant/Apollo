import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { toCamel, toSnake } from 'snake-camel';

import { cpfIsValid } from '../helpers/cpf.helper';
import CustomerType from '../types/customer.type';
import databaseService from '../services/DatabaseService';
import { badRequest, conflict, internalError } from '../helpers/http.helper';
import {
  deletePicture,
  saveBase64Image,
  userPicture
} from '../helpers/image.helper';
import PhoneController from './PhoneController';

export default class CustomerController {
  public static async register(req: Request, res: Response) {
    const customer = req.body;

    if (!cpfIsValid(customer.cpf))
      return badRequest(res, `cpf ${customer.cpf} é inválido.`);

    try {
      customer.pictureName = await saveBase64Image(customer.pictureBase64);
      delete customer.pictureBase64;
    } catch (err) {
      console.error(err);
      return internalError(res, 'Erro interno ao salvar imagem.');
    }

    const salt = await bcrypt.genSalt(10);
    customer.passwordHash = await bcrypt.hash(customer.password, salt);
    delete customer.password;

    try {
      await CustomerController.insertCustomer(customer);

      customer.picturePath = userPicture(customer.pictureName);

      delete customer.passwordHash;
      delete customer.pictureName;

      return res.status(201).json(customer);
    } catch (err) {
      if (customer.pictureName) deletePicture(customer.pictureName);

      if (err.routine?.includes('unique')) {
        const [_, key] = err.constraint.split('_');

        return conflict(res, key, customer[key]);
      }

      console.error(err);

      return internalError(res, 'Erro ao inserir usuário no banco de dados');
    }
  }

  public static async login(req: Request, res: Response) {
    const loginCredentials = req.body;

    let customer = await CustomerController.getCustomerByEmail(
      loginCredentials.email
    );

    if (!customer) return badRequest(res, 'Credenciais inválidas');

    customer = toCamel(customer);

    const passwordsMatch = await bcrypt.compare(
      loginCredentials.password,
      customer.passwordHash
    );

    if (!passwordsMatch) return badRequest(res, 'Credenciais inválidas');

    const { phone } = await PhoneController.getPhoneById(customer.phoneId);

    customer.phone = phone;
    customer.picturePath = userPicture(customer.pictureName);

    delete customer.passwordHash;
    delete customer.phoneId;
    delete customer.pictureName;

    customer.type = 'CUSTOMER';

    const accessToken = jwt.sign(customer, process.env.JWT_LOGIN_SECRET, {
      expiresIn: '2h'
    });

    return res.status(200).json({ jwt: accessToken });
  }

  private static async getCustomerByEmail(email: string) {
    return databaseService.connection
      .table('customer')
      .where('email', email)
      .first();
  }

  private static async insertCustomer(customer: CustomerType) {
    const localCustomer: CustomerType = JSON.parse(JSON.stringify(customer));

    return databaseService.connection.transaction(async (trx) => {
      localCustomer.phoneId = await PhoneController.insertPhone(trx, {
        phone: localCustomer.phone
      });

      delete localCustomer.phone;

      await trx('customer').insert(toSnake(localCustomer));

      return trx.commit();
    });
  }
}
