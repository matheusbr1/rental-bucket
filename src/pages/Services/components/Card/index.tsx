import { MenuItem } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import DateInput from 'components/DateInput'
import FloatingButton from 'components/FloatingButton'
import TextField from 'components/TextField'
import { clients, drivers, equipments, services, trucks } from 'mocks'
import { Form } from '@unform/web'

import { Container, Footer } from './styles'
import { FormHandles } from '@unform/core'
import getValidationErrors from 'utils/getValidationFormErrors'

interface Service {
  client: string
  adress: string
  driver: string
  truck: string
  equipment: string
  service: string
  quantity: number
  endDate: Date | null | string
}

interface CardProps {
  type: 'create' | 'update'
  onConfirm(fields: Service): void
  onDelete?(): void
  loading: boolean
}

const Card: React.FC<CardProps> = ({ type, loading, onConfirm, onDelete = () => {} }) => {

  const formRef = useRef<FormHandles>(null)

  const { goBack } = useHistory()

  const [isChanging, setIsChanging] = useState(false)

  const disabled = useMemo(() => type === 'update' && !isChanging, [type, isChanging])

  const [service, setService] = useState({
    client: '',
    adress: '',
    driver: '',
    truck: '',
    equipment: '',
    service: '',
    quantity: 1,
    endDate: new Date()
  } as Service)

  useEffect(() => {
    if (type === 'update') {
      setService({
        client: clients[0].name,
        adress: clients[0].adress[0].cep,
        driver: drivers[0].name,
        truck: trucks[0].plate,
        equipment: equipments[0],
        service: services[0],
        quantity: 2,
        endDate: new Date()
      })
    }
  }, [type])

  const handleChangeService = useCallback((path: string, value) => {
    setService(oldState => ({
      ...oldState,
      [path]: value
    }))
  }, [])

  const handleChange = useCallback(() => {
    setIsChanging(state => !state)
  }, [])

  const [endDate, setEndDate] = React.useState<Date | null>(new Date())

  const handleEndDate = useCallback((date) => {
    setService(oldState => ({
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

      const schema = yup.object().shape({
        adress: yup.string().required('Campo obrigatório'),
        client: yup.string().required('Campo obrigatório'),
        driver: yup.string().required('Campo obrigatório'),
        equipment: yup.string().required('Campo obrigatório'),
        service: yup.string().required('Campo obrigatório'),
        truck: yup.string().required('Campo obrigatório'),

        quantity: yup.number()
          .required('Campo obrigatório')
          .typeError('Campo obrigatório')
          .min(1, 'No mínimo 1 quantidade')
          .max(300, 'No máximo 300 quantidades'),
        
        endDate: yup.date()
          .required('Campo obrigatório')
          .typeError('Campo obrigatório')
      })

      await schema.validate(service, {
        abortEarly: false
      })

      onConfirm(service)

    } catch (error) {
      if(error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        console.log(errors)
      }
    }
  }, [service, onConfirm])

  return (
    <Container>
      { 
        type === 'create' 
          ? <h1>Novo Serviço</h1> 
          : <h1>Serviço #1</h1> 
      }

      <Form ref={formRef} onSubmit={handleFormSubmit} >
        <TextField 
          select
          name='client' 
          label='Cliente'
          variant="outlined" 
          disabled={disabled}
          value={service.client}
          onChange={e => handleChangeService('client', e.target.value)}
        >
          {clients.map((client, index) => (
            <MenuItem key={index} value={client.name} >{client.name}</MenuItem>
          ))}
        </TextField>

        <TextField 
          select
          name='adress' 
          label='Endereço'
          variant="outlined" 
          disabled={disabled}
          value={service.adress}
          onChange={e => handleChangeService('adress', e.target.value)}
        >
          {clients[0].adress.map((adress, index) => (
            <MenuItem key={index} value={adress.cep}>
              {adress.street} - {adress.number} - {adress.neighborhood}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          name='driver' 
          label='Motorista'
          variant="outlined" 
          disabled={disabled}
          value={service.driver}
          onChange={e => handleChangeService('driver', e.target.value)}
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
          value={service.equipment}
          onChange={e => handleChangeService('equipment', e.target.value)}
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
          value={service.truck}
          onChange={e => handleChangeService('truck', e.target.value)}
        >
          {trucks.map((truck, index) => (
            <MenuItem key={index} value={truck.plate}> {truck.plate} </MenuItem>
          ))}
        </TextField>

        <TextField 
          select 
          name='service' 
          label='Serviço'
          variant="outlined"
          disabled={disabled}
          value={service.service}
          onChange={e => handleChangeService('service', e.target.value)}
        >
          {services.map((service, index) => (
            <MenuItem key={index} value={service}> {service} </MenuItem>
          ))}
        </TextField>

        <TextField 
          size='medium'
          name='quantity' 
          label='Quantidade'
          variant="outlined"
          type='number'
          disabled={disabled}
          value={service.quantity}
          onChange={e => handleChangeService('quantity', Number(e.target.value))}
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