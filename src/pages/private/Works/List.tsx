import React, { useEffect } from 'react'
import Table from 'components/Table/Works'
import { useDispatch, useSelector } from 'react-redux'
import { IDefaultRootState, IWork } from 'interfaces'
import { setWorks } from 'store/work/work.actions'
import usePrivateApi from 'hooks/usePrivateApi'
import { TableContainer } from 'components/layout/TableContainer'
import { setDrivers } from 'store/driver/driver.actions'
import { useCompany } from 'hooks/useCompany'

const List: React.FC = () => {
  const api = usePrivateApi()
  const dispatch = useDispatch()
  const { company } = useCompany()

  useEffect(() => {
    api.get('works', {
      params: {
        company_id: company?.id
      }
    }).then(response => dispatch(setWorks(response.data)))

    api.get('/drivers', {
      params: {
        company_id: company?.id
      }
    }).then(response => dispatch(setDrivers(response.data)))
  }, [api, company?.id, dispatch])

  const works = useSelector<IDefaultRootState, IWork[]>(state => state.works.all)

  return (
    <TableContainer floatingButtonRoute='works/create' >
      <Table works={works} />
    </TableContainer>
  )
}

export default List