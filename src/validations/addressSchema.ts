import * as yup from 'yup'

export const addressSchema = yup.object().shape({
  CEP: yup.string()
    .required('Campo obrigatório'),
  street: yup.string()
    .required('Campo obrigatório'),
  number: yup.string()
    .required('Campo obrigatório'),
  neighborhood: yup.string()
    .required('Campo obrigatório'),
  state: yup.object()
    .required('Campo obrigatório')
    .typeError('Campo obrigatório'),
  city: yup.object()
    .required('Campo obrigatório')
    .typeError('Campo obrigatório'),
})