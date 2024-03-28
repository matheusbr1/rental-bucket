import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import { useSnackbar } from 'notistack'
import { IAddress, IContact, PersonType } from 'interfaces'
import { createCustomer } from 'store/customer/customer.actions'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import { Grid, Typography } from '@material-ui/core'
import usePrivateApi from 'hooks/usePrivateApi'
import { removeMask } from 'utils/formatters'
import { FormContainer } from 'components/layout/FormContainer'
import { CustomerCoreForm } from './components/FormCore'
import { CustomerFormFooter } from './components/FormFooter'

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
      const { data: customer } = await api.post('customers', {
        ...fields,
        CPF_CNPJ: removeMask(fields.CPF_CNPJ)
      })

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
          CEP: removeMask(address.CEP),
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
    <FormContainer>
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

              <CustomerFormFooter
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