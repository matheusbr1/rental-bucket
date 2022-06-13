import * as yup from 'yup'

export const worksSchema = yup.object().shape({
  address: yup.object()
    .nullable()
    .required('Campo obrigatório'),
  customer: yup.object()
    .nullable()
    .required('Campo obrigatório'),
  driver: yup.object()
    .nullable()
    .required('Campo obrigatório'),
  equipment: yup.object()
    .nullable()
    .required('Campo obrigatório'),
  work_type: yup.object()
    .nullable()
    .required('Campo obrigatório'),
  truck: yup.object()
    .nullable()
    .required('Campo obrigatório'),
  quantity: yup.number()
    .required('Campo obrigatório')
    .typeError('Campo obrigatório')
    .min(1, 'No mínimo 1 quantidade')
    .max(300, 'No máximo 300 quantidades'),
  end_date: yup.date()
    .required('Campo obrigatório')
    .typeError('Campo obrigatório')
})