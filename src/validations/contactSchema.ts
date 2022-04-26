import * as yup from 'yup'

export const contactSchema = yup.object().shape({
  contact_type: yup.string()
    .required('Campo Obrigatório'),

  contact: yup.string()
    .when('contact_type', {
      is: 'email',
      then: yup.string()
        .email('E-mail inválido')
        .required('Campo Obrigatório'),
      otherwise: yup.string()
        .required('Campo Obrigatório'),
    }),
})