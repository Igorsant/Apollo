import Joi from 'joi';

export const createSchedulingSchema = Joi.object({
  professionalId: Joi.number().integer().required(),
  startTime: Joi.date().iso().required(),
  serviceIds: Joi.array()
    .items(Joi.number().integer())
    .min(1)
    .unique()
    .required()
});

export const deleteSchedulingSchema = Joi.object({
  schedulingId: Joi.number().integer().required()
});

const schedulingSchema = Joi.object({});

export default schedulingSchema;
