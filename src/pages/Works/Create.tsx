import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { AppBar } from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'moment'
import { Container, Grid, Typography, } from '@material-ui/core'
import Button from 'components/Button'
import { Formik, Form, Field } from 'formik'
import { IAddress, ICustomer, IDefaultRootState, IDriver, ITruck } from 'interfaces'
import FormikTextField from 'components/FormikTextField'
import FormikDateInput from 'components/FormikDateInput'
import FormikAutoComplete from 'components/FormikAutoComplete'
import { api } from 'services/api'
import { setDrivers } from 'redux/driver/driver.actions'
import { setTrucks } from 'redux/truck/truck.actions'
import { setCustomers } from 'redux/customer/customer.actions'
import { createWork } from 'redux/work/work.actions'

const Create: React.FC = () => {
  const { goBack } = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const dispatch  = useDispatch()

  const [workTypes, setWorkTypes] = useState()
  const [equipments, setEquipments] = useState()

  useEffect(() => {
    api.get('/work/types').then(response => setWorkTypes(response.data))
  }, [])

  useEffect(() => {
    api.get('/truck/types/equipments').then(response => setEquipments(response.data))
  }, [])

  useEffect(() => {
    api.get('/drivers').then(response => dispatch(setDrivers(response.data)))
  }, [dispatch])
  
  useEffect(() => {
    api.get('/drivers').then(response =>dispatch(setDrivers(response.data)))
  }, [dispatch])

  useEffect(() => {
    api.get('trucks').then(response => dispatch(setTrucks(response.data)))
  }, [dispatch])

  useEffect(() => {
    api.get('customers').then(response => dispatch(setCustomers(response.data)))
  }, [dispatch])

  const drivers = useSelector<IDefaultRootState, IDriver[]>(state => state.drivers.all)
  const trucks = useSelector<IDefaultRootState, ITruck[]>(state => state.trucks.all)
  const customers = useSelector<IDefaultRootState, ICustomer[]>(state => state.customers.all)

  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback(async (fields) => {
    setLoading(true)

    try { 
      const { data: work } = await api.post('works', {
        customer_id: fields.customer.id,
        driver_id: fields.driver.id,
        truck_id: fields.truck.id,
        equipment_id: fields.equipment.id,
        quantity: fields.quantity,
        work_type_id: fields.work_type.id,
        end_date: fields.end_date
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
          enableReinitialize
          validateOnChange
          initialValues={{
            customer: null,
            address: null,
            driver: null,
            truck: null,
            equipment: null,
            type: null,
            quantity: null,
            end_date: Moment(new Date()).add(7, 'days').toDate()
          }}
        >
          {({ values, errors, touched }) => (
            <Form>
              <Grid container spacing={3} justifyContent='flex-end' >
                <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
                  <Typography variant='h1' >
                    Novo serviço
                  </Typography>
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={12} >
                  <FormikAutoComplete 
                    name="customer"
                    options={customers}
                    error={errors.customer}
                    touched={touched.customer}
                    label='Cliente'
                    getOptionLabel={
                      (customer: ICustomer) => (
                        customer.person_type === 'F'
                        ? customer.name
                        : customer.fantasy_name
                      ) as string
                    }
                  />
                </Grid>

                <Grid item lg={8} md={8} sm={8} xs={12} >
                  <FormikAutoComplete 
                    name="address"
                    disabled={!values.customer}
                    options={(values.customer as null | ICustomer)?.adresses}
                    error={errors.address}
                    touched={touched.address}
                    label='Endereço'
                    getOptionLabel={({ CEP, street, city, state }: IAddress) => {
                      return `${CEP} - ${street} - ${city} - ${state}`
                    }}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={12} >
                  <FormikAutoComplete 
                    name="driver"
                    options={drivers}
                    error={errors.driver}
                    touched={touched.driver}
                    label='Motorista'
                    getOptionLabel={(option: IDriver) => option.name}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={12} >
                  <FormikAutoComplete 
                    name="truck"
                    options={trucks}
                    error={errors.truck}
                    touched={touched.truck}
                    label='Caminhão'
                    getOptionLabel={(option: ITruck) => option.plate}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={12} >
                  <FormikAutoComplete 
                    name="equipment"
                    options={equipments}
                    error={errors.equipment}
                    touched={touched.equipment}
                    getOptionLabel={(option: { name: string }) => option.name}
                    label='Equipamento'
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={12} >
                  <FormikAutoComplete 
                    name="type"
                    options={workTypes}
                    error={errors.type}
                    touched={touched.type}
                    label='Serviço'
                    getOptionLabel={(option: { name: string }) => option.name}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={12} >
                  <Field
                    component={FormikTextField}
                    label='Quantidade'
                    id='quantity'
                    name='quantity'
                    type='number'
                    inputProps={{ min: 1, max: 100 }}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={12} >
                  <FormikDateInput label="Data da retirada" name="end_date" />
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={12} />

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