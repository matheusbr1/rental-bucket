import React, { useCallback } from 'react'
import AppBar  from '../../../components/AppBar'
import Table from './Table'
import FloatingButton from '../../../components/FloatingButton'

import { Container, Content } from './styles'
import { useHistory } from 'react-router'

import Button from '@material-ui/core/Button';

const List: React.FC = () => {

  const history = useHistory()

  const handleCreate = useCallback(() => {
    history.push('new-driver')
  }, [history])

  const handleNatigateToServices = useCallback(() => {
    history.push('services')
  }, [history])

  return (
    <Container>
      <AppBar />
      
      <Content>
        <Table title='Motoristas' />
        
        <div className='floating-buttons' >
          <Button 
          
          onClick={handleNatigateToServices}

          style={{
            height: 50,
            borderRadius: 10,
            padding: 20
          }}>
            Retornar para Serviços
          </Button>
          
          <FloatingButton onClick={handleCreate} />
        </div>

      </Content>
    </Container>
  )
}

export default List