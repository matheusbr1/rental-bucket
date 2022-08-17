import React from 'react';
import { Container } from '@material-ui/core'
import { AppBar } from 'components/AppBar'

const FormContainer: React.FC = ({ children }) => {
  return (
    <Container maxWidth='md' style={{ marginTop: 100 }} >
      <AppBar />
      
      {children}
    </Container>
  )
}

export { FormContainer }