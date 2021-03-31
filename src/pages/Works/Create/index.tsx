import React from 'react'
import AppBar  from '../../../components/AppBar'
import ConfirmButton  from '../../../components/FloattingButton/Confirm'

import { Container } from './styles'

const Create: React.FC = () => {
  return (
    <Container>
      <AppBar />

      <h1>Create</h1>

      <div className='floatting-buttons'>
        <ConfirmButton />
      </div>
    </Container>
  )
}

export default Create