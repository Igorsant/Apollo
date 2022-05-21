import express from 'express';

import {
  createSchedulingSchema,
  deleteSchedulingSchema
} from '../schemas/scheduling.schema';
import authGuard from '../middlewares/authGuard.middleware';
import SchedulingController from '../controllers/SchedulingController';
import validateReq from '../middlewares/validateRequest.middleware';

const schedulingRouter = express.Router();

schedulingRouter.post(
  '/',
  authGuard('CUSTOMER'),
  validateReq(createSchedulingSchema, 'body'),
  SchedulingController.create
);
schedulingRouter.delete(
  '/:schedulingId',
  authGuard('CUSTOMER'),
  validateReq(deleteSchedulingSchema, 'query'),
  SchedulingController.deleteById
);

export default schedulingRouter;
