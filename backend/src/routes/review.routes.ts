import express from 'express';

import ReviewController from '../controllers/ReviewController';
import reviewSchema from '../schemas/review.schema';
import validateReq from '../middlewares/validateRequest.middleware';

const reviewRouter = express.Router();

reviewRouter.get('/', validateReq(reviewSchema, 'body'), ReviewController.get);
reviewRouter.post(
  '/',
  validateReq(reviewSchema, 'body'),
  ReviewController.create
);

export default reviewRouter;
