import React, { useEffect, useRef } from 'react'
import { OutlinedTextFieldProps } from  '@material-ui/core'
import { useField } from '@unform/core'

import { Container } from './styles'

interface Props extends OutlinedTextFieldProps {
  style?: React.CSSProperties
  name: string
  inputComponent?: React.ReactNode
}

const TextField: React.FC<Props> = ({ style, name, ...rest }) => {

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
    <Container
      inputRef={inputRef}
      error={Boolean(error)}
      helperText={error}
      style={{
        margin:'10px 0',
        ...style
      }}
      {...rest}
    />
  )
}

export default TextField