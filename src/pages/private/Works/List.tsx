import React, { useEffect } from 'react'
import { AppBar } from 'components/AppBar'
import Table from 'components/Table/Works'
import FloatingButton from 'components/FloatingButton'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Box } from '@material-ui/core'
import { IDefaultRootState, IWork } from 'interfaces'
import { setWorks } from 'store/work/work.actions'
import usePrivateApi from 'hooks/usePrivateApi'

const List: React.FC = () => {
  const api = usePrivateApi()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    api.get('works').then(response => dispatch(setWorks(response.data)))
  }, [api, dispatch])

  const works = useSelector<IDefaultRootState, IWork[]>(state => state.works.all)

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
        <Table works={works} />

        <FloatingButton onClick={() => history.push('works/create')} />
      </Box>
    </Container>
  )
}

export default List