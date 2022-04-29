import express from 'express';

import authGuard from '../middlewares/authGuard.middleware';
import optionalAuth from '../middlewares/optionalAuth.middleware';
import ReviewController from '../controllers/ReviewController';
import {
  createReviewSchema,
  searchReviewSchema
} from '../schemas/review.schema';
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
  ReviewController.update
)
reviewRouter.delete(
  '/:reviewId',
  authGuard('CUSTOMER'),
  ReviewController.delete
)

export default reviewRouter;
