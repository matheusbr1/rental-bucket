import React, { useEffect } from 'react'
import AppBar  from 'components/AppBar'
import Table from 'components/Table/Works'
import FloatingButton from 'components/FloatingButton'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Box } from '@material-ui/core'
import { IDefaultRootState, IWork } from 'interfaces'
import { EmptyTableMessage } from 'components/EmptyTableMessage'
import { api } from 'services/api'
import { setWorks } from 'redux/work/work.actions'

const List: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    api.get('works').then(response => dispatch(setWorks(response.data)))
  }, [dispatch])

  const works = useSelector<IDefaultRootState, IWork[]>(state => state.works)

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
        {works.length ? (
          <Table  title='Serviços' works={works} />
        ) : (
          <EmptyTableMessage tableName='serviços' />
        )}

        <FloatingButton onClick={() => history.push('works/create')} />
      </Box>
    </Container>
  )
}

export default List