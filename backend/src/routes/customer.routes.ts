import express from 'express';

import CustomerController from '../controllers/CustomerController';
import customerSchema from '../schemas/customer.schema';
import validateReq from '../middlewares/validateRequest.middleware';

const customerRouter = express.Router();

customerRouter.post(
  '/',
  validateReq(customerSchema, 'body'),
  CustomerController.register
);

export default customerRouter;
