import Joi from 'joi';

const reviewSchema = Joi.object({
  professionalId: Joi.number().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string()
});

export default reviewSchema;
