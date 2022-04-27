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
    <Container style={{ marginTop: 64 }} >
      <AppBar />
    </Container>
  )
}

export default Detail