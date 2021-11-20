import React, { useCallback, useState } from 'react'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'

import { Container } from './styles'
import Card from '../components/Card'
import { useHistory } from 'react-router'

const Create: React.FC = () => {

  const { goBack } = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleEdit = useCallback((fields) => {

    console.log('data', fields)

    setLoading(true)

    try {
      // Requisição

      enqueueSnackbar('Cliente editado com sucesso', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      enqueueSnackbar('Erro ao editar cliente, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar, goBack])

  const handleDelete = useCallback(() => {

    setLoading(true)

    try {
      // Requisição

      enqueueSnackbar('Cliente deletado com sucesso!', {
        variant: 'success'
      })
    } catch (error) {
      enqueueSnackbar('Erro ao deletar cliente, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }

  }, [enqueueSnackbar])

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

export default Create