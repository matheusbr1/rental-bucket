import React, { useCallback } from 'react'
import AppBar  from '../../../components/AppBar'
import Table from '../../../components/Table'
import AddButton from '../../../components/FloattingButton/Add'

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
      
      <div className='floatting-buttons' >
        <AddButton onClick={handleCreate} />
      </div>
    </Container>
  )
}

export default List