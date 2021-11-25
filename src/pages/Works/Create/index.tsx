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

  const { enqueueSnackbar } = useSnackbar()

  const { dispatch } = useData()

  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback(async (fields) => {
    setLoading(true)

    try {
      dispatch({ type: Actions.CREATE_WORK, payload: fields })

      enqueueSnackbar('Serviço criado com sucesso!', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      enqueueSnackbar('Erro ao criar serviço, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [goBack, enqueueSnackbar, dispatch])

  return (
    <Container>
      <AppBar search={false} />

      <Card 
        loading={loading}
        onConfirm={handleCreate}
        type='create'
      />
    </Container>
  )
}

export default Create