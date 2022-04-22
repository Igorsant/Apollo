import express from 'express';

import {
  createReviewSchema,
  searchReviewSchema
} from '../schemas/review.schema';
import ReviewController from '../controllers/ReviewController';
import validateReq from '../middlewares/validateRequest.middleware';

const reviewRouter = express.Router();

reviewRouter.get(
  '/',
  validateReq(searchReviewSchema, 'query'),
  ReviewController.get
);
reviewRouter.post(
  '/',
  validateReq(createReviewSchema, 'body'),
  ReviewController.create
);

export default reviewRouter;
