import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'
import * as yup from 'yup'

import { Container } from './styles'
import Card from '../components/Card'
import getValidationErrors from 'utils/getValidationFormErrors'

const Create: React.FC = () => {

  const { goBack } = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback(async (fields) => {

    console.log('Data', fields)

    setLoading(true)

    try {
      const schema = yup.object().shape({
        adress: yup.string().required('Campo obrigatório'),
        client: yup.string().required('Campo obrigatório'),
        driver: yup.string().required('Campo obrigatório'),
        equipment: yup.string().required('Campo obrigatório'),
        quantity: yup.string().required('Campo obrigatório'),
        service: yup.string().required('Campo obrigatório'),
        truck: yup.string().required('Campo obrigatório')
      })

      await schema.validate(fields, {
        abortEarly: false
      })

      setTimeout(() => {
        enqueueSnackbar('Serviço criado com sucesso!', {
          variant: 'success'
        })

        // goBack()
      }, 2000)
    } catch (error) {

      if(error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error)
        console.log(errors)
      }

    } finally {
      setLoading(false)
    }
  }, [goBack, enqueueSnackbar])

  return (
    <Container>
      <AppBar search={false} />

      <Card 
        onFormSubmit={handleCreate}
        loading={loading}
        type='create'
      />
    </Container>
  )
}

export default Create