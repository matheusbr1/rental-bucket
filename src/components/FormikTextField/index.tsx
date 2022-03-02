import React from 'react'
import { TextField, TextFieldProps } from 'formik-mui'

const FormikTextField: React.FC<TextFieldProps> = ({ ...rest }) => {
  return (
    <TextField variant='outlined' {...rest} />
  )
}

export default FormikTextField
