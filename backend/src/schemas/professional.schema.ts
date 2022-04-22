import Joi from 'joi';

import { baseCustomerSchema } from './customer.schema';

const professionalSchema = Joi.object({
  ...baseCustomerSchema,
  aboutMe: Joi.string().max(500),
  services: Joi.array().items(
    Joi.object({
      name: Joi.string().min(3).max(50).required(),
      startingPrice: Joi.number().positive().required(),
      estimatedTime: Joi.number().integer().positive().required()
    })
  ),

  workHours: Joi.array().items(
    Joi.object({
      weekday: Joi.number().integer().min(0).max(6).required(),
      startTime: Joi.string()
        .pattern(new RegExp(/^\d{1,2}:\d{2}$/))
        .required(),

      endTime: Joi.string()
        .pattern(new RegExp(/^\d{1,2}:\d{2}$/))
        .required()
    })
  ),

  workplace: Joi.object({
    street: Joi.string().max(200).required(),
    streetNumber: Joi.number().integer().positive().required(),
    complement: Joi.string().max(256),
    phone1: Joi.string()
      .pattern(new RegExp(/^[0-9]{10,11}$/))
      .required(),

    isPhone1Whatsapp: Joi.bool().required(),
    phone2: Joi.string().pattern(new RegExp(/^[0-9]{10,11}$/)),
    isPhone2Whatsapp: Joi.bool()
  })
});

export default professionalSchema;