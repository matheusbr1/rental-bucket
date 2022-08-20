import React, { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router'
import { Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { FormStatus, IContact, IDefaultRootState, IDriver } from 'interfaces'
import { Formik, Form } from 'formik'
import Loading from 'components/Loading'
import { useParams } from 'react-router-dom'
import { deleteDriver, updateDriver } from 'store/driver/driver.actions'
import { removeMask } from 'utils/formatters'
import usePrivateApi from 'hooks/usePrivateApi'
import { FormContainer } from 'components/layout/FormContainer'
import DriverFormCore from './components/FormCore'
import { DriverFormFooter } from './components/FormFooter'

interface IDetailParams {
  id: string
}

const Detail: React.FC = () => {
  const api = usePrivateApi()

  const { push } = useHistory()

  const { id } = useParams<IDetailParams>()

  const dispatch = useDispatch()

  const currentDriver = useSelector((state: IDefaultRootState) => state.drivers.current as IDriver)

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [isDeleting, setIsDeleting] = useState(false)

  const [formStatus, setFormStatus] = useState<FormStatus>('isViewing')

  const [loading, setLoading] = useState(false)

  const handleEdit = useCallback(async (fields: IDriver) => {
    try {
      console.log('Data', fields)

      setLoading(true)

       // Updating customer

       const response = await api.put(`/drivers/${id}`, {
        name: fields.name,
        CPF: removeMask(fields.CPF),
        RG: removeMask(fields.RG),
        CNH: removeMask(fields.CNH),
        birthday: fields.birthday
       })

       // Updating or creating contact

      const contacts = [] as IContact[]

      for await (const contact of fields.contacts) {
        if (contact.id) {
          contacts.push(contact)
        } else {
          const { data: newContact } = await api.post('drivers/contact', {
            contact: contact.contact,
            contact_type: contact.contact_type,
            driver_id: id
          })
  
          contacts.push(newContact)
        }
      }

       // Deleting contacts

       const contactsToDelete = currentDriver?.contacts.filter(a => !contacts.find(b => b.id === a.id)) // difference
      
       for await (const contact of contactsToDelete) {
         await api.delete(`drivers/contact/${contact.id}`)
       }

      // Deleting address

      await api.delete(`drivers/address/${fields.address?.id}`)

      // Updating or creating address

      const { data: newAddress } = await api.post('drivers/address', { 
        ...fields.address,
        driver_id: id
      })

      // Updating drivers into state
      
      const updatedDriver = {
        ...response.data.data,
        contacts,
        address: newAddress,
      } 

      dispatch(updateDriver(id, updatedDriver))

      push('/drivers')

      snackbar('Motorista editado com sucesso', {
        variant: 'success'
      })
    } catch (error) {
      console.log(error)

      snackbar('Erro ao editar motorista, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }

  }, [api, currentDriver?.contacts, dispatch, id, push, snackbar])

  const handleDelete = useCallback(async () => {
    try {
      setIsDeleting(true)

      await api.delete(`/drivers/${id}`)

      dispatch(deleteDriver(id))

      snackbar('Motorista deletado com sucesso!', {
        variant: 'success'
      })

      push('/drivers')
    } catch (error) {
      snackbar('Erro ao deletar motorista, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setIsDeleting(false)
    }
  }, [api, id, dispatch, snackbar, push])

  useEffect(() => {
    if (!currentDriver) {
      push('/drivers')
    }
  }, [currentDriver, push])

  return (
    <FormContainer>
      {currentDriver && (
        <Formik
          onSubmit={handleEdit}
          enableReinitialize
          validateOnChange
          initialValues={currentDriver}
        >
          {({ values, isSubmitting }) => (
            <Form>
              {loading && <Loading />}

              <Grid container spacing={3} justifyContent='flex-end' >
                <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }} >
                  <Typography variant='h1' >
                    Motorista: {values.name}
                  </Typography>
                </Grid>

                <DriverFormCore formStatus={formStatus} />

                <DriverFormFooter 
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