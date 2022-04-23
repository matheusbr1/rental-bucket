import * as yup from 'yup'

export const trucksSchema =  yup.object().shape({
  brand: yup.object().required('Campo obrigatório'),
  model: yup.object().required('Campo obrigatório'),
  plate: yup.string().required('Campo obrigatório'),
  equipment: yup.string().required('Campo obrigatório'),
  renavam: yup.string().required('Campo obrigatório'),
  year: yup.object({
    manufacture: yup.string().required('Campo obrigatório'),
    model: yup.string().required('Campo obrigatório'),
  })
})