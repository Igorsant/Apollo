import express from 'express';

import loginSchema from '../schemas/login.schema';
import ProfessionalController from '../controllers/ProfessionalController';
import professionalSchema from '../schemas/professional.schema';
import searchSchema from '../schemas/search.schema';
import validateReq from '../middlewares/validateRequest.middleware';

const professionalRouter = express.Router();

professionalRouter.post(
  '/',
  validateReq(professionalSchema, 'body'),
  ProfessionalController.register
);
professionalRouter.post(
  '/login',
  validateReq(loginSchema, 'body'),
  ProfessionalController.login
);
professionalRouter.get(
  '/search',
  validateReq(searchSchema, 'query'),
  ProfessionalController.search
);

export default professionalRouter;
