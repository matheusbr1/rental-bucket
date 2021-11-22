import React from 'react'
import { Typography } from '@material-ui/core'

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
        <Typography variant='h4' {...rest} >
          { text }
        </Typography>
      )}

      {size === 'medium' && (
        <Typography variant='h3' {...rest}>
          { text }
        </Typography>
      )}

      {size === 'large' && (
        <Typography variant='h1' {...rest}>
          { text }
        </Typography>
      )}

      { Boolean(error) && <Error> ( { error } )</Error> }
    </Container>
  )
}

export default Title