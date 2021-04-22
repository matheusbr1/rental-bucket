import React, { useCallback, useState } from 'react'
import { useSnackbar } from 'notistack'

import AppBar  from 'components/AppBar'
import Card from '../components/Card'
import { Container } from './styles'

const Detail: React.FC = () => {

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)
  
  const handleEdit = useCallback((fields) => {
    
    console.log('fields', fields)

    setLoading(true)

    setTimeout(() => {
      enqueueSnackbar('Caminhão editado com sucesso', {
        variant: 'success'
      })

      setLoading(false)
    }, 2000)
  }, [enqueueSnackbar])

  const handleDelete = useCallback(() => {

    setLoading(true)

    setTimeout(() => {
      enqueueSnackbar('Erro ao deletar caminhão, tente novamente!', {
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
        loading={loading}
        onFormSubmit={handleEdit}
        onDelete={handleDelete}
      />

    </Container>
  )
}

export default Detail