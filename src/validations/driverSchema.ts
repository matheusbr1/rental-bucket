import * as yup from 'yup'

export const driverSchema = yup.object().shape({
  CPF: yup.string().required('Campo obrigatório'),
  RG: yup.string().required('Campo obrigatório'),
  name: yup.string().required('Campo obrigatório'),
  CNH: yup.string().required('Campo obrigatório'),
  birthday: yup.date()
    .required('Campo obrigatório')
    .typeError('Campo obrigatório'),
  adress: yup.object({
    CEP: yup.string().required('Campo obrigatório'),
    street: yup.string().required('Campo obrigatório'),
    number: yup.string().required('Campo obrigatório'),
    state: yup.string().required('Campo obrigatório'),
    city: yup.string().required('Campo obrigatório'),
    neighborhood: yup.string().required('Campo obrigatório'),
  }),
  contact: yup.object({
    telephone: yup.string().required('Campo obrigatório'),
    cellphone: yup.string().required('Campo obrigatório'),
    email: yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório'),
  })
})