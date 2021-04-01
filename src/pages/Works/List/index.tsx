import React, { useCallback } from 'react'
import AppBar  from '../../../components/AppBar'
import Table from '../../../components/Table'
import FloatingButton from '../../../components/FloatingButton'

import { Container } from './styles'
import { useHistory } from 'react-router'

const List: React.FC = () => {

  const history = useHistory()

  const handleCreate = useCallback(() => {
      history.push('create-work')
  }, [history])

  return (
    <Container>
      <AppBar />

      <Table />
      
      <div className='floating-buttons' >
        <FloatingButton onClick={handleCreate} />
      </div>
    </Container>
  )
}

export default List