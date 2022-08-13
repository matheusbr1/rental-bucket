import React, { useEffect } from 'react'
import { AppBar } from 'components/AppBar'
import Table from 'components/Table/Trucks'
import FloatingButton from 'components/FloatingButton'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container } from '@material-ui/core'
import { IDefaultRootState, ITruck } from 'interfaces'
import usePrivateApi from 'hooks/usePrivateApi'
import { setTrucks } from 'store/truck/truck.actions'
import { EmptyTableMessage } from 'components/EmptyTableMessage'

const List: React.FC = () => {
  const api = usePrivateApi()

  const history = useHistory()
  
  const dispatch = useDispatch()

  useEffect(() => {
    api.get('trucks').then(response => dispatch(setTrucks(response.data)))
  }, [api, dispatch])

  const trucks = useSelector<IDefaultRootState, ITruck[]>(state => state.trucks.all)

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
        {trucks.length ? (
          <Table trucks={trucks} />
        ) : (
          <EmptyTableMessage tableName='caminhões' />
        )}
        
        <FloatingButton onClick={() => history.push('trucks/create')} />
      </Box>
    </Container>
  )
}

export default List