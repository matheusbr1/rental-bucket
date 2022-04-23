import * as yup from 'yup'

export const reportsSchema = yup.object().shape({
  type: yup.string().required('Campo Obrigatório'),
  initialDate: yup.date()
    .required('Campo Obrigatório')
    .typeError('Campo Obrigatório'),
  finalDate: yup.date()
    .required('Campo Obrigatório')
    .typeError('Campo Obrigatório'),
  customer: yup.string(),
  truck: yup.string(),
  equipments: yup.string(),
  drivers: yup.string()
})