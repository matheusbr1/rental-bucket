import React from 'react'
import AppBar  from 'components/AppBar'
import FloatingButton from 'components/FloatingButton'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import Table from 'components/Table/Customers'
import { Box, Container } from '@material-ui/core'
import { ICustomer, IDefaultRootState } from 'interfaces'

const List: React.FC = () => {
  const customers = useSelector<IDefaultRootState, ICustomer[]>(state => state.customer.customers)
  
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