import React from 'react'
import AppBar  from 'components/AppBar'
import Table from 'components/Table/Works'
import FloatingButton from 'components/FloatingButton'
import { useHistory } from 'react-router'
import { useData } from 'hooks/useData'
import { Container, Box } from '@material-ui/core'

const List: React.FC = () => {

  const history = useHistory()

  const { appData } = useData()

  const { works } = appData

  return (
    <Container style={{ marginTop: 64 }} >
      <AppBar />
      
      <Box width='100%' m='20px 0' display='flex' justifyContent='center'>
        <Table  title='Serviços' works={works} />
        <FloatingButton onClick={() => history.push('works/create')} />
      </Box>
    </Container>
  )
}

export default List