import React, { useEffect, useState } from 'react'
import { Field, useFormikContext } from 'formik'
import FormikTextField from 'components/FormikTextField'
import FormikDateInput from 'components/FormikDateInput'
import FormikAutoComplete from 'components/FormikAutoComplete'
import { Grid } from '@material-ui/core'
import usePrivateApi from 'hooks/usePrivateApi'
import { useDispatch, useSelector } from 'react-redux'
import { setDrivers } from 'store/driver/driver.actions'
import { setCustomers } from 'store/customer/customer.actions'
import { setTrucks } from 'store/truck/truck.actions'
import {
  FormStatus,
  IAddress,
  ICustomer,
  IDefaultRootState,
  IDriver,
  ITruck,
  IWork,
  IWorkType
} from 'interfaces'

import { useCompany } from 'hooks/useCompany'

interface IFormCoreProps {
  formStatus?: FormStatus
}

const WorkFormCore: React.FC<IFormCoreProps> = ({ formStatus = 'isFilling' }) => {
  const api = usePrivateApi()
  const { company } = useCompany()

  const { errors, touched, values, isSubmitting, setFieldValue } = useFormikContext<IWork>()

  const disabled = formStatus === 'isViewing' || isSubmitting

  const dispatch = useDispatch()

  const [workTypes, setWorkTypes] = useState<IWorkType[]>([])
  const [equipments, setEquipments] = useState([])

  useEffect(() => {
    api.get('/work/types').then(response => {
      const types: IWorkType[] = response.data
      setWorkTypes(types)

      if (values.work_type) return
      const insertionOption = types.find(t => t.name === 'Coloca')
      if (insertionOption) {
        setFieldValue('work_type', insertionOption)
      }
    })
  }, [api, setFieldValue, values.work_type])

  useEffect(() => {
    api.get('/truck/types/equipments').then(response => {
      const equipments = response.data
      setEquipments(equipments)

      if (values.equipment) return
      if (equipments.length === 1) {
        setFieldValue('equipment', equipments[0])
      }
    })
  }, [api, setFieldValue, values.equipment])

  useEffect(() => {
    api.get('/drivers', {
      params: {
        company_id: company?.id
      }
    }).then(response => {
      const drivers = response.data
      dispatch(setDrivers(drivers))

      if (values.driver) return
      if (drivers.length === 1) {
        setFieldValue('driver', drivers[0])
      }
    })
  }, [api, company?.id, dispatch, setFieldValue, values.driver])

  useEffect(() => {
    api.get('trucks', {
      params: {
        company_id: company?.id
      }
    }).then(response => {
      const trucks = response.data
      dispatch(setTrucks(trucks))

      if (values.truck) return
      if (trucks.length === 1) {
        setFieldValue('truck', trucks[0])
      }
    })
  }, [api, company?.id, dispatch, setFieldValue, values.truck])

  useEffect(() => {
    api.get('customers', {
      params: {
        company_id: company?.id
      }
    }).then(response => {
      const customers = response.data
      dispatch(setCustomers(customers))

      if (values.customer) return
      if (customers.length === 1) {
        setFieldValue('customer', customers[0])
      }
    })
  }, [api, company?.id, dispatch, setFieldValue, values.customer])

  const drivers = useSelector<IDefaultRootState, IDriver[]>(state => state.drivers.all)
  const trucks = useSelector<IDefaultRootState, ITruck[]>(state => state.trucks.all)
  const customers = useSelector<IDefaultRootState, ICustomer[]>(state => state.customers.all)

  return (
    <>
      <Grid item lg={4} md={6} sm={6} xs={12} >
        <FormikAutoComplete
          name="customer"
          options={customers}
          error={errors.customer as string}
          touched={!!touched.customer}
          label='Cliente'
          disabled={!!disabled}
          getOptionLabel={
            (customer: ICustomer) => (
              customer.person_type === 'F'
                ? customer.name
                : customer.fantasy_name
            ) as string
          }
        />
      </Grid>

      <Grid item lg={8} md={6} sm={6} xs={12} >
        <FormikAutoComplete
          name="address"
          disabled={!values.customer || disabled}
          options={(values.customer as null | ICustomer)?.adresses || []}
          error={errors.address as string}
          touched={!!touched.address}
          label='Endereço'
          getOptionLabel={({ CEP, street, city, state }: IAddress) => {
            return `${CEP} - ${street} - ${city} - ${state}`
          }}
        />
      </Grid>

      <Grid item lg={4} md={4} sm={6} xs={12} >
        <FormikAutoComplete
          name="driver"
          options={drivers || []}
          disabled={!!disabled}
          error={errors.driver as string}
          touched={!!touched.driver}
          label='Motorista'
          getOptionLabel={(option: IDriver) => option.name}
        />
      </Grid>

      <Grid item lg={4} md={4} sm={6} xs={12} >
        <FormikAutoComplete
          name="truck"
          options={trucks || []}
          error={errors.truck as string}
          touched={!!touched.truck}
          disabled={!!disabled}
          label='Caminhão'
          getOptionLabel={(option: ITruck) => option.plate}
        />
      </Grid>

      <Grid item lg={4} md={4} sm={6} xs={12} >
        <FormikAutoComplete
          name="equipment"
          options={equipments || []}
          error={errors.equipment as string}
          disabled={!!disabled}
          touched={!!touched.equipment}
          getOptionLabel={(option: { name: string }) => option.name}
          label='Equipamento'
        />
      </Grid>

      <Grid item lg={4} md={4} sm={6} xs={12} >
        <FormikAutoComplete
          name="work_type"
          options={workTypes || []}
          error={errors.work_type as string}
          disabled={!!disabled}
          touched={!!touched.work_type}
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
          disabled={!!disabled}
          type='number'
          inputProps={{ min: 1, max: 100 }}
        />
      </Grid>

      <Grid item lg={4} md={4} sm={6} xs={12} >
        <FormikDateInput
          label="Data da retirada"
          name="end_date"
          disabled={!!disabled}
        />
      </Grid>

      <Grid item lg={4} md={4} sm={6} xs={12} />
    </>
  )
}

export { WorkFormCore }