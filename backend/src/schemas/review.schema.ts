import Joi from 'joi';

export const createReviewSchema = Joi.object({
  professionalId: Joi.number().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string()
});

export const searchReviewSchema = Joi.object({
  professionalId: Joi.number().required(),
  rating: Joi.number().min(1).max(5),
  comment: Joi.string()
});
