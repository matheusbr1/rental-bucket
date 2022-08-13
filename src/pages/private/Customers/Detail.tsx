import React, { useCallback, useState, useEffect } from 'react'
import { AppBar } from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { useHistory, useParams } from 'react-router'
import { IAddress, IContact, ICustomer, IDefaultRootState, PersonType, FormStatus } from 'interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import Button from 'components/Button'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import { deleteCustomer, updateCustomer } from 'store/customer/customer.actions'
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
            state: address.state?.sigla,
            city: address.city?.name,
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
    <Container maxWidth='md' style={{ marginTop: 100 }} >
      <AppBar />

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

                <CustomerCoreForm formStatus={formStatus} />

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
                          onClick={() => setFormStatus('isFilling')}
                        >
                          Editar
                        </Button>
                      )}

                      {formStatus === 'isFilling' && (
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
      )}
    </Container>
  )
}

export default Detail
