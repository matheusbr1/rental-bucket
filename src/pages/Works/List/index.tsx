import React, { useCallback } from 'react'
import AppBar  from 'components/AppBar'
import Table from '../components/Table'
import FloatingButton from 'components/FloatingButton'

import { Container, Content } from './styles'
import { useHistory } from 'react-router'
import { useData } from 'hooks/data'

const List: React.FC = () => {

  const history = useHistory()

  const { works } = useData()

  const handleCreate = useCallback(() => {
      history.push('new-work')
  }, [history])

  return (
    <Container>
      <AppBar />
      <Content>
        <Table 
          title='Serviços'
          works={works}
        />
        
        <div className='floating-buttons' >
          <FloatingButton onClick={handleCreate} />
        </div>

      </Content>
    </Container>
  )
}

export default List