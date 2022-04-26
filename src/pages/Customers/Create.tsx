import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { IAddress, IContact, PersonType } from 'interfaces'
import { createCustomer } from 'redux/customer/customer.actions'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import FormikTextField from 'components/FormikTextField'
import { api } from 'services/api'
import { RadioGroup } from 'formik-mui'
import { FormControlLabel, Radio } from '@mui/material'
import Button from 'components/Button'
import { Box, Container, Divider, Grid, Typography } from '@material-ui/core'
import { Contacts } from 'components/Contacts'
import { Adresses } from 'components/Adresses'

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
  const { goBack } = useHistory()

  const dispatch = useDispatch()

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const handleCreate = useCallback(async (fields: CustomerFields) => {
    try {
      const { data: customer } = await api.post('customers', fields)

      fields.contacts.map(async ({ contact, contact_type }) => {
        await api.post('customers/contact', {
          contact,
          contact_type,
          customer_id: customer.id
        })
      })

      fields.adresses.map(async (address) => {
        await api.post('customers/address', { 
          ...address,
          state: address.state?.sigla,
          city: address.city?.name,
          customer_id: customer.id
        })
      })

      dispatch(createCustomer(customer))

      snackbar('Cliente criado com sucesso!', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      snackbar('Erro ao criar cliente, tente novamente!', {
        variant: 'error'
      })
    }
  }, [goBack, snackbar, dispatch])

  const renderFieldsByPerson = (person: PersonType) => {
    if (person === 'F') {
      return (
      <React.Fragment>
        <Grid item lg={6} md={6} sm={6} xs={12} >
          <Field component={FormikTextField} label='Nome' name='name' />
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12} >
          <Field component={FormikTextField} label='CPF' name='CPF_CNPJ' />
        </Grid>
      </React.Fragment>
      )
    }

    if (person === 'J') {
      return (
        <React.Fragment>
          <Grid item lg={6} md={6} sm={6} xs={12} >
            <Field component={FormikTextField} label='Razão Social' name='company_name' />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12} >
            <Field component={FormikTextField} label='Nome Fantasia' name='fantasy_name' />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12} >
            <Field component={FormikTextField} label='CNPJ' name='CPF_CNPJ' />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12} />
        </React.Fragment>
      )
    }
  }

  return (
    <Container maxWidth='md' style={{ marginTop: 100 }} >
      <AppBar search={false} />

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
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <Grid container spacing={3} >
                <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
                  <Typography variant='h1' >
                    Novo Cliente
                  </Typography>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                  <Field
                    row
                    component={RadioGroup}
                    name='person_type'
                  >
                    <FormControlLabel
                      value="F"
                      defaultChecked
                      label="Pessoa Física"
                      control={<Radio />}
                    />

                    <FormControlLabel
                      value="J"
                      label="Pessoa Jurídica"
                      control={<Radio />}
                    />
                  </Field>
                </Grid>

                {renderFieldsByPerson(values.person_type)}

                <Grid item lg={12} md={12} sm={12} xs={12} >
                  <Divider style={{ margin: '2rem 0' }} />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                  <Adresses
                    adresses={values.adresses} 
                    setAdresses={(adresses: IAddress[]) => setFieldValue('adresses', adresses)} 
                  />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                  <Divider style={{ margin: '2rem 0' }} />
                </Grid>
                
                <Grid item lg={12} md={12} sm={12} xs={12} >
                  <Contacts 
                    contacts={values.contacts} 
                    setContacts={(contacts: IContact[]) => setFieldValue('contacts', contacts)} 
                  />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                  <Divider style={{ margin: '2rem 0' }} />
                </Grid>

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