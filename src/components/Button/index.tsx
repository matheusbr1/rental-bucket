import React from 'react'
import { Button as MuiButton, styled, ButtonProps, CircularProgress } from '@material-ui/core'

interface Props extends ButtonProps {
  loading?: boolean
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  width: '100%',
  height: 55,
  color: theme.palette.common.white,
  fontSize: '1rem',
  '& .MuiCircularProgress-colorPrimary': {
    color: theme.palette.common.white
  }
}))

const Button: React.FC<Props> = ({ loading, children, ...rest }) => {
  return (
    <StyledButton variant="contained" {...rest} >
      { loading ? <CircularProgress variant='indeterminate' size={30}/> : children }
    </StyledButton>
  )
}

export default Button