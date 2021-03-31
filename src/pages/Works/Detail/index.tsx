import React from 'react'
import AppBar  from '../../../components/AppBar'
import EditButton from '../../../components/FloattingButton/Edit'
import DeleteButton from '../../../components/FloattingButton/Delete'
import ReturnButton from '../../../components/FloattingButton/Return'

import { Container } from './styles'

const Detail: React.FC = () => {
  return (
    <Container>
      <AppBar />

      <h1>Detail</h1>


      <div className='floatting-buttons left'>
        <ReturnButton />
      </div>

      <div className='floatting-buttons'>
        <EditButton onClick={() => {}} />
        <DeleteButton onClick={() => {}} />
      </div>
    </Container>
  )
}

export default Detail