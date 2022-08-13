import React from 'react'
import { TextField, TextFieldProps } from 'formik-mui'
import { Mask, handleApplyMaskOnChange } from './helpers/applyMask'

interface IFormikTextFieldProps extends TextFieldProps {
  mask?: Mask
}

const FormikTextField: React.FC<IFormikTextFieldProps> = ({ mask, ...rest }) => {
  return (
    <TextField 
      variant='outlined' 
      fullWidth 
      {...rest} 
      inputProps={{
        onChange: 
          (e: React.KeyboardEvent<HTMLInputElement>) => 
            handleApplyMaskOnChange(e, mask),
        inputMode: mask ? 'numeric' : rest.inputMode,
        ...rest.inputProps
      }}
    />
  )
}

export default FormikTextField
