import * as yup from 'yup'
import { cpf } from 'cpf-cnpj-validator'

export const driverSchema = yup.object().shape({
  CPF: yup
    .string()
    .required('Campo Obrigatório')
        .test(
          'isValid',
          'CPF inválido',
          (value) => cpf.isValid(value as string)
        ),
  
  RG: yup.string().required('Campo obrigatório'),
  
  name: yup.string().required('Campo obrigatório'),
  
  CNH: yup.string().required('Campo obrigatório'),
  
  birthday: yup.date()
    .nullable()
    .required('Campo obrigatório'),
  
  address: yup.object({
    CEP: yup.string()
      .required('Campo obrigatório'),
    street: yup.string()
      .required('Campo obrigatório'),
    number: yup.string()
      .required('Campo obrigatório'),
    state: yup.string()
      .required('Campo obrigatório'),
    city: yup.string()
      .required('Campo obrigatório'),
    neighborhood: yup.string()
      .required('Campo obrigatório'),
  })
})