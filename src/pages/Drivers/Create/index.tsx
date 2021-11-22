import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'
import Card from '../components/Card'
import { useData } from 'hooks/useData'
import { api } from 'services/api'

import { Container } from './styles'

const Create: React.FC = () => {

  const { goBack } = useHistory()

  const { createDriver } = useData()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback(async (fields) => {

    console.log('Data', fields)

    setLoading(true)

    try {
      await api.post('/drivers', fields)

      createDriver(fields)

      enqueueSnackbar('Motorista criado com sucesso!', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      enqueueSnackbar('Erro ao criar motorista, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [goBack, enqueueSnackbar, createDriver])

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