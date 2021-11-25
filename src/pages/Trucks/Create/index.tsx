import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { useData } from 'hooks/useData'
import { Actions } from 'store/actions'

import { Container } from './styles'
import Card from '../components/Card'

const Create: React.FC = () => {

  const { goBack } = useHistory()

  const { dispatch } = useData()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback((fields) => {
    dispatch({ type: Actions.CREATE_TRUCK, payload: fields })

    setLoading(true)

    setTimeout(() => {
      goBack()

      enqueueSnackbar('Caminhão cadastrado com sucesso!', {
        variant: 'success'
      })

      setLoading(false)
    }, 2000)
  }, [goBack, enqueueSnackbar, dispatch])

  return (
    <Container>
      <AppBar search={false} />

      <Card
        type='create'
        loading={loading}
        onConfirm={handleCreate}
      />
    </Container>
  )
}

export default Create