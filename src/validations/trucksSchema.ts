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
  
  truck_type: yup.object()
    .nullable()
    .required('Campo obrigatório'),
  
  renavam: yup.string()
    .required('Campo obrigatório'),
  
  manufacture_year: yup.string()
    .required('Campo obrigatório'),
  
  model_year: yup.string()
    .required('Campo obrigatório'),
})