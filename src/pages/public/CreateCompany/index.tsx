import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { createStyles } from '@material-ui/styles'
import Button from 'components/Button'
import usePrivateApi from 'hooks/usePrivateApi'
import { useSnackbar } from 'notistack'
import { Field, Form, Formik } from 'formik'
import FormikTextField from 'components/FormikTextField'
import { Link } from 'react-router-dom'
import {
  Container,
  Typography,
  Card,
  Box,
  makeStyles,
  Grid,
} from '@material-ui/core'
import { getStates } from 'fetchs/getStates'
import { IAddress } from 'interfaces'
import axios from 'axios'
import { getCitys } from 'fetchs/getCitys'
import FormikAutoComplete from 'components/FormikAutoComplete'
import { removeMask } from 'utils/formatters'
import Loading from 'components/Loading'

const useStyles = makeStyles((theme) => createStyles({
  content: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: theme.spacing(4),
    maxWidth: 500,
    '& h1': {
      marginBottom: theme.spacing(1),
    },
    '& h3': {
      marginBottom: theme.spacing(2),
    },
    '& > div': {
      marginBottom: theme.spacing(2),
    }
  }
}))

interface ICreateCompanyFields {
  name: string
  address: IAddress
}

interface AddressProps {
  logradouro: string
  uf: string
  localidade: string
  bairro: string
}

const CreateCompany: React.FC = () => {
  const api = usePrivateApi()

  const history = useHistory()

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [states, setStates] = useState<string[]>([])
  const [citys, setCitys] = useState<string[]>([])

  // Getting States
  useEffect(() => {
    (async () => {
      const states = await getStates()
      setStates(states)
    })()
  }, [])

  const handleCreateCompany = async (fields: ICreateCompanyFields) => {
    try {
      setLoading(true)

      console.log(fields)

      const { data: company } = await api.post('/companies', {
        name: fields.name,
      })

      await api.post('/companies/address', {
        ...fields.address,
        CEP: removeMask(fields.address.CEP),
        company_id: company?.id
      })

      snackbar('Empresa criada com sucesso!', {
        variant: 'success'
      })

      history.push(`signup?company_id=${company.id}`)
    } catch (e) {
      snackbar('Erro ao criar empresa, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

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
        state: states.find(state => state === uf)
      }

      const citys = await getCitys(uf)

      setCitys(citys)

      address.city = citys.find(city => city === localidade)

      return address
    } catch {
      snackbar('Erro ao buscar endereço, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [states, snackbar])

  return (
    <Container>
      <Box className={classes.content} >
        {loading && <Loading />}

        <Card className={classes.card} elevation={4} >
          <Typography variant='h1' >
            Nova empresa
          </Typography>

          <Typography variant='h3' >
            Crie uma empresa para continuar
          </Typography>

          <Formik
            onSubmit={handleCreateCompany}
            enableReinitialize
            validateOnChange
            initialValues={{
              name: '',
              address: {
                CEP: '',
                street: '',
                number: '',
                neighborhood: '',
                state: null,
                city: null,
                complement: ''
              },
            }}
          >
            {({ isSubmitting, values, setFieldValue, errors, touched }) => (
              <Form>
                <Grid container spacing={3} >
                  <Grid item xs={12} md={12} xl={12} >
                    <Field
                      component={FormikTextField}
                      label='Nome'
                      id='name'
                      name='name'
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={4} xs={12} >
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

                  <Grid item lg={8} md={8} sm={8} xs={12} >
                    <Field
                      component={FormikTextField}
                      label='Logradouro'
                      name='address.street'
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={4} xs={12} >
                    <Field
                      component={FormikTextField}
                      label='Número'
                      name='address.number'
                      type='number'
                      inputProps={{ min: 0 }}
                    />
                  </Grid>

                  <Grid item lg={8} md={8} sm={8} xs={12} >
                    <Field
                      component={FormikTextField}
                      label='Bairro'
                      name='address.neighborhood'
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={4} xs={12} >
                    <FormikAutoComplete
                      name="address.state"
                      options={states}
                      error={errors.address?.state}
                      touched={touched.address?.state}
                      label='UF'
                      getOptionLabel={option => option}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={4} xs={12} >
                    <FormikAutoComplete
                      name="address.city"
                      options={citys}
                      error={errors.address?.city}
                      touched={touched.address?.city}
                      label='Cidade'
                      getOptionLabel={option => option}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={4} xs={12} >
                    <Field
                      component={FormikTextField}
                      label='Complemento'
                      name='address.complement'
                    />
                  </Grid>

                  <Grid item xs={12} md={12} xl={12} >
                    <Link to='/' >
                      Voltar para o login
                    </Link>
                  </Grid>

                  <Grid item xs={12} md={12} xl={12} >
                    <Button
                      color='primary'
                      type='submit'
                      loading={isSubmitting}
                    >
                      Criar
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
    </Container>
  )
}

export default CreateCompany