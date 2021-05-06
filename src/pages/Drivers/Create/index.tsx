import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'

import { Container } from './styles'
import Card from '../components/Card'
import { useData } from 'hooks/data'

const Create: React.FC = () => {

  const { goBack } = useHistory()

  const { createNewDriver } = useData()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback(async (fields) => {

    console.log('Data', fields)

    setLoading(true)

    try {
      createNewDriver(fields)

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
  }, [goBack, enqueueSnackbar, createNewDriver])

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