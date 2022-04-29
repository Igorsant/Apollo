import express from 'express';

import CustomerController from '../controllers/CustomerController';
import customerSchema from '../schemas/customer.schema';
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
  CustomerController.search
);

export default customerRouter;
