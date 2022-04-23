import React, { useEffect } from 'react'
import AppBar  from 'components/AppBar'
import Table from 'components/Table/Drivers'
import FloatingButton from 'components/FloatingButton'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container } from '@material-ui/core'
import { IDefaultRootState, IDriver } from 'interfaces'
import { api } from 'services/api'
import { setDrivers } from 'redux/driver/driver.actions'
import { EmptyTableMessage } from 'components/EmptyTableMessage'

const List: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    api.get('/drivers').then(response =>dispatch(setDrivers(response.data)))
  }, [dispatch])

  const drivers = useSelector<IDefaultRootState, IDriver[]>(state => state.driver.drivers)

  return (
    <Container style={{ marginTop: 64 }} >
      <AppBar />
      
      <Box 
        width='100%' 
        m='20px 0' 
        minHeight='calc(100vh - 64px)' 
        display='flex' 
        justifyContent='center' 
        alignItems='center'
      >
        {drivers.length ? (
          <Table  title='Motoristas' drivers={drivers} />
        ) : (
          <EmptyTableMessage tableName='motoristas' />
        )}
        
        <FloatingButton onClick={() => history.push('drivers/create')} />
      </Box>
    </Container>
  )
}

export default List