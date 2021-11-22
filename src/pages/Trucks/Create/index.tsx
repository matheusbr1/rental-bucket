import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'

import { Container } from './styles'
import Card from '../components/Card'
import { useData } from 'hooks/useData'

const Create: React.FC = () => {

  const { goBack } = useHistory()

  const { createTruck } = useData()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback((fields) => {

    console.log('fields', fields)

    createTruck(fields)

    setLoading(true)

    setTimeout(() => {
      goBack()

      enqueueSnackbar('Caminhão cadastrado com sucesso!', {
        variant: 'success'
      })

      setLoading(false)
    }, 2000)
  }, [goBack, enqueueSnackbar, createTruck])

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