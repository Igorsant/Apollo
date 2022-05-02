import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { cpfIsValid } from '../helpers/cpf.helper';
import customerRepository from '../repositories/customer.repository';
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
import phoneRepository from '../repositories/phone.repository';

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
      await customerRepository.insert(customer);

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

    let customer = await customerRepository.findByEmail(loginCredentials.email);

    if (!customer) return badRequest(res, 'Credenciais inválidas');

    const passwordsMatch = await bcrypt.compare(
      loginCredentials.password,
      customer.passwordHash
    );

    if (!passwordsMatch) return badRequest(res, 'Credenciais inválidas');

    const { phone } = await phoneRepository.findById(customer.phoneId);

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

  public static async getById(req: Request, res: Response) {
    const { customerId } = req.params;

    try {
      const customer = await customerRepository.findById(+customerId);

      if (!customer) return badRequest(res, 'Usuário não existente');

      const { phone } = await phoneRepository.findById(customer.phoneId);

      customer.phone = phone;
      customer.picturePath = userPicture(customer.pictureName);

      delete customer.id;
      delete customer.phoneId;
      delete customer.passwordHash;
      delete customer.pictureName;

      return res.status(200).json(customer);
    } catch (err) {
      console.error(err);

      return internalError(res, 'Erro interno ao buscar usuário');
    }
  }

  public static async update(req: Request, res: Response) {
    const user = res.locals.user;
    const id = +req.params.customerId;

    if (user.id !== id) return forbidden(res);

    const updatedCustomer = req.body;
    const customer = await customerRepository.findById(id);

    if (!customer) return notFound(res, `Cliente com id ${id} não encontrado`);

    const passwordsMatch = await bcrypt.compare(
      updatedCustomer.password,
      customer.passwordHash
    );
    delete updatedCustomer.password;

    if (!passwordsMatch) return badRequest(res, 'Senha incorreta');

    for (const field of ['fullName', 'cpf']) {
      if (updatedCustomer[field] !== customer[field])
        return badRequest(res, `Campo ${field} não pode ser alterado`);
    }

    let newPictureName;

    try {
      newPictureName = await saveBase64Image(updatedCustomer.pictureBase64);
      delete updatedCustomer.pictureBase64;
    } catch (err) {
      console.error(err);
      return internalError(res, 'Erro interno ao salvar imagem.');
    }

    updatedCustomer.pictureName = newPictureName ?? customer.pictureName;

    if (updatedCustomer.updatedPassword) {
      const salt = await bcrypt.genSalt(10);
      updatedCustomer.passwordHash = await bcrypt.hash(
        updatedCustomer.updatedPassword,
        salt
      );
      delete updatedCustomer.updatedPassword;
    }

    try {
      updatedCustomer.phoneId = customer.phoneId;
      await customerRepository.update(id, updatedCustomer);

      updatedCustomer.picturePath = userPicture(updatedCustomer.pictureName);

      delete updatedCustomer.passwordHash;
      delete updatedCustomer.phoneId;
      delete updatedCustomer.pictureName;

      const accessToken = jwt.sign(
        updatedCustomer,
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

        return conflict(res, key, updatedCustomer[key]);
      }

      console.error(err);
      return internalError(
        res,
        'Erro interno ao atualizar informações do usuário'
      );
    }
  }
}
