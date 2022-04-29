import express from 'express';

import authGuard from '../middlewares/authGuard.middleware';
import {
  createReviewSchema,
  findReviewSchema,
  searchReviewSchema
} from '../schemas/review.schema';
import optionalAuth from '../middlewares/optionalAuth.middleware';
import ReviewController from '../controllers/ReviewController';
import validateReq from '../middlewares/validateRequest.middleware';

const reviewRouter = express.Router();

reviewRouter.get(
  '/',
  optionalAuth,
  validateReq(searchReviewSchema, 'query'),
  ReviewController.get
);
reviewRouter.post(
  '/',
  authGuard('CUSTOMER'),
  validateReq(createReviewSchema, 'body'),
  ReviewController.create
);
reviewRouter.put(
  '/:reviewId',
  authGuard('CUSTOMER'),
  validateReq(createReviewSchema, 'body'),
  validateReq(findReviewSchema, 'params'),
  ReviewController.update
);
reviewRouter.delete(
  '/:reviewId',
  authGuard('CUSTOMER'),
  validateReq(findReviewSchema, 'params'),
  ReviewController.delete
);

export default reviewRouter;
