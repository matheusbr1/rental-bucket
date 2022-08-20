import React, { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory, useParams } from 'react-router'
import { Grid, Typography } from '@material-ui/core'
import usePrivateApi from 'hooks/usePrivateApi'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTruck, updateTruck } from 'store/truck/truck.actions'
import { FormStatus, IDefaultRootState, ITruck } from 'interfaces'
import { Formik, Form } from 'formik'
import Loading from 'components/Loading'
import { trucksSchema } from 'validations/trucksSchema'
import { FormContainer } from 'components/layout/FormContainer'
import { TruckFormCore } from './components/FormCore'
import { TruckFormFooter } from './components/FormFooter'

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

  const currentTruck = useSelector((state: IDefaultRootState) => state.trucks.current as ITruck)
  
  const { enqueueSnackbar: snackbar } = useSnackbar()
  
  const [loading, setLoading] = useState(false)
  
  const handleEdit = useCallback(async (fields: ITruck) => {
    try {
      setLoading(true)

      const { data: updatedTruck } = await api.put(`/trucks/${id}`, {
        plate: fields.plate,
        renavam: fields.renavam, 
        manufacture_year: fields.manufacture_year,
        model_year: fields.model_year,
        brand_id: fields.brand?.id,
        model_id: fields.model?.id,
        truck_type_id: fields.type?.id,
      })

      dispatch(updateTruck(id, updatedTruck))

      push('/trucks')

      snackbar('Caminhão editado com sucesso', {
        variant: 'success'
      })
    } catch (error) {
      snackbar('Erro ao editar o caminhão, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [api, dispatch, id, push, snackbar])

  const handleDelete = useCallback(async () => {
    try {
      setIsDeleting(true)

      await api.delete(`trucks/${id}`)

      dispatch(deleteTruck(id))

      snackbar('Caminhão deletado com sucesso!', {
        variant: 'success'
      })

      push('/trucks')
    } catch (error) {
      snackbar('Erro ao deletar caminhão, tente novamente!', {
        variant: 'error'
      })
    }
  }, [api, id, dispatch, snackbar, push])
  
  useEffect(() => {
    if (!currentTruck) {
      push('/trucks')
    }
  }, [currentTruck, push])

  return (
    <FormContainer>
      {currentTruck && (
        <Formik
          onSubmit={handleEdit}
          enableReinitialize
          validateOnChange
          validationSchema={trucksSchema}
          initialValues={currentTruck}
        >
          {({ values, isSubmitting }) => (
            <Form>
              {loading && <Loading />}

              <Grid container spacing={3} justifyContent='flex-end' >
                <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
                  <Typography variant='h1' >
                    Caminhão: {values.plate}
                  </Typography>
                </Grid>

                <TruckFormCore formStatus={formStatus} />

                <TruckFormFooter 
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