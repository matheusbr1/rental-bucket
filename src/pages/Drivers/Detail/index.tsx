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
      enqueueSnackbar('Motorista editado com sucesso', {
        variant: 'success'
      })
    } catch (error) {
      enqueueSnackbar('Erro ao editar motorista, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }

  }, [enqueueSnackbar])

  const handleDelete = useCallback(async () => {

    setLoading(true)

    try {
      enqueueSnackbar('Motorista deletado com sucesso!', {
        variant: 'error'
      })

      goBack()
    } catch (error) {
      enqueueSnackbar('Erro ao deletar motorista, tente novamente!', {
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