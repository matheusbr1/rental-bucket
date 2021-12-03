import React from 'react'
import AppBar  from 'components/AppBar'
import FloatingButton from 'components/FloatingButton'
import { useHistory } from 'react-router'
import { useData } from 'hooks/useData'
import Table from 'components/Table/Customers'
import { Box, Container } from '@material-ui/core'

const List: React.FC = () => {
  const { appData } = useData()

  const { customers } = appData
  
  const history = useHistory()

  return (
    <Container style={{ marginTop: 64 }} >
      <AppBar />
      
      <Box width='100%' m='20px 0' display='flex' justifyContent='center'>
        <Table title='Clientes' customers={customers} />
        
        <FloatingButton onClick={() => history.push('customers/create')} />
      </Box>
    </Container>
  )
}

export default List