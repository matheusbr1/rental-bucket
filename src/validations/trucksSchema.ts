import * as yup from 'yup'

export const trucksSchema = yup.object().shape({
  brand: yup.object()
    .nullable()
    .required('Campo obrigatório'),
  
  model: yup.object()
    .nullable()
    .required('Campo obrigatório'),
  
  plate: yup.string()
    .required('Campo obrigatório'),
  
  type: yup.object()
    .nullable()
    .required('Campo obrigatório'),
  
  renavam: yup.string()
    .required('Campo obrigatório'),
  
  manufacture_year: yup.string()
    .nullable()
    .required('Campo obrigatório'),
  
  model_year: yup.string()
    .nullable()
    .required('Campo obrigatório'),
})