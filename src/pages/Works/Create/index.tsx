import React from 'react'
import { useHistory } from 'react-router'
import AppBar  from '../../../components/AppBar'
import FloatingButton from '../../../components/FloatingButton'

import TextField from '../../../components/TextField'

import { Container, Content } from './styles'

const Create: React.FC = () => {

  const { goBack } = useHistory()

  return (
    <Container>
      <AppBar search={false} />
      
      <Content>

        <h1>Novo Serviço</h1>

        <form>
          <TextField 
            name='client' 
            label='Cliente'
            variant="outlined" 
            
            helperText="Incorrect entry."
            error
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

          <TextField 
            name='client' 
            label='Cliente'
            variant="outlined" 
            
            helperText="Incorrect entry."
            error
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
            <FloatingButton variant='confirm' onClick={goBack} />
          </div>
        </form>
      </Content>
      
    </Container>
  )
}

export default Create