import Joi from 'joi';

export const createSchedulingSchema = Joi.object({
  professionalId: Joi.number().integer().required(),
  datetime: Joi.date().required(),
  serviceIds: Joi.array().items(Joi.number().integer().required())
});

const schedulingSchema = Joi.object({});

export default schedulingSchema;
