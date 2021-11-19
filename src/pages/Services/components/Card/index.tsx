import { MenuItem } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as yup from 'yup'
import DateInput from 'components/DateInput'
import FloatingButton from 'components/FloatingButton'
import TextField from 'components/TextField'
import { clients, drivers, equipments, services as serviceTypes, trucks } from 'mocks'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import getValidationErrors from 'utils/getValidationFormErrors'
import Title from 'components/Title'
import { useData } from 'hooks/data'
import { IService } from 'interfaces'

import { Container, Footer } from './styles'
import { servicesSchema } from 'validations/servicesSchema'

interface CardProps {
  type: 'create' | 'update'
  onConfirm(fields: IService): void
  onDelete?(): void
  loading: boolean
}

const Card: React.FC<CardProps> = ({ type, loading, onConfirm, onDelete = () => {} }) => {

  const formRef = useRef<FormHandles>(null)

  const { services } = useData()

  const { goBack } = useHistory()

  const path: { id: string } = useParams()

  const [isChanging, setIsChanging] = useState(false)

  const disabled = useMemo(() => type === 'update' && !isChanging, [type, isChanging])

  const [service, setService] = useState({
    id: 0,
    client: '',
    adress: '',
    driver: '',
    truck: '',
    equipment: '',
    service: '',
    quantity: 1,
    endDate: new Date()
  } as IService)

  useEffect(() => {
    if (type !== 'update') {
      return
    }

    const id = Number(path.id)

    const filtered = services.filter(service => service.id === id)[0]

    if (!filtered) {
      console.log('404 - Not found')
      return
    }

    setService(filtered)
  }, [type, path, services])

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

      await servicesSchema.validate(service, {
        abortEarly: false
      })  

      if (type === 'update') {
        onConfirm(service)
      } else {
        onConfirm({
          ...service,
          id: services.length + 1
        })
      }

    } catch (error) {
      if(error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        console.log(errors)
      }
    }
  }, [service, onConfirm, services, type])

  return (
    <Container>

      <Title 
        text={
          type === 'create'  
            ?  'Novo Serviço' 
            : `Serviço: ${service.service} - ${service.client}`
        } 
        size='big'
      />

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
          {serviceTypes.map((type, index) => (
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