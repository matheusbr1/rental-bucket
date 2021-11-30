import React, { useCallback } from 'react'
import AppBar  from 'components/AppBar'
import Table from 'components/Table/Works'
import FloatingButton from 'components/FloatingButton'
import { useHistory } from 'react-router'
import { useData } from 'hooks/useData'

import { Container, Content } from './styles'

const List: React.FC = () => {

  const history = useHistory()

  const { appData } = useData()

  const { works } = appData

  const handleCreate = useCallback(() => {
      history.push('works/create')
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