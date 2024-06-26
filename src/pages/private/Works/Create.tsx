import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import Moment from 'moment'
import { Grid, Typography, } from '@material-ui/core'
import { Formik, Form } from 'formik'
import usePrivateApi from 'hooks/usePrivateApi'
import { createWork } from 'store/work/work.actions'
import { worksSchema } from 'validations/worksSchema'
import { FormContainer } from 'components/layout/FormContainer'
import { WorkFormCore } from './components/FormCore'
import { WorkFormFooter } from './components/FormFooter'
import Loading from 'components/Loading'
import { useCompany } from 'hooks/useCompany'

const Create: React.FC = () => {
  const api = usePrivateApi()

  const { company } = useCompany()

  const { goBack } = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback(async (fields) => {
    setLoading(true)

    try {
      const { data: work } = await api.post('works', {
        start_date: new Date(),
        end_date: fields.end_date,
        quantity: fields.quantity,
        customer_id: fields.customer.id,
        address_id: fields.address.id,
        truck_id: fields.truck.id,
        driver_id: fields.driver.id,
        work_type_id: fields.work_type.id,
        equipment_id: fields.equipment.id,
        company_id: company?.id
      })

      dispatch(createWork({
        id: work.id,
        ...fields
      }))

      enqueueSnackbar('Serviço criado com sucesso!', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      console.log(error)

      enqueueSnackbar('Erro ao criar serviço, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [api, company?.id, dispatch, enqueueSnackbar, goBack])

  return (
    <FormContainer>
      <Formik
        onSubmit={handleCreate}
        validationSchema={worksSchema}
        enableReinitialize
        validateOnChange
        initialValues={{
          customer: null,
          address: null,
          driver: null,
          truck: null,
          equipment: null,
          work_type: null,
          quantity: 1,
          end_date: Moment(new Date()).add(7, 'days').toDate()
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {loading && <Loading />}

            <Grid container spacing={3} justifyContent='flex-end' >
              <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
                <Typography variant='h1' >
                  Novo serviço
                </Typography>
              </Grid>

              <WorkFormCore />

              <WorkFormFooter
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