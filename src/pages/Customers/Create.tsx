import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { IAddress, ICity, IState } from 'interfaces'
import Button from 'components/Button'
import axios from 'axios'
import { getCitys } from 'fetchs/getCitys'
import { getStates } from 'fetchs/getStates'
import { createCustomer } from 'redux/actions/actionCreators'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import FormikTextField from 'components/FormikTextField'
import FormikAutoComplete from 'components/FormikAutoComplete'
import Loading from 'components/Loading'
import { api } from 'services/api'
import { 
  Box,
  Container, 
  Divider, 
  FormControlLabel, 
  Grid, 
  Radio, 
  RadioGroup, 
  Typography 
} from '@material-ui/core'


interface AddressProps {
  logradouro: string 
  uf: string 
  localidade: string  
  bairro: string 
}

const Create: React.FC = () => {
  const { goBack } = useHistory()

  const dispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar()

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
      enqueueSnackbar('Erro ao buscar endereço, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [states, enqueueSnackbar])

  const handleCreate = useCallback(async (fields) => {
    setLoading(true)

    try {
      await api.post('customers', {
        ...fields,
        personType: 'F'
      })

      dispatch(createCustomer(fields))

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

  }, [goBack, enqueueSnackbar, dispatch])

  return (
    <Container maxWidth='md' style={{ marginTop: 100 }} >
      <AppBar search={false} />

      <Formik
          onSubmit={handleCreate}
          enableReinitialize
          validateOnChange
          initialValues={{
            address: {
              CEP: '',
              street: '',
              neighborhood: '',
              state: null,
              city: null
            }
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              {loading && <Loading />}

              <Grid container spacing={3} justify='flex-end' >
                <Grid item lg={12} md={12} sm={12} >
                  <Typography variant='h1' >
                    Novo Cliente
                  </Typography>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                  <RadioGroup name='person' id="person" row >
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
                  </RadioGroup>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12} >
                  <Field component={FormikTextField} label='Nome' name='name' />
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12} >
                  <Field component={FormikTextField} label='CPF_CNPJ' name='CPF' />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                  <Divider style={{ margin: '2rem 0' }} />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                  <Typography variant='h3' >
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
                  <Typography variant='h3' >
                    Contato
                  </Typography>
                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={12} >
                  <Field component={FormikTextField} label='Celular' name='contact.cellphone' />
                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={12} >
                  <Field component={FormikTextField} label='E-mail' name='contact.email' />
                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={12} >
                  <Field component={FormikTextField} label='Telefone' name='contact.phone' />
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