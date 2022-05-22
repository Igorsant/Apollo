import express from 'express';

import authGuard from '../middlewares/authGuard.middleware';
import {
  createSchedulingSchema,
  deleteSchedulingSchema,
  schedulingIdSchema,
  schedulingQuerySchema
} from '../schemas/scheduling.schema';
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
  authGuard(),
  validateReq(deleteSchedulingSchema, 'params'),
  SchedulingController.deleteById
);
schedulingRouter.get(
  '/',
  authGuard(),
  validateReq(schedulingQuerySchema, 'query'),
  SchedulingController.get
);
schedulingRouter.get(
  '/:schedulingId',
  authGuard(),
  validateReq(schedulingIdSchema, 'params'),
  SchedulingController.getOne
);
schedulingRouter.patch(
  '/:schedulingId/accept',
  authGuard('PROFESSIONAL'),
  validateReq(schedulingIdSchema, 'params'),
  SchedulingController.acceptById
);
schedulingRouter.patch(
  '/:schedulingId/refuse',
  authGuard('PROFESSIONAL'),
  validateReq(schedulingIdSchema, 'params'),
  SchedulingController.refuseById
);


export default schedulingRouter;
