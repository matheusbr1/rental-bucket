import React from 'react';
import { Field, FieldAttributes } from 'formik'
import { TextField } from '@material-ui/core'
import { Autocomplete, AutocompleteRenderInputParams, AutocompleteProps } from 'formik-mui'

interface AutoCompleteProps extends Partial<AutocompleteProps<any, false, false, false>> {
  label: string
  error: string | undefined
  touched: boolean | undefined
}

const FormikAutoComplete: React.FC<FieldAttributes<AutoCompleteProps>> = ({ 
  error,
  touched,
  label,
  ...props 
}) => {
  return (
    <Field
      id={props.name}
      noOptionsText='Nenhum resultado'
      component={Autocomplete}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={!!error && !!touched}
          helperText={touched && error}
          label={label}
          variant="outlined"
        />
      )}
      {...props}
    />
  )
}

export default FormikAutoComplete;