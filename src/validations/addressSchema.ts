import * as yup from 'yup'

export const addressSchema = yup.object().shape({
  CEP: yup.string().required('Campo obrigatório'),
  street: yup.string().required('Campo obrigatório'),
  number: yup.string().required('Campo obrigatório'),
  neighborhood: yup.string().required('Campo obrigatório'),
  state: yup.string().required('Campo obrigatório'),
  city: yup.string().required('Campo obrigatório'),
})