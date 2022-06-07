import * as Yup from 'yup';

export const baseUserSchema = {
  cpf: Yup.string()
    .required('Campo obrigatório')
    .matches(/^[0-9]{11}$/, 'Formato Inválido'),
  email: Yup.string().email('Formato inválido').required('Campo obrigatório'),
  fullName: Yup.string()
    .min(2, 'Deve ter no mínimo 2 caracteres')
    .max(128, 'Deve ter no máximo 128 caracteres')
    .matches(/^[\p{L}'-]+( [\p{L}'-]+)*$/u, 'Formato Inválido')
    .required('Campo obrigatório'),
  nickname: Yup.string()
    .matches(/^[a-z0-9]+$/i, 'Não deve incluir caracteres especiais')
    .min(2, 'Deve ter no mínimo 2 caracteres')
    .max(64, 'Deve ter no máximo 64 caracteres')
    .required('Campo obrigatório'),
  password: Yup.string()
    .min(8, 'Deve ter no mínimo 8 caracteres')
    .max(72, 'Deve ter no máximo 72 caracteres')
    .matches(/^[a-zA-Z0-9!@#$%¨&*(),.<>;:?\]}[{çÇ'"_=+-]{8,72}$/, 'Formato inválido')
    .required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
    .required('Campo obrigatório'),
  phone: Yup.string()
    .matches(/^[0-9]{10,11}$/, 'Formato inválido')
    .required('Campo obrigatório'),

  pictureBase64: Yup.string()
};

export const clienteSchema = Yup.object().shape(baseUserSchema);
