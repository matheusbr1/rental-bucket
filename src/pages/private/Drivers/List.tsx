import React, { useEffect } from 'react'
import Table from 'components/Table/Drivers'
import { useSelector, useDispatch } from 'react-redux'
import { IDefaultRootState, IDriver } from 'interfaces'
import { setDrivers } from 'store/driver/driver.actions'
import usePrivateApi from 'hooks/usePrivateApi'
import { TableContainer } from 'components/layout/TableContainer'
import { useCompany } from 'hooks/useCompany'

const List: React.FC = () => {
  const api = usePrivateApi()

  const { company } = useCompany()

  const dispatch = useDispatch()

  useEffect(() => {
    api.get('/drivers', {
      params: {
        company_id: company?.id
      }
    }).then(response => dispatch(setDrivers(response.data)))
  }, [api, company?.id, dispatch])

  const drivers = useSelector<IDefaultRootState, IDriver[]>(state => state.drivers.all)

  return (
    <TableContainer floatingButtonRoute='drivers/create' >
      <Table title='Motoristas' drivers={drivers} />
    </TableContainer>
  )
}

export default List