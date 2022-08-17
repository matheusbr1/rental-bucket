import React, { useCallback, useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router'
import { Box, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { FormStatus, IDefaultRootState, IWork } from 'interfaces'
import { useParams } from 'react-router-dom'
import { deleteWork, updateWork } from 'store/work/work.actions'
import usePrivateApi from 'hooks/usePrivateApi'
import { Form, Formik } from 'formik'
import { worksSchema } from 'validations/worksSchema'
import { WorkFormCore } from './FormCore'
import Button from 'components/Button'
import Loading from 'components/Loading'
import Moment from 'moment'
import { FormContainer } from 'components/layout/FormContainer'

interface IDetailParams {
  id: string
}

const Detail: React.FC = () => {
  const api = usePrivateApi()

  const { push } = useHistory()

  const dispatch = useDispatch()

  const [isDeleting, setIsDeleting] = useState(false)

  const [formStatus, setFormStatus] = useState<FormStatus>('isViewing')

  const { id } = useParams<IDetailParams>()

  const currentWork = useSelector((state: IDefaultRootState) => state.works.current as IWork)
  
  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)
  
  const handleEdit = useCallback(async (fields) => {
    try {
      setLoading(true)

      const { data: updatedWork } = await api.put(`/works/${id}`, {
        start_date: fields.start_date,
        end_date: fields.end_date,
        quantity: fields.quantity,
        customer_id: fields.customer.id,
        address_id: fields.address.id,
        truck_id: fields.truck.id,
        driver_id: fields.driver.id,
        work_type_id: fields.work_type.id,
        equipment_id: fields.equipment.id,
      })

      dispatch(updateWork(id, updatedWork))

      push('/works')

      snackbar('Serviço editado com sucesso', {
        variant: 'success'
      })
    } catch (error) {
      snackbar('Erro ao editar o serviço, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [api, dispatch, id, push, snackbar])

  const handleDelete = useCallback(async () => {
    try {
      setIsDeleting(true)

      await api.delete(`works/${id}`)

      dispatch(deleteWork(id))

      snackbar('Serviço deletado com sucesso!', {
        variant: 'success'
      })

      push('/works')
    } catch (error) {
      snackbar('Erro ao deletar serviço, tente novamente!', {
        variant: 'error'
      })
    }
  }, [api, id, dispatch, snackbar, push])

  useEffect(() => {
    if (!currentWork) {
      push('/works')
    }
  }, [currentWork, push])

  return (
    <FormContainer>
      {currentWork && (
        <Formik
          onSubmit={handleEdit}
          validationSchema={worksSchema}
          enableReinitialize
          validateOnChange
          initialValues={currentWork}
          >
          {({ values, isSubmitting }) => (
            <Form>
              {loading && <Loading />}

              <Grid container spacing={3} justifyContent='flex-end' >
                <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
                  <Typography variant='h1' >
                    Serviço: {values.customer.name} | {Moment(values.end_date).format('DD.MM.YYYY')}
                  </Typography>
                </Grid>

                <WorkFormCore formStatus={formStatus} />

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
    </FormContainer>
  )
}

export default Detail
