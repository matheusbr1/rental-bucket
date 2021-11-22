import React from 'react'

import { Container, Error } from './styles'

interface TitleProps {
  text: string
  error?: string | false
  size?: 'small' | 'medium' | 'large'
}

const Title: React.FC<TitleProps> = ({ text, error, size = 'medium', ...rest }) => {
  return (
    <Container isErrored={Boolean(error)} size={size} >

      {size === 'small' && (
        <h3 {...rest} > { text } </h3>
      )}

      {size === 'medium' && (
        <h2 {...rest} > { text } </h2>
      )}

      {size === 'large' && (
        <h1 {...rest} > { text } </h1>
      )}

      { Boolean(error) && <Error> ( { error } )</Error>}
    </Container>
  )
}

export default Title