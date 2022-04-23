import Joi from 'joi';

const searchSchema = Joi.object({
  city: Joi.string().required(),
  query: Joi.string()
});

export default searchSchema;
