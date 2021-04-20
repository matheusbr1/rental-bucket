import React, { useCallback, useState } from 'react'
import { useSnackbar } from 'notistack'

import AppBar  from 'components/AppBar'
import { Container } from './styles'
import Card from '../components/Card'

const Detail: React.FC = () => {

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleEdit = useCallback(() => {
    setLoading(true)

    setTimeout(() => {
      enqueueSnackbar('Serviço editado com sucesso', {
        variant: 'success'
      })

      setLoading(false)
    }, 2000)
  }, [enqueueSnackbar])

  const handleDelete = useCallback(() => {

    setLoading(true)

    setTimeout(() => {
      // goBack()

      enqueueSnackbar('Erro ao deletar serviço, tente novamente!', {
        variant: 'error'
      })

      setLoading(false)
    }, 2000)
  }, [enqueueSnackbar])

  return (
    <Container>
      <AppBar search={false} />

      <Card 
        type='update'
        onFormSubmit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
    </Container>
  )
}

export default Detail