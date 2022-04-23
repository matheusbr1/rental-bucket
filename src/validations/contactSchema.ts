import * as yup from 'yup'

export const contactSchema = yup.object().shape({
  type: yup.string(),

  email: yup.string()
    .when('type', {
      is: 'email',
      then: yup.string()
        .email('E-mail inválido')
        .required('Campo Obrigatório')
    }),
  
  telephone: yup.string()
    .when('type', {
      is: 'telephone',
      then: yup.string()
        .required('Campo Obrigatório')
    }),
  
  cellphone: yup.string()
    .when('type', {
      is: 'cellphone',
      then: yup.string()
        .required('Campo Obrigatório')
    }),
})