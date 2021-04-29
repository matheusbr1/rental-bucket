import React, { useCallback, useEffect, useRef } from 'react'

import { OutlinedTextFieldProps } from  '@material-ui/core'

import { Container } from './styles'

import { useField } from '@unform/core'

import MaskedInput from 'react-text-mask';

interface Props extends OutlinedTextFieldProps {
  style?: React.CSSProperties
  name: string
  inputComponent?: React.ReactNode
  mask: 'cep' | 'cellphone' | 'telephone' | 'cpf'
}

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

const maskVariations = {
  cep: [
    /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/
  ],
  cellphone: [
    '(', /[1-9]/, /[1-9]/, ')', ' ', /[9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/
  ],
  telephone: [
    '(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/
  ],
  cpf: [
    /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/
  ],
}

const MaskedField: React.FC<Props> = ({ style, name, mask, ...rest }) => {

  const inputRef = useRef(null)
  const { fieldName, registerField, error } = useField(name)

  const TextMaskCustom = useCallback((props: TextMaskCustomProps) => {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref: any) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={maskVariations[mask]}
        placeholderChar={'\u2000'}
        showMask={true}
      />
    );
  }, [mask])
  
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
      InputProps={{
        inputComponent: TextMaskCustom as any,
      }}
      style={{
        margin:'10px 0',
        ...style
      }}
      {...rest}
    />
  )
}

export default MaskedField
