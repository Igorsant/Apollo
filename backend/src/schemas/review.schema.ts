import Joi from 'joi';

export const createReviewSchema = Joi.object({
  professionalId: Joi.number().integer().min(0).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string()
});

export const searchReviewSchema = Joi.object({
  professionalId: Joi.number().integer().min(0).required(),
  rating: Joi.number().integer().min(1).max(5),
  comment: Joi.string()
});

export const findReviewSchema = Joi.object({
  reviewId: Joi.number().positive().required()
});
