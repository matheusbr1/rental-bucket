import React from 'react'
import { ButtonProps, CircularProgress } from '@material-ui/core'

import { Container } from './styles'

interface Props extends ButtonProps {
  loading?: boolean
}

const Button: React.FC<Props> = ({ loading, children, ...rest }) => {
  return (
    <Container 
      variant="contained" 
      style={{
        width: '100%',
        height: 50,
        borderRadius: 15,
        background: '#529A67',
        color: '#FFFFFF'
      }}
      {...rest}
    >
      { loading ? <CircularProgress variant='indeterminate' size={30}/> : children }
    </Container>
  )
}

export default Button