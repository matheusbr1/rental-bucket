import React, { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Divider, Grid, Typography } from '@material-ui/core'
import axios from 'axios'
import { FormStatus, IAddress, ICompany } from 'interfaces'
import { getStates } from 'fetchs/getStates'
import { getCitys } from 'fetchs/getCitys'
import { Field, useFormikContext } from 'formik'
import FormikTextField from 'components/FormikTextField'
import FormikAutoComplete from 'components/FormikAutoComplete'
import Loading from 'components/Loading'

interface AddressProps {
  logradouro: string
  uf: string
  localidade: string
  bairro: string
}

interface IFormCoreProps {
  formStatus?: FormStatus
}

const DriverFormCore: React.FC<IFormCoreProps> = ({ formStatus = 'isFilling' }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext<ICompany>()

  const { enqueueSnackbar: snackbar } = useSnackbar()

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
    <>
      {loading && <Loading />}

      <Grid item lg={12} md={12} sm={12} xs={12} >
        <Field
          component={FormikTextField}
          label='Nome'
          name='name'
          disabled={formStatus === 'isViewing'}
        />
      </Grid>

      <Grid item lg={4} md={4} sm={4} xs={12} />

      <Grid item lg={12} md={12} sm={12} xs={12} >
        <Divider style={{ margin: '1rem 0' }} />
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
          disabled={formStatus === 'isViewing'}
          onBlur={async () => {
            const address = await handleGetAdress(values.address.CEP)
            setFieldValue('address', { ...values.address, ...address })
          }}
        />
      </Grid>

      <Grid item lg={10} md={10} sm={8} xs={12} >
        <Field
          component={FormikTextField}
          label='Logradouro'
          name='address.street'
          disabled={formStatus === 'isViewing'}
        />
      </Grid>

      <Grid item lg={2} md={2} sm={4} xs={12} >
        <Field
          component={FormikTextField}
          label='Número'
          name='address.number'
          type='number'
          inputProps={{ min: 0 }}
          disabled={formStatus === 'isViewing'}
        />
      </Grid>

      <Grid item lg={10} md={10} sm={8} xs={12} >
        <Field
          component={FormikTextField}
          label='Bairro'
          name='address.neighborhood'
          disabled={formStatus === 'isViewing'}
        />
      </Grid>

      <Grid item lg={2} md={2} sm={4} xs={12} >
        <FormikAutoComplete
          name="address.state"
          options={states}
          error={errors.address?.state}
          touched={touched.address?.state}
          label='UF'
          getOptionLabel={option => option}
          disabled={formStatus === 'isViewing'}
        />
      </Grid>

      <Grid item lg={5} md={5} sm={4} xs={12} >
        <FormikAutoComplete
          name="address.city"
          options={citys}
          error={errors.address?.city}
          touched={touched.address?.city}
          label='Cidade'
          getOptionLabel={option => option}
          disabled={formStatus === 'isViewing'}
        />
      </Grid>

      <Grid item lg={5} md={5} sm={4} xs={12} >
        <Field
          component={FormikTextField}
          label='Complemento'
          name='address.complement'
          disabled={formStatus === 'isViewing'}
        />
      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12} >
        <Divider style={{ margin: '1rem 0' }} />
      </Grid>
    </>
  )
}

export default DriverFormCore