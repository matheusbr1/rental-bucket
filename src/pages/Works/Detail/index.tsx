import React from 'react'
import AppBar  from '../../../components/AppBar'
import FloatingButton from '../../../components/FloatingButton'

import { Container, Content } from './styles'
import TextField from '../../../components/TextField'
import { useHistory } from 'react-router'

const Detail: React.FC = () => {

  const { goBack } = useHistory()

  return (
    <Container>
      <AppBar search={false} />

      <Content>

        <h1>Serviço #1</h1>

        <form>
          <TextField 
            name='client' 
            label='Cliente'
            variant="outlined" 
          />

          <TextField 
            name='adress' 
            label='Endereço'
            variant="outlined" 
          />

          <TextField 
            name='driver' 
            label='Motorista'
            variant="outlined" 
          />

          <TextField 
            name='truck' 
            label='Caminhão'
            variant="outlined" 
          />

          <TextField 
            name='service' 
            label='Serviço'
            variant="outlined" 
          />

          <TextField 
            size='medium'
            name='quantity' 
            label='Quantidade'
            variant="outlined" 
          />

          <TextField 
            name='expiration' 
            label='Data da retirada'
            variant="outlined" 
          />

          <div className='floating-buttons'>
            <FloatingButton variant='edit' onClick={() => {}} />
            <FloatingButton variant='delete' onClick={() => {}} />
          </div>
        </form>
      </Content>

      <div className='floating-buttons left'>
        <FloatingButton variant='return' onClick={goBack} />
      </div>
    </Container>
  )
}

export default Detail