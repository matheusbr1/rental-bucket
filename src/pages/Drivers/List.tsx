import React from 'react'
import AppBar  from 'components/AppBar'
import Table from 'components/Table/Drivers'
import FloatingButton from 'components/FloatingButton'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { Box, Container } from '@material-ui/core'
import { IDefaultRootState, IDriver } from 'interfaces'

const List: React.FC = () => {

  const history = useHistory()

  const drivers = useSelector<IDefaultRootState, IDriver[]>(state => state.driver.drivers)

  return (
    <Container style={{ marginTop: 64 }} >
      <AppBar />
      
      <Box width='100%' m='20px 0' display='flex' justifyContent='center'>
        <Table  title='Motoristas' drivers={drivers} />
        <FloatingButton onClick={() => history.push('drivers/create')} />
      </Box>
    </Container>
  )
}

export default List