import React from 'react'
import { ButtonProps } from '@material-ui/core'

import { Container } from './styles'

const Button: React.FC<ButtonProps> = ({ ...rest }) => {
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
    />
  )
}

export default Button