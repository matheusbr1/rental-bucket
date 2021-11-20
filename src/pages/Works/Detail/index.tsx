import React, { useCallback, useState } from 'react'
import { useSnackbar } from 'notistack'

import AppBar  from 'components/AppBar'
import { Container } from './styles'
import Card from '../components/Card'
import { useHistory } from 'react-router'

const Detail: React.FC = () => {

  const { goBack } = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleEdit = useCallback(async (fields) => {

    console.log('Data', fields)

    setLoading(true)

    try {
      // Requisição

      enqueueSnackbar('Serviço editado com sucesso', {
        variant: 'success'
      })
    } catch (error) {
      enqueueSnackbar('Erro ao editar serviço, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar])

  const handleDelete = useCallback(async () => {

    setLoading(true)

    try {
      // requisição

      enqueueSnackbar('Serviço deletado com sucesso!', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      enqueueSnackbar('Erro ao deletar serviço, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar, goBack])

  return (
    <Container>
      <AppBar search={false} />

      <Card 
        type='update'
        onConfirm={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
    </Container>
  )
}

export default Detail