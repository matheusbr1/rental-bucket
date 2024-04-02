import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { IContact, IDriver } from 'interfaces'
import { createDriver } from 'store/driver/driver.actions'
import { Formik, Form } from 'formik'
import Loading from 'components/Loading'
import { Grid, Typography } from '@material-ui/core'
import { driverSchema } from 'validations/driverSchema'
import { removeMask } from 'utils/formatters'
import usePrivateApi from 'hooks/usePrivateApi'
import { FormContainer } from 'components/layout/FormContainer'
import DriverFormCore from './components/FormCore'
import { DriverFormFooter } from './components/FormFooter'
import { useData } from 'hooks/useData'

const Create: React.FC = () => {
  const api = usePrivateApi()

  const { company } = useData()

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
        birthday: fields.birthday,
        company_id: company.id
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
        CEP: removeMask(fields.address.CEP),
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
  }, [api, company.id, dispatch, snackbar, goBack])

  return (
    <FormContainer>
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
        {({ isSubmitting }) => (
          <Form>
            {loading && <Loading />}

            <Grid container spacing={3} justifyContent='flex-end' >
              <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }} >
                <Typography variant='h1' >
                  Novo Motorista
                </Typography>
              </Grid>

              <DriverFormCore />

              <DriverFormFooter
                formStatus='isFilling'
                isSubmitting={isSubmitting}
                onSecondaryButtonClick={goBack}
                buttonLabels={{
                  primary: 'Criar',
                  secondary: 'Cancelar'
                }}
              />
            </Grid>
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}

export default Create