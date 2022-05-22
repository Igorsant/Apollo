import express from 'express';

import authGuard from '../middlewares/authGuard.middleware';
import loginSchema from '../schemas/login.schema';
import ProfessionalController from '../controllers/ProfessionalController';
import {
  professionalIdSchema,
  professionalSchema,
  professionalUpdateSchema
} from '../schemas/professional.schema';
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
professionalRouter.put(
  '/:professionalId',
  authGuard('PROFESSIONAL'),
  validateReq(professionalIdSchema, 'params'),
  validateReq(professionalUpdateSchema, 'body'),
  ProfessionalController.update
);
professionalRouter.post(
  '/:professionalId/favorite',
  authGuard('CUSTOMER'),
  validateReq(professionalIdSchema, 'params'),
  ProfessionalController.addFavorite
);
professionalRouter.delete(
  '/:professionalId/favorite',
  authGuard('CUSTOMER'),
  validateReq(professionalIdSchema, 'params'),
  ProfessionalController.removeFavorite
);
professionalRouter.get(
  '/favorites',
  authGuard('CUSTOMER'),
  ProfessionalController.getFavorites
);
professionalRouter.get(
  '/:professionalId',
  validateReq(professionalIdSchema, 'params'),
  ProfessionalController.getById
);

export default professionalRouter;
