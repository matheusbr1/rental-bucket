import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { AppBar } from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import Moment from 'moment'
import { Container, Grid, Typography, } from '@material-ui/core'
import Button from 'components/Button'
import { Formik, Form } from 'formik'
import { api } from 'services/api'
import { createWork } from 'redux/work/work.actions'
import { WorkFormCore } from './FormCore'
import { worksSchema } from 'validations/worksSchema'

const Create: React.FC = () => {
  const { goBack } = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const dispatch  = useDispatch()

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
  }, [goBack, enqueueSnackbar, dispatch])

  return (
    <>
      <AppBar />

      <Container maxWidth='md' style={{ marginTop: 100 }} >
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
            quantity: null,
            end_date: Moment(new Date()).add(7, 'days').toDate()
          }}
        >
          {() => (
            <Form>
              <Grid container spacing={3} justifyContent='flex-end' >
                <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
                  <Typography variant='h1' >
                    Novo serviço
                  </Typography>
                </Grid>

                <WorkFormCore />

                <Grid item lg={4} md={4} sm={6} xs={12} >
                  <Button loading={loading} color='primary' type='submit' >
                    Criar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  )
}

export default Create