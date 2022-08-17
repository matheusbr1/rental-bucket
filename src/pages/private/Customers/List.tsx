import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from 'components/Table/Customers'
import { ICustomer, IDefaultRootState } from 'interfaces'
import { setCustomers } from 'store/customer/customer.actions'
import usePrivateApi from 'hooks/usePrivateApi'
import { TableContainer } from 'components/layout/TableContainer'

const List: React.FC = () => {
  const api = usePrivateApi()
  
  const dispatch  = useDispatch()

  useEffect(() => {
    api.get('customers')
      .then(response => {
        dispatch(setCustomers(response.data))
      })
  }, [api, dispatch])

  const customers = useSelector<IDefaultRootState, ICustomer[]>(state => state.customers.all)

  return (
    <TableContainer floatingButtonRoute='customers/create' >
      <Table customers={customers} />
    </TableContainer>
  )
}

export default List