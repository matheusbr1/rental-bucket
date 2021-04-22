import React, { useCallback, useState } from 'react'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'

import { Container } from './styles'
import Card from '../components/Card'

const Create: React.FC = () => {

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleEdit = useCallback((fields) => {

    console.log('fields', fields)

    setLoading(true)

    setTimeout(() => {
      enqueueSnackbar('Cliente editado com sucesso', {
        variant: 'success'
      })

      setLoading(false)
    }, 2000)
  }, [enqueueSnackbar])

  const handleDelete = useCallback(() => {

    setLoading(true)

    setTimeout(() => {
      enqueueSnackbar('Erro ao deletar cliente, tente novamente!', {
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

export default Create