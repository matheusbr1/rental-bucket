/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router'
import AppBar  from 'components/AppBar'
import { Container } from '@material-ui/core'

const Detail: React.FC = () => {
  const { goBack } = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  
  const handleEdit = useCallback((fields) => {
    setLoading(true)

    try {
      enqueueSnackbar('Caminhão editado com sucesso', {
        variant: 'success'
      })
    } catch (error) {
      enqueueSnackbar('Erro ao editar o caminhão, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar])

  const handleDelete = useCallback(() => {
    setLoading(true)

    try {
      enqueueSnackbar('Caminhão deletado com sucesso!', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      enqueueSnackbar('Erro ao deletar caminhão, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar, goBack])

  return (
    <Container style={{ marginTop: 64 }} >
      <AppBar search={false} />
    </Container>
  )
}

export default Detail