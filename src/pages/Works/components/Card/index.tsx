import { MenuItem } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as yup from 'yup'
import DateInput from 'components/DateInput'
import FloatingButton from 'components/FloatingButton'
import TextField from 'components/TextField'
import { customers, equipments, workTypes, trucks } from 'mocks'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import getValidationErrors from 'utils/getValidationFormErrors'
import Title from 'components/Title'
import { useData } from 'hooks/useData'
import { IWork } from 'interfaces'
import { servicesSchema } from 'validations/servicesSchema'

import { Container, Footer } from './styles'

interface CardProps {
  type: 'create' | 'update'
  onConfirm(fields: IWork): void
  onDelete?(): void
  loading: boolean
}

const Card: React.FC<CardProps> = ({ type, loading, onConfirm, onDelete = () => {} }) => {

  const formRef = useRef<FormHandles>(null)

  const { appData } = useData()

  const { works, drivers } = appData

  const { goBack } = useHistory()

  const path: { id: string } = useParams()

  const [isChanging, setIsChanging] = useState(false)

  const disabled = useMemo(() => type === 'update' && !isChanging, [type, isChanging])

  const [work, setWork] = useState({
    id: 0,
    customer: '',
    address: '',
    driver: '',
    truck: '',
    equipment: '',
    work: '',
    quantity: 1,
    endDate: new Date()
  } as IWork)

  useEffect(() => {
    if (type !== 'update') {
      return
    }

    const id = Number(path.id)

    const filtered = works.filter(work => work.id === id)[0]

    if (!filtered) {
      console.log('404 - Not found')
      return
    }

    setWork(filtered)
  }, [type, path, works])

  const handleChangeWork = useCallback((path: string, value) => {
    setWork(oldState => ({
      ...oldState,
      [path]: value
    }))
  }, [])

  const handleChange = useCallback(() => {
    setIsChanging(state => !state)
  }, [])

  const [endDate, setEndDate] = React.useState<Date | null>(new Date())

  const handleEndDate = useCallback((date) => {
    setWork(oldState => ({
      ...oldState,
      endDate: date
    }))

    setEndDate(date)
  }, []) 

  useEffect(() => {
    if (!loading) {
      setIsChanging(false)
    }
  }, [loading])

  const handleFormSubmit = useCallback(async () => {

    try {
      formRef.current?.setErrors({})

      await servicesSchema.validate(work, {
        abortEarly: false
      })  

      if (type === 'update') {
        onConfirm(work)
      } else {
        onConfirm({
          ...work,
          id: works.length + 1
        })
      }

    } catch (error) {
      if(error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        console.log(errors)
      }
    }
  }, [work, onConfirm, works, type])

  return (
    <Container>

      <Title 
        text={
          type === 'create'  
            ?  'Novo Serviço' 
            : `Serviço: ${work.work} - ${work.customer}`
        } 
        size='large'
      />

      <Form ref={formRef} onSubmit={handleFormSubmit} >
        <TextField 
          select
          name='customer' 
          label='Cliente'
          variant="outlined" 
          disabled={disabled}
          value={work.customer}
          onChange={e => handleChangeWork('customer', e.target.value)}
        >
          {customers.map((customer, index) => (
            <MenuItem key={index} value={customer.name} >{customer.name}</MenuItem>
          ))}
        </TextField>

        <TextField 
          select
          name='address' 
          label='Endereço'
          variant="outlined" 
          disabled={disabled}
          value={work.address}
          onChange={e => handleChangeWork('address', e.target.value)}
        >
          {customers[0].address.map((address, index) => (
            <MenuItem key={index} value={address.CEP}>
              {address.street} - {address.number} - {address.neighborhood}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          name='driver' 
          label='Motorista'
          variant="outlined" 
          disabled={disabled}
          value={work.driver}
          onChange={e => handleChangeWork('driver', e.target.value)}
        >
          {drivers.map((driver, index) => (
            <MenuItem key={index} value={driver.name}> {driver.name} </MenuItem>
          ))}
        </TextField>

        <TextField 
          select 
          name='equipment' 
          label='Equipamento'
          variant="outlined"
          disabled={disabled}
          value={work.equipment}
          onChange={e => handleChangeWork('equipment', e.target.value)}
        >
          {equipments.map((equipment, index) => (
            <MenuItem key={index} value={equipment}> {equipment} </MenuItem>
          ))}
        </TextField>

        <TextField 
          select
          name='truck' 
          label='Caminhão'
          variant="outlined"
          disabled={disabled}
          value={work.truck}
          onChange={e => handleChangeWork('truck', e.target.value)}
        >
          {trucks.map((truck, index) => (
            <MenuItem key={index} value={truck.plate}> {truck.plate} </MenuItem>
          ))}
        </TextField>

        <TextField 
          select 
          name='work' 
          label='Serviço'
          variant="outlined"
          disabled={disabled}
          value={work.work}
          onChange={e => handleChangeWork('work', e.target.value)}
        >
          {workTypes.map((type, index) => (
            <MenuItem key={index} value={type}> {type} </MenuItem>
          ))}
        </TextField>

        <TextField 
          size='medium'
          name='quantity' 
          label='Quantidade'
          variant="outlined"
          type='number'
          disabled={disabled}
          value={work.quantity}
          onChange={e => handleChangeWork('quantity', Number(e.target.value))}
        />

        <DateInput 
          onChange={handleEndDate} 
          value={endDate} 
          label='Data da retirada'
          name='endDate'
          disabled={disabled}
        />

        <Footer>
          <FloatingButton variant='return' onClick={goBack} />

          {
            type === 'create' ? (
              <FloatingButton variant='confirm' type='submit' loading={loading} />
            ) : isChanging ? (
                <FloatingButton variant='confirm' type='submit' loading={loading} />
              ) : (
                <div className='group' >
                  <FloatingButton variant='edit' onClick={handleChange} />
                  <FloatingButton variant='delete' onClick={onDelete} loading={loading} />
                </div>
              )
          }
        </Footer>
      </Form>
    </Container>
  )
}

export default Card