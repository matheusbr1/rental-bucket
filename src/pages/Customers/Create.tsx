import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import { AppBar } from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { IAddress, IContact, PersonType } from 'interfaces'
import { createCustomer } from 'redux/customer/customer.actions'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import Button from 'components/Button'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import { CustomerCoreForm } from './FormCore'
import usePrivateApi from 'hooks/usePrivateApi'

interface CustomerFields {
  person_type: PersonType
  CPF_CNPJ: string
  name?: string
  company_name?: string
  fantasy_name?: string
  adresses: IAddress[]
  contacts: IContact[]
}

const Create: React.FC = () => {
  const api = usePrivateApi()

  const { goBack } = useHistory()

  const dispatch = useDispatch()

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const handleCreate = useCallback(async (fields: CustomerFields) => {
    try {
      const { data: customer } = await api.post('customers', fields)

      const contacts = [] as IContact[]
      const adresses = [] as IAddress[]

      for await (const contact of fields.contacts) {
        const { data: newContact } = await api.post('customers/contact', {
          ...contact,
          contact: contact.contact,
          contact_type: contact.contact_type,
          customer_id: customer.id
        })

        contacts.push(newContact)
      }

      for await (const address of fields.adresses) {
        const { data: newAddress } = await api.post('customers/address', { 
          ...address,
          state: address.state?.sigla,
          city: address.city?.name,
          customer_id: customer.id
        })

        adresses.push(newAddress)
      }

      dispatch(createCustomer({
        ...fields, 
        id: customer.id,
        contacts,
        adresses
      }))

      snackbar('Cliente criado com sucesso!', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      snackbar('Erro ao criar cliente, tente novamente!', {
        variant: 'error'
      })
    }
  }, [api, dispatch, snackbar, goBack])

  return (
    <Container maxWidth='md' style={{ marginTop: 100 }} >
      <AppBar />

      <Formik
        onSubmit={handleCreate}
        enableReinitialize
        validateOnChange
        initialValues={{
          person_type: 'F',
          CPF_CNPJ: '',
          name: '',
          company_name: '',
          fantasy_name: '',
          adresses: [],
          contacts: []
        }}
      >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={3} >
                <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
                  <Typography variant='h1' >
                    Novo Cliente
                  </Typography>
                </Grid>

                <CustomerCoreForm />

                <Grid container spacing={3} justifyContent='flex-end' >
                  <Grid item lg={4} md={4} sm={4} xs={12} >
                    <Box mb='2rem' >
                      <Button loading={isSubmitting} color='primary' type='submit' >
                        Criar
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
    </Container>
  )
}

export default Create