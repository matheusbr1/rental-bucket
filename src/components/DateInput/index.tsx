import React, { useEffect, useRef } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { styled } from '@material-ui/core'
import { useField } from '@unform/core'
import { 
  MuiPickersUtilsProvider, 
  KeyboardDatePicker, 
  KeyboardDatePickerProps 
} from '@material-ui/pickers'

const Container = styled('div')(({ theme }) => ({
  margin: '10px 0px',
  '& .MuiOutlinedInput-root': {
    borderRadius: 10
  }
}))

interface DateInputProps extends KeyboardDatePickerProps {
  name: string
}

const DateInput: React.FC<DateInputProps> = ({ name, ...rest }) => {

  const inputRef = useRef(null)

  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk  
          disableToolbar
          inputProps={{ ref: inputRef }}
          error={Boolean(error)}
          helperText={error}
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          inputVariant="outlined"
          style={{ margin: 0 }}
          {...rest}
        />
      </MuiPickersUtilsProvider>
    </Container>
  )
}

export default DateInput