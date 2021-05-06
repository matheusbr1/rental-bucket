import React, { useCallback } from 'react'
import AppBar  from 'components/AppBar'
import FloatingButton from 'components/FloatingButton'

import Table from '../components/Table/List'

import { Container, Content } from './styles'
import { useHistory } from 'react-router'

import Button from '@material-ui/core/Button'
import { useData } from 'hooks/data'

const List: React.FC = () => {

  const { clients } = useData()

  const history = useHistory()

  const handleCreate = useCallback(() => {
    history.push('new-client')
  }, [history])

  const handleNatigateToServices = useCallback(() => {
    history.push('services')
  }, [history])

  return (
    <Container>
      <AppBar />
      
      <Content>
        <Table title='Clientes' clients={clients} />
        
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