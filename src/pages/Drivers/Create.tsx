import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { AppBar } from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import Button from 'components/Button'
import { IContact, IDriver } from 'interfaces'
import { createDriver } from 'redux/driver/driver.actions'
import { Formik, Form } from 'formik'
import Loading from 'components/Loading'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import { driverSchema } from 'validations/driverSchema'
import { removeMask } from 'utils/formatters'
import DriverFormCore from './FormCore'
import usePrivateApi from 'hooks/usePrivateApi'

const Create: React.FC = () => {
  const api = usePrivateApi()
  
  const { goBack } = useHistory()

  const dispatch = useDispatch()

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback(async (fields: Omit<IDriver, 'id'>) => {
    setLoading(true)

    try {
      const { data: driver } = await api.post('/drivers', {
        name: fields.name,
        CPF: removeMask(fields.CPF),
        RG: removeMask(fields.RG),
        CNH: removeMask(fields.CNH),
        birthday: fields.birthday
      })

      const contacts = [] as IContact[]

      for await (const contact of fields.contacts) {
        const { data: newContact } = await api.post('drivers/contact', {
          ...contact,
          contact: contact.contact,
          contact_type: contact.contact_type,
          driver_id: driver?.id
        })

        contacts.push(newContact)
      }
      
      const { data: newAddress } = await api.post('/drivers/address', { 
        ...fields.address,
        state: fields.address.state?.sigla,
        city: fields.address.city?.name,
        driver_id: driver?.id
      })

      dispatch(createDriver({ 
        ...fields, 
        id: driver.id,
        contacts,
        address: newAddress
       } as IDriver))

      snackbar('Motorista criado com sucesso!', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      snackbar('Erro ao criar motorista, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [api, dispatch, snackbar, goBack])

  return (
    <Container maxWidth='md' style={{ marginTop: 100 }} >
      <AppBar />

      <Formik
        onSubmit={handleCreate}
        enableReinitialize
        validateOnChange
        validationSchema={driverSchema}
        initialValues={{
          name: '',
          CPF: '',
          RG: '',
          CNH: '',
          birthday: null,
          address: {
            CEP: '',
            street: '',
            number: '',
            neighborhood: '',
            state: null,
            city: null,
            complement: ''
          },
          contacts: []
        }}
      >
        {({ isValid }) => (
          <Form>
            {loading && <Loading />}

            <Grid container spacing={3} justifyContent='flex-end' >
              <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }} >
                <Typography variant='h1' >
                  Novo Motorista
                </Typography>
              </Grid>

              <DriverFormCore />

              <Grid item lg={4} md={4} sm={4} xs={12} >
                <Box mb='2rem' >
                  <Button 
                    loading={loading} 
                    color='primary' 
                    type='submit'
                    disabled={!isValid}
                  >
                    Criar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default Create