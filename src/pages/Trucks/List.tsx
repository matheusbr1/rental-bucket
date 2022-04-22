import React, { useEffect } from 'react'
import AppBar  from 'components/AppBar'
import Table from 'components/Table/Trucks'
import FloatingButton from 'components/FloatingButton'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container } from '@material-ui/core'
import { IDefaultRootState, ITruck } from 'interfaces'
import { api } from 'services/api'
import { setTrucks } from 'redux/actions/actionCreators'
import { EmptyTableMessage } from 'components/EmptyTableMessage'

const List: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    api.get('trucks').then(response => dispatch(setTrucks(response.data)))
  }, [dispatch])

  const trucks = useSelector<IDefaultRootState, ITruck[]>(state => state.truck.trucks)

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
        {trucks.length ? (
          <Table title='Caminhões' trucks={trucks} />
        ) : (
          <EmptyTableMessage tableName='caminhões' />
        )}
        
        <FloatingButton onClick={() => history.push('trucks/create')} />
      </Box>
    </Container>
  )
}

export default List