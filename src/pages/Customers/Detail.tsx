/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react'
import { AppBar } from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { useHistory, useParams } from 'react-router'
import { IAddress, IContact, ICustomer, IDefaultRootState, PersonType } from 'interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import FormikTextField from 'components/FormikTextField'
import { api } from 'services/api'
import { RadioGroup } from 'formik-mui'
import { FormControlLabel, Radio } from '@mui/material'
import Button from 'components/Button'
import { Box, Container, Divider, Grid, Typography } from '@material-ui/core'
import { Contacts } from 'components/Contacts'
import { Adresses } from 'components/Adresses'
import { deleteCustomer } from 'redux/customer/customer.actions'

interface CustomerFields {
  person_type: PersonType
  CPF_CNPJ: string
  name?: string
  company_name?: string
  fantasy_name?: string
  adresses: IAddress[]
  contacts: IContact[]
}
interface IDetailParams {
  id: string
}

const Detail: React.FC = () => {
  const { goBack } = useHistory()

  const { id } = useParams<IDetailParams>()

  const dispatch = useDispatch()

  const currentCustomer = useSelector((state: IDefaultRootState) => state.customers.current as ICustomer)

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [isDeleting, setIsDeleting] = useState(false)

  const [formStatus, setFormStatus] = useState<'isEditing' | 'isViewing'>('isViewing')

  const renderFieldsByPerson = (person: PersonType, isSubmitting: boolean) => {
    const disabled = formStatus === 'isViewing' || isSubmitting

    if (person === 'F') {
      return (
      <React.Fragment>
        <Grid item lg={6} md={6} sm={6} xs={12} >
          <Field 
            component={FormikTextField} 
            label='Nome' 
            name='name'
            disabled={disabled}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12} >
          <Field 
            component={FormikTextField} 
            label='CPF' 
            name='CPF_CNPJ' 
            disabled={disabled}
          />
        </Grid>
      </React.Fragment>
      )
    }

    if (person === 'J') {
      return (
        <React.Fragment>
          <Grid item lg={6} md={6} sm={6} xs={12} >
            <Field 
              component={FormikTextField} 
              label='Razão Social' 
              name='company_name' 
              disabled={disabled}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12} >
            <Field 
              component={FormikTextField} 
              label='Nome Fantasia' 
              name='fantasy_name' 
              disabled={disabled}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12} >
            <Field 
              component={FormikTextField} 
              label='CNPJ' 
              name='CPF_CNPJ' 
              disabled={disabled}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12} />
        </React.Fragment>
      )
    }
  }

  const handleEdit = useCallback(async (fields: CustomerFields) => {
    try {
      console.log('data', fields)

      // Requisição

      goBack()

      snackbar('Cliente editado com sucesso', {
        variant: 'success'
      })
    } catch (error) {
      snackbar('Erro ao editar cliente, tente novamente!', {
        variant: 'error'
      })
    }
  }, [snackbar, goBack])

  const handleDelete = useCallback(async () => {  
    try {
      setIsDeleting(true)

      await api.delete(`customers/${id}`)

      dispatch(deleteCustomer(id))

      snackbar('Cliente deletado com sucesso!', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      snackbar('Erro ao deletar cliente, tente novamente!', {
        variant: 'error'
      })
    }
  }, [dispatch, goBack, id, snackbar])

  return (
    <Container maxWidth='md' style={{ marginTop: 100 }} >
      <AppBar />

      <Formik
        onSubmit={handleEdit}
        validateOnChange
        enableReinitialize
        initialValues={currentCustomer}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form aria-disabled >
            <Grid container spacing={3} >
              <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
                <Typography variant='h1' >
                  Detalhe do cliente
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
                    disabled={formStatus === 'isViewing' || isSubmitting}
                    control={<Radio />}
                  />

                  <FormControlLabel
                    value="J"
                    label="Pessoa Jurídica"
                    disabled={formStatus === 'isViewing' || isSubmitting}
                    control={<Radio />}
                  />
                </Field>
              </Grid>

              {renderFieldsByPerson(values.person_type as PersonType, isSubmitting)}

              <Grid item lg={12} md={12} sm={12} xs={12} >
                <Divider style={{ margin: '2rem 0' }} />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12} >
                <Adresses
                  disabled={formStatus === 'isViewing'}
                  adresses={values.adresses} 
                  setAdresses={(adresses: IAddress[]) => setFieldValue('adresses', adresses)} 
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12} >
                <Divider style={{ margin: '2rem 0' }} />
              </Grid>
              
              <Grid item lg={12} md={12} sm={12} xs={12} >
                <Contacts
                  disabled={formStatus === 'isViewing'}
                  contacts={values.contacts} 
                  setContacts={(contacts: IContact[]) => setFieldValue('contacts', contacts)} 
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12} >
                <Divider style={{ margin: '2rem 0' }} />
              </Grid>

              <Grid container spacing={3} justifyContent='flex-end' >
                <Grid item lg={4} md={4} sm={4} xs={12} >
                  <Box 
                    mb='2rem'
                    display='flex'
                    justifyContent='space-between'
                    gridGap={5}
                  >
                    <Button 
                      loading={isDeleting} 
                      color='secondary'
                      onClick={handleDelete} 
                    >
                      Deletar
                    </Button>

                    {formStatus === 'isViewing' && (
                      <Button 
                        color='primary'
                        type='button'
                        onClick={() => setFormStatus('isEditing')}
                      >
                        Editar
                      </Button>
                    )}

                    {formStatus === 'isEditing' && (
                      <Button 
                        loading={isSubmitting} 
                        color='primary'
                        type='submit'
                      >
                        Salvar
                      </Button>
                    )}
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

export default Detail