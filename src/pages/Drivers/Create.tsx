import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { AppBar } from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { api } from 'services/api'
import Button from 'components/Button'
import axios from 'axios'
import { IAddress, ICity, IContact, IDriver, IState } from 'interfaces'
import { getStates } from 'fetchs/getStates'
import { getCitys } from 'fetchs/getCitys'
import { createDriver } from 'redux/driver/driver.actions'
import { Formik, Form, Field } from 'formik'
import FormikTextField from 'components/FormikTextField'
import FormikDateInput from 'components/FormikDateInput'
import FormikAutoComplete from 'components/FormikAutoComplete'
import Loading from 'components/Loading'
import { Contacts } from 'components/Contacts'
import { Box, Container, Divider, Grid, Typography } from '@material-ui/core'

interface AddressProps {
  logradouro: string 
  uf: string 
  localidade: string  
  bairro: string 
}

const Create: React.FC = () => {
  const { goBack } = useHistory()

  const dispatch = useDispatch()

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)
  const [states, setStates] = useState<IState[]>([])
  const [citys, setCitys] = useState<ICity[]>([])

  // Getting States
  useEffect(() => {
    (async () => {
      const states = await getStates()
      setStates(states)
    })()
  }, [])

  const handleGetAdress = useCallback(async (CEP: string): Promise<Partial<IAddress> | undefined> => {
    try {
      setLoading(true)

      let address = { CEP } as Partial<IAddress>
  
      const { data } = await axios.get(`https://viacep.com.br/ws/${CEP}/json`)

      if (data.erro) {
        throw new Error('Unable to fetch zip code')
      }
  
      if (!data) {
        return address
      }
  
      const { logradouro, uf, localidade, bairro }: AddressProps = data
          
      address = {
        neighborhood: bairro,
        street: logradouro,
        state: states.find(state => state.sigla === uf)
      }
  
      const citys = await getCitys(uf)
  
      setCitys(citys)
  
      address.city = citys.find(city => city.name === localidade)
  
      return address
    } catch {
      snackbar('Erro ao buscar endereço, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [states, snackbar])

  const handleCreate = useCallback(async (fields: IDriver) => {
    setLoading(true)

    try {
      const { data: driver } = await api.post('/drivers', {
        name: fields.name,
        CPF: fields.CPF,
        RG: fields.RG,
        CNH: fields.CNH,
        birthday: fields.birthday
      })

      fields.contacts.map(async ({ contact, contact_type }) => {
        await api.post('/drivers/contact', {
          contact,
          contact_type,
          driver_id: driver?.id
        })
      })

      await api.post('/drivers/address', { 
        ...fields.address,
        state: fields.address.state?.sigla,
        city: fields.address.city?.name,
        driver_id: driver?.id
      })

      dispatch(createDriver(fields))

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
  }, [goBack, snackbar, dispatch])

  return (
    <Container maxWidth='md' style={{ marginTop: 100 }} >
      <AppBar />

      <Formik
        onSubmit={handleCreate}
        enableReinitialize
        validateOnChange
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
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            {loading && <Loading />}

            <Grid container spacing={3} justifyContent='flex-end' >
              <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }} >
                <Typography variant='h1' >
                  Novo Motorista
                </Typography>
              </Grid>

              <Grid item lg={8} md={8} sm={8} xs={12} >
                <Field component={FormikTextField} label='Nome' name='name' />
              </Grid>

              <Grid item lg={4} md={4} sm={4} xs={12} >
                <Field component={FormikTextField} label='CPF' name='CPF' />
              </Grid>

              <Grid item lg={4} md={4} sm={4} xs={12} >
                <Field component={FormikTextField} label='RG' name='RG' />
              </Grid>

              <Grid item lg={4} md={4} sm={4} xs={12} >
                <Field component={FormikTextField} label='CNH' name='CNH' />
              </Grid>

              <Grid item lg={4} md={4} sm={4} xs={12} >
                <FormikDateInput label="Data de nascimento" name="birthday" />
              </Grid>

              <Grid item lg={4} md={4} sm={4} xs={12} />

              <Grid item lg={12} md={12} sm={12} xs={12} >
                <Divider style={{ margin: '2rem 0' }} />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12} >
                <Typography variant='h2' >
                  Endereço
                </Typography>
              </Grid>

              <Grid item lg={2} md={2} sm={4} xs={12} >
                <Field 
                  component={FormikTextField} 
                  label='CEP' 
                  name='address.CEP'
                  onBlur={async () => {
                    const address = await handleGetAdress(values.address.CEP)
                    setFieldValue('address', { ...values.address, ...address })
                  }}
                />
              </Grid>

              <Grid item lg={10} md={10} sm={8} xs={12} >
                <Field component={FormikTextField} label='Logradouro' name='address.street' />
              </Grid>

              <Grid item lg={2} md={2} sm={4} xs={12} >
                <Field 
                  component={FormikTextField} 
                  label='Número' 
                  name='address.number'
                  type='number'
                  inputProps={{ min: 0 }}
                />
              </Grid>

              <Grid item lg={10} md={10} sm={8} xs={12} >
                <Field component={FormikTextField} label='Bairro' name='address.neighborhood' />
              </Grid>

              <Grid item lg={2} md={2} sm={4} xs={12} >
                <FormikAutoComplete 
                  name="address.state"
                  options={states}
                  error={errors.address?.state}
                  touched={touched.address?.state}
                  label='UF'
                  getOptionLabel={(option: IState) => option.sigla}
                />
              </Grid>

              <Grid item lg={5} md={5} sm={4} xs={12} >
                <FormikAutoComplete 
                  name="address.city"
                  options={citys}
                  error={errors.address?.city}
                  touched={touched.address?.city}
                  label='Cidade'
                  getOptionLabel={(option: ICity) => option.name}
                />
              </Grid>

              <Grid item lg={5} md={5} sm={4} xs={12} >
                <Field component={FormikTextField} label='Complemento' name='address.complement' />
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

              <Grid item lg={4} md={4} sm={4} xs={12} >
                <Box mb='2rem' >
                  <Button loading={loading} color='primary' type='submit' >
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