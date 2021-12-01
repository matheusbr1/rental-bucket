/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router'
import { Container } from '@material-ui/core'

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
    <Container style={{ marginTop: 64 }} >
      <AppBar search={false} />
    </Container>
  )
}

export default Create