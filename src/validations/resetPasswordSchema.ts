import * as yup from 'yup'

export const resetPasswordSchema =  yup.object().shape({
  password: yup.string().required('Campo obrigatório'),
})