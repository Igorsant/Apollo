import express from 'express';

import authGuard from '../middlewares/authGuard.middleware';
import { createSchedulingSchema } from '../schemas/scheduling.schema';
import SchedulingController from '../controllers/SchedulingController';
import validateReq from '../middlewares/validateRequest.middleware';

const schedulingRouter = express.Router();

schedulingRouter.post(
  '/',
  authGuard('CUSTOMER'),
  validateReq(createSchedulingSchema, 'body'),
  SchedulingController.create
);

export default schedulingRouter;
