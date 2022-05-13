import Joi from 'joi';

import { baseCustomerSchema } from './customer.schema';

const professionalBaseSchema = {
  ...baseCustomerSchema,
  aboutMe: Joi.string().min(0).max(500),
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
    city: Joi.string().max(128).required(),
    street: Joi.string().max(200).required(),
    streetNumber: Joi.string().max(16).required(),
    complement: Joi.string().max(256),
    phones: Joi.array()
      .min(1)
      .max(2)
      .items(
        Joi.object({
          phone: Joi.string()
            .pattern(new RegExp(/^[0-9]{10,11}$/))
            .required(),

          isPhoneWhatsapp: Joi.bool().required()
        })
      )
      .required()
  })
};

export const professionalSchema = Joi.object(professionalBaseSchema);

export const professionalUpdateSchema = Joi.object({
  ...professionalBaseSchema,
  services: Joi.array().items(
    Joi.object({
      id: Joi.number().positive(),
      name: Joi.string().min(3).max(50).required(),
      startingPrice: Joi.number().positive().required(),
      estimatedTime: Joi.number().integer().positive().required()
    })
  ),

  workHours: Joi.array().items(
    Joi.object({
      id: Joi.number().positive(),
      weekday: Joi.number().integer().min(0).max(6).required(),
      startTime: Joi.string()
        .pattern(new RegExp(/^\d{1,2}:\d{2}$/))
        .required(),

      endTime: Joi.string()
        .pattern(new RegExp(/^\d{1,2}:\d{2}$/))
        .required()
    })
  )
});

export const professionalIdSchema = Joi.object({
  professionalId: Joi.number().positive().required()
});
