import express from 'express';

import authGuard from '../middlewares/authGuard.middleware';
import {
  createSchedulingSchema,
  // findSchedulingSchema,
  // searchSchedulingSchema
} from '../schemas/scheduling.schema';
import optionalAuth from '../middlewares/optionalAuth.middleware';
import SchedulingController from '../controllers/SchedulingController';
import validateReq from '../middlewares/validateRequest.middleware';

const schedulingRouter = express.Router();

schedulingRouter.post(
  '/',
  // authGuard('CUSTOMER'),
  validateReq(createSchedulingSchema, 'body'),
  SchedulingController.create
);
// schedulingRouter.get(
//   '/',
//   optionalAuth,
//   validateReq(searchSchedulingSchema, 'query'),
//   SchedulingController.get
// );
// schedulingRouter.put(
//   '/:schedulingId',
//   authGuard('CUSTOMER'),
//   validateReq(createSchedulingSchema, 'body'),
//   validateReq(findSchedulingSchema, 'params'),
//   SchedulingController.update
// );
// schedulingRouter.delete(
//   '/:schedulingId',
//   authGuard('CUSTOMER'),
//   validateReq(findSchedulingSchema, 'params'),
//   SchedulingController.delete
// );

export default schedulingRouter;
