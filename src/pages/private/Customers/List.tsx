import React, { useEffect } from 'react'
import { AppBar } from 'components/AppBar'
import FloatingButton from 'components/FloatingButton'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Table from 'components/Table/Customers'
import { Box, Container } from '@material-ui/core'
import { ICustomer, IDefaultRootState } from 'interfaces'
import { setCustomers } from 'store/customer/customer.actions'
import { EmptyTableMessage } from 'components/EmptyTableMessage'
import usePrivateApi from 'hooks/usePrivateApi'

const List: React.FC = () => {
  const api = usePrivateApi()
  
  const history = useHistory()
  
  const dispatch  = useDispatch()

  useEffect(() => {
    api.get('customers')
      .then(response => {
        dispatch(setCustomers(response.data))
      })
  }, [api, dispatch])

  const customers = useSelector<IDefaultRootState, ICustomer[]>(state => state.customers.all)

  return (
    <Container style={{ marginTop: 64 }} >
      <AppBar />
      
      <Box 
        width='100%' 
        m='20px 0' 
        minHeight='calc(100vh - 84px)' 
        display='flex' 
        justifyContent='center' 
        alignItems='center'
      >
        {customers.length ? (
          <Table customers={customers} />
        ) : (
          <EmptyTableMessage tableName='clientes' />
        )}

        <FloatingButton onClick={() => history.push('customers/create')} />
      </Box>
    </Container>
  )
}

export default List