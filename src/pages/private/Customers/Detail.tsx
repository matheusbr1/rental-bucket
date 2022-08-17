import React, { useCallback, useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory, useParams } from 'react-router'
import { IAddress, IContact, ICustomer, IDefaultRootState, PersonType, FormStatus } from 'interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import { Grid, Typography } from '@material-ui/core'
import { deleteCustomer, updateCustomer } from 'store/customer/customer.actions'
import { CustomerCoreForm } from './FormCore'
import usePrivateApi from 'hooks/usePrivateApi'
import { FormContainer } from 'components/layout/FormContainer'
import { CustomerFormFooter } from './FormFooter'

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
  const api = usePrivateApi()
  
  const { push } = useHistory()

  const { id } = useParams<IDetailParams>()

  const dispatch = useDispatch()

  const currentCustomer = useSelector((state: IDefaultRootState) => state.customers.current as ICustomer)

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [isDeleting, setIsDeleting] = useState(false)

  const [formStatus, setFormStatus] = useState<FormStatus>('isViewing')

  const handleEdit = useCallback(async (fields: CustomerFields) => {
    try {
      console.log('data', fields)

      // Updating customer

      const response = await api.put(`/customers/${id}`, fields)

      // Updating or creating infos

      const contacts = [] as IContact[]

      for await (const contact of fields.contacts) {
        if (contact.id) {
          contacts.push(contact)
        } else {
          const { data: newContact } = await api.post('customers/contact', {
            contact: contact.contact,
            contact_type: contact.contact_type,
            customer_id: id
          })
  
          contacts.push(newContact)
        }
      }

      const adresses = [] as IAddress[]

      for await (const address of fields.adresses) {
         if (address.id) {
          adresses.push(address)
        } else {
          const { data: newAddress } = await api.post('customers/address', { 
            ...address,
            customer_id: id
          })
  
          adresses.push(newAddress)
        }
      }

      // Deleting infos

      const contactsToDelete = currentCustomer?.contacts.filter(a => !contacts.find(b => b.id === a.id)) // difference
      const adressesToDelete = currentCustomer?.adresses.filter(a => !adresses.find(b => b.id === a.id)) // difference
      
      for await (const contact of contactsToDelete) {
        await api.delete(`customers/contact/${contact.id}`)
      }

      for await (const address of adressesToDelete) {
        await api.delete(`customers/address/${address.id}`)
      }

      // Updating Customer into state

      const updatedCustomer = {
        ...response.data.data,
        contacts,
        adresses,
      } 

      dispatch(updateCustomer(id, updatedCustomer))

      push('/customers')

      snackbar('Cliente editado com sucesso', {
        variant: 'success'
      })
    } catch (error) {
      snackbar('Erro ao editar cliente, tente novamente!', {
        variant: 'error'
      })
    }
  }, [api, id, currentCustomer?.contacts, currentCustomer?.adresses, dispatch, push, snackbar])

  const handleDelete = useCallback(async () => {  
    try {
      setIsDeleting(true)

      await api.delete(`customers/${id}`)

      dispatch(deleteCustomer(id))

      snackbar('Cliente deletado com sucesso!', {
        variant: 'success'
      })

      push('/customers')
    } catch (error) {
      snackbar('Erro ao deletar cliente, tente novamente!', {
        variant: 'error'
      })
    }
  }, [api, id, dispatch, snackbar, push])
  
  useEffect(() => {
    if (!currentCustomer) {
      push('/customers')
    }
  }, [currentCustomer, push])

  return (
    <FormContainer>
      {currentCustomer && (
        <Formik
          onSubmit={handleEdit}
          validateOnChange
          enableReinitialize
          initialValues={currentCustomer}
        >
          {({ values, isSubmitting }) => (
            <Form aria-disabled >
              <Grid container spacing={3} >
                <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
                  <Typography variant='h1' >
                    Cliente: {values.person_type === 'F' ? values.name : values.fantasy_name}
                  </Typography>
                </Grid>

                <CustomerCoreForm 
                  formStatus={formStatus} 
                />

                <CustomerFormFooter 
                  formStatus={formStatus}
                  changeFormStatus={setFormStatus}
                  isDeleting={isDeleting}
                  isSubmitting={isSubmitting}
                  onSecondaryButtonClick={handleDelete}
                  buttonLabels={{
                    primary: 'Salvar',
                    secondary: 'Deletar'
                  }}
                />
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </FormContainer>
  )
}

export default Detail
