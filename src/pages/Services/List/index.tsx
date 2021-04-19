import React, { useCallback } from 'react'
import AppBar  from '../../../components/AppBar'
import Table from '../components/Table'
import FloatingButton from '../../../components/FloatingButton'

import { Container, Content } from './styles'
import { useHistory } from 'react-router'

const List: React.FC = () => {

  const history = useHistory()

  const handleCreate = useCallback(() => {
      history.push('new-service')
  }, [history])

  return (
    <Container>
      <AppBar />
      <Content>
        <Table title='Serviços' />
        
        <div className='floating-buttons' >
          <FloatingButton onClick={handleCreate} />
        </div>

      </Content>
    </Container>
  )
}

export default List