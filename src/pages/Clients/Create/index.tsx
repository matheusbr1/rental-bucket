import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'

import { Container } from './styles'

import Card from '../components/Card'

const Create: React.FC = () => {

  const { goBack } = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback((fields) => {

    console.log('data', fields)

    setLoading(true)

    try {
      // Requisição

      enqueueSnackbar('Cliente criado com sucesso!', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      enqueueSnackbar('Erro ao criar cliente, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }

  }, [goBack, enqueueSnackbar])

  return (
    <Container>
      <AppBar search={false} />
      
      <Card 
        type='create' 
        onConfirm={handleCreate}
        loading={loading}
      />
    
    </Container>
  )
}

export default Create