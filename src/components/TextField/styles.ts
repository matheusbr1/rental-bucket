import styled from 'styled-components'

import TextField from '@material-ui/core/TextField';

export const Container = styled(TextField)`
  .MuiOutlinedInput-root  {
    border-radius: 10px;
  }

  .MuiOutlinedInput-root.Mui-focused fieldset{
    border-color: #529A67;
  }

  .MuiFormLabel-root.Mui-focused {
    color: #529A67;
  }
`