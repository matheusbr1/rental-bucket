import React, { useEffect, useRef } from 'react'

import { OutlinedTextFieldProps } from  '@material-ui/core'

import { Container } from './styles'

import { useField } from '@unform/core'

interface Props extends OutlinedTextFieldProps {
  style?: React.CSSProperties
}

const TextField: React.FC<Props> = ({ style, name = '', ...rest }) => {

  const inputRef = useRef(null)

  const { fieldName, registerField, error } = useField(name)
  
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <Container
      ref={inputRef}
      error={Boolean(error)}
      helperText={error}
      name={name}
      style={{
        margin:'10px 0',
        ...style
      }}
      {...rest}
    />
  )
}

export default TextField