import React from 'react'
import { DatePicker, DatePickerProps } from 'formik-mui-lab';
import ptBRLocale from 'date-fns/locale/pt-BR'
import { Field } from 'formik'
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';

const FormikDateInput: React.FC<Partial<DatePickerProps> & any> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBRLocale} >
      <Field
        component={DatePicker}
        fullwidth
        autoOk
        id={props.name}
        placeholder="DD/MM/AAAA"
        format="dd/MM/yyyy"
        invalidDateMessage="Formato inválido"
        getOptionLabel={(option: string) => option}
        renderInput={(params: any) => (
          <TextField style={{ width: '100%' }} {...params} label={props.label} />
        )}
        {...props}
      />
    </LocalizationProvider>
  )
}

export default FormikDateInput
