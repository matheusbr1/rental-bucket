/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react'
import { useSnackbar } from 'notistack'
import { AppBar } from 'components/AppBar'
import { useHistory } from 'react-router'
import { Container } from '@material-ui/core'

const Detail: React.FC = () => {
  const { goBack } = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleEdit = useCallback(async (fields) => {

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
    <Container style={{ marginTop: 64 }}>
      <AppBar />
    </Container>
  )
}

export default Detail