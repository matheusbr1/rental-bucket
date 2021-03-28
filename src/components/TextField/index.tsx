import React from 'react'

import { OutlinedTextFieldProps } from  '@material-ui/core'

import { Container } from './styles'

interface Props extends OutlinedTextFieldProps {
  style?: React.CSSProperties
}

const TextField: React.FC<Props> = ({ style, ...rest }) => {
  return (
    <Container
      error
      helperText="Incorrect entry."
      style={{
        margin:'10px 0',
        ...style
      }}
      {...rest}
    />
  )
}

export default TextField