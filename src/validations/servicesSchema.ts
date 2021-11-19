import * as yup from 'yup'

export const servicesSchema = yup.object().shape({
  adress: yup.string().required('Campo obrigatório'),
  client: yup.string().required('Campo obrigatório'),
  driver: yup.string().required('Campo obrigatório'),
  equipment: yup.string().required('Campo obrigatório'),
  service: yup.string().required('Campo obrigatório'),
  truck: yup.string().required('Campo obrigatório'),
  quantity: yup.number()
    .required('Campo obrigatório')
    .typeError('Campo obrigatório')
    .min(1, 'No mínimo 1 quantidade')
    .max(300, 'No máximo 300 quantidades'),
  endDate: yup.date()
    .required('Campo obrigatório')
    .typeError('Campo obrigatório')
})