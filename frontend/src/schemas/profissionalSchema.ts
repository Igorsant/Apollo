import * as Yup from 'yup';
import { baseUserSchema } from './clienteSchema';

export const profissionalSchema = Yup.object().shape({
  ...baseUserSchema,
  aboutMe: Yup.string().min(0).max(500, 'Tamanho máximo de 500 caracteres'),
  services: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().min(3).max(50).required(),
      startingPrice: Yup.number().positive().required(),
      estimatedTime: Yup.number().integer().positive().required()
    })
  ),
  workHours: Yup.array()
    .min(0)
    .of(
      Yup.object().shape({
        weekday: Yup.number().integer().min(0).max(6).required(),
        startTime: Yup.string()
          .matches(/^\d{1,2}:\d{2}$/)
          .required(),
        endTime: Yup.string()
          .matches(/^\d{1,2}:\d{2}$/)
          .required()
      })
    ),
  workplace: Yup.object().shape({
    city: Yup.string().max(120).required('Campo obrigatório'),
    street: Yup.string().max(200, 'Tamanho máximo de 200 caracteres').required('Campo obrigatório'),
    streetNumber: Yup.string()
      .max(16, 'Tamanho máximo de 16 caracteres')
      .required('Campo obrigatório'),
    complement: Yup.string().max(256),
    phones: Yup.array()
      .min(1)
      .max(2)
      .of(
        Yup.object().shape({
          phone: Yup.string()
            .matches(/^[0-9]{10,11}$/, 'Formato inválido')
            .required('Campo obrigatório'),
          isPhoneWhatsapp: Yup.bool().required('Campo obrigatório')
        })
      )
      .required()
  })
});
