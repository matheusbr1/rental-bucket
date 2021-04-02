import React from 'react'

import DateFnsUtils from '@date-io/date-fns'

import { 
  MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardDatePickerProps 
} from '@material-ui/pickers'

import { Container } from './styles'

const DateInput: React.FC<KeyboardDatePickerProps> = ({ ...rest }) => {
  return (
    <Container>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk  
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          inputVariant="outlined"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          style={{ 
            margin: 0
          }}
          {...rest}
        />
      </MuiPickersUtilsProvider>
    </Container>
  )
}

export default DateInput