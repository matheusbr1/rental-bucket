import React, { useCallback, useEffect, useState } from 'react'
import { AppBar } from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { useHistory, useParams } from 'react-router'
import { IAddress, IContact, ICustomer, IDefaultRootState, PersonType, FormStatus } from 'interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import { api } from 'services/api'
import Button from 'components/Button'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import { deleteCustomer, setCurrentCustomer } from 'redux/customer/customer.actions'
import { CustomerCoreForm } from './FormCore'

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

      // Requisição

      push('/customers')

      snackbar('Cliente editado com sucesso', {
        variant: 'success'
      })
    } catch (error) {
      snackbar('Erro ao editar cliente, tente novamente!', {
        variant: 'error'
      })
    }
  }, [snackbar, push])

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
  }, [dispatch, push, id, snackbar])

  useEffect(() => {
    if (currentCustomer || isDeleting) {
      return
    }

    (async () => {
      try {
        const { data: customer } = await api.get(`/customers/${id}`)
         
        dispatch(setCurrentCustomer(customer))
      } catch (error) {
        snackbar('Erro ao buscar cliente, tente novamente!', {
          variant: 'error'
        })

        push('/customers')
      }
    })()
  }, [currentCustomer, dispatch, push, id, snackbar, isDeleting])

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