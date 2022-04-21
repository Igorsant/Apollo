import Joi from 'joi';

export const baseCustomerSchema = {
  cpf: Joi.string()
    .length(11)
    .pattern(new RegExp(/^[0-9]{11}$/))
    .required(),

  email: Joi.string().email().required(),
  fullName: Joi.string()
    .min(2)
    .max(128)
    // \p{L}: caracteres unicode da categoria letra
    // Essa expressão aceita nomes simples (john, josé, carlos...)
    // e também nomes com espaços, apóstrofos ou hífens (João da silva, Daniel Day-Lewis, John's...)
    .pattern(new RegExp(/^[\p{L}'-]+( [\p{L}'-]+)*$/u))
    .required(),

  nickname: Joi.string().alphanum().min(2).max(64).required(),
  password: Joi.string()
    .min(8)
    .max(72)
    .pattern(new RegExp(/^[a-zA-Z0-9!@#$%¨&*(),.<>;:?\]}[{çÇ'"_=+-]{8,72}$/))
    .required(),

  phone: Joi.string()
    .pattern(new RegExp(/^[0-9]{10,11}$/))
    .required(),

  pictureBase64: Joi.string().base64()
};

const customerSchema = Joi.object(baseCustomerSchema);

export default customerSchema;
