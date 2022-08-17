import React, { useEffect } from 'react'
import Table from 'components/Table/Trucks'
import { useSelector, useDispatch } from 'react-redux'
import { IDefaultRootState, ITruck } from 'interfaces'
import usePrivateApi from 'hooks/usePrivateApi'
import { setTrucks } from 'store/truck/truck.actions'
import { TableContainer } from 'components/layout/TableContainer'

const List: React.FC = () => {
  const api = usePrivateApi()
  
  const dispatch = useDispatch()

  useEffect(() => {
    api.get('trucks').then(response => dispatch(setTrucks(response.data)))
  }, [api, dispatch])

  const trucks = useSelector<IDefaultRootState, ITruck[]>(state => state.trucks.all)

  return (
    <TableContainer floatingButtonRoute='trucks/create' >
      <Table trucks={trucks} />
    </TableContainer>
  )
}

export default List