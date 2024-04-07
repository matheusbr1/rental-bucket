import React, { useCallback, useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router'
import { Grid, Typography, Modal, Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { FormStatus, IDefaultRootState, IWork, IWorkType } from 'interfaces'
import { useParams } from 'react-router-dom'
import { createWork, deleteWork, updateWork } from 'store/work/work.actions'
import usePrivateApi from 'hooks/usePrivateApi'
import { Form, Formik } from 'formik'
import { worksSchema } from 'validations/worksSchema'
import Loading from 'components/Loading'
import { FormContainer } from 'components/layout/FormContainer'
import { WorkFormCore } from './components/FormCore'
import { WorkFormFooter } from './components/FormFooter'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'
import Button from 'components/Button'
import { useData } from 'hooks/useData'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
};

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

  const { company } = useData()

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

  const handleMarkAsDone = useCallback(async () => {
    try {
      setLoading(true)

      await api.patch(`/works/complete/${id}`)

      push('/works')

      snackbar('Serviço concluído com sucesso', {
        variant: 'success'
      })
    } catch (error) {
      snackbar('Erro ao concluir o serviço, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [api, id, push, snackbar])

  const [isConvertWorkModalOpen, setIsConvertWorkModalOpen] = useState(false)

  const handleCreateNewWork = useCallback(async (fields: IWork) => {
    try {
      setLoading(true)

      const workTypes = await api.get('/work/types')
      const types: IWorkType[] = workTypes.data
      const remotionWorkType = types.find(t => t.name === 'Retira')

      const { data: work } = await api.post('works', {
        start_date: new Date(),
        end_date: fields.end_date,
        quantity: fields.quantity,
        customer_id: fields.customer.id,
        address_id: fields.address.id,
        truck_id: fields.truck.id,
        driver_id: fields.driver.id,
        work_type_id: remotionWorkType,
        equipment_id: fields.equipment.id,
        company_id: company?.id
      })

      dispatch(createWork({
        id: work.id,
        address: fields.address,
        customer: fields.customer,
        driver: fields.driver,
        end_date: fields.end_date,
        equipment: fields.equipment,
        is_done: false,
        quantity: fields.quantity,
        truck: fields.truck,
        work_type: fields.work_type
      }))

      snackbar('Serviço criado com sucesso!', {
        variant: 'success'
      })
    } catch (error) {
      snackbar('Erro ao criar um novo serviço, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(true)
    }
  }, [api, company?.id, dispatch, snackbar])

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
                    Serviço: {values.customer.name} - {values.is_done ? 'Concluído' : 'Pendente'}
                  </Typography>
                </Grid>

                <WorkFormCore formStatus={formStatus} />

                <WorkFormFooter
                  isDetailPage
                  onMarkAsDone={async () => {
                    if (values.work_type.name === 'Coloca') {
                      setIsConvertWorkModalOpen(true)
                    } else {
                      await handleMarkAsDone()
                    }
                  }}
                  isDone={values.is_done}
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

              <Modal
                open={isConvertWorkModalOpen}
                onClose={() => setIsConvertWorkModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h4" component="h1">
                    Deseja criar um novo serviço de RETIRA?
                  </Typography>

                  <Box marginTop='1rem' >
                    <Typography id="modal-modal-description" variant="h6" component="h2">
                      O serviço vai ser criado com os mesmo dados da coloca, porém, como retira, você poderá editar os dados caso deseje.
                    </Typography>
                  </Box>

                  <Box display='flex' gridGap='1rem' marginTop='1rem' >
                    <Button
                      loading={false}
                      onClick={handleMarkAsDone}
                      style={{ background: grey[600] }}
                    >
                      Não
                    </Button>
                    <Button
                      loading={loading}
                      onClick={async () => {
                        await Promise.all([
                          handleCreateNewWork(values),
                          handleMarkAsDone()
                        ])
                      }}
                      style={{ background: green[600] }}
                    >
                      Sim
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Form>
          )}
        </Formik>
      )}
    </FormContainer>
  )
}

export default Detail
