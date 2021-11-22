import React, { useCallback } from 'react'
import AppBar  from 'components/AppBar'
import FloatingButton from 'components/FloatingButton'
import { useHistory } from 'react-router'
import Button from '@material-ui/core/Button'
import { useData } from 'hooks/useData'

import Table from '../components/Table/List'
import { Container, Content } from './styles'

const List: React.FC = () => {

  const { customers } = useData()

  const history = useHistory()

  const handleCreate = useCallback(() => {
    history.push('customers/create')
  }, [history])

  const handleNatigateToWorks = useCallback(() => {
    history.push('works')
  }, [history])

  return (
    <Container>
      <AppBar />
      
      <Content>
        <Table title='Clientes' customers={customers} />
        
        <div className='floating-buttons' >
          <Button 
          
          onClick={handleNatigateToWorks}

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