import express from 'express';

import authGuard from '../middlewares/authGuard.middleware';
import CustomerController from '../controllers/CustomerController';
import {
  customerIdSchema,
  customerSchema,
  customerUpdateSchema
} from '../schemas/customer.schema';
import loginSchema from '../schemas/login.schema';
import validateReq from '../middlewares/validateRequest.middleware';

const customerRouter = express.Router();

customerRouter.post(
  '/',
  validateReq(customerSchema, 'body'),
  CustomerController.register
);
customerRouter.post(
  '/login',
  validateReq(loginSchema, 'body'),
  CustomerController.login
);
customerRouter.get(
  '/:customerId',
  validateReq(customerIdSchema, 'params'),
  CustomerController.getById
);
customerRouter.put(
  '/:customerId',
  authGuard('CUSTOMER'),
  validateReq(customerIdSchema, 'params'),
  validateReq(customerUpdateSchema, 'body'),
  CustomerController.update
);

export default customerRouter;
