import { MenuItem } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import DateInput from 'components/DateInput'
import FloatingButton from 'components/FloatingButton'
import TextField from 'components/TextField'
import { clients, drivers, equipments, services, trucks } from 'mocks'
import { Form } from '@unform/web'

import { Container, Footer } from './styles'
import { FormHandles } from '@unform/core'

interface Fields {
  [key: string]: string | number | Date
}

interface CardProps {
  type: 'create' | 'update'
  onFormSubmit(fields: Fields): void
  onDelete?(): void
  loading: boolean
}

const Card: React.FC<CardProps> = ({ type, loading, onFormSubmit, onDelete = () => {} }) => {

  const formRef = useRef<FormHandles>(null)

  const { goBack } = useHistory()

  const [isChanging, setIsChanging] = useState(false)

  const handleChange = useCallback(() => {
    setIsChanging(state => !state)
  }, [])

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    if (!loading) {
      setIsChanging(false)
    }
  }, [loading])

  const disabled = useMemo(() => type === 'update' && !isChanging, [type, isChanging])

  return (
    <Container>
      { 
        type === 'create' 
          ? <h1>Novo Serviço</h1> 
          : <h1>Serviço #1</h1> 
      }

      <Form ref={formRef} onSubmit={onFormSubmit} >
        <TextField 
          name='client' 
          label='Cliente'
          variant="outlined" 
          select
          disabled={disabled}
          defaultValue={type === 'update' ? clients[0].name : null}
        >
          {clients.map((client, index) => (
            <MenuItem key={index} value={client.name} >{client.name}</MenuItem>
          ))}
        </TextField>

        <TextField 
          name='adress' 
          label='Endereço'
          variant="outlined" 
          select
          disabled={disabled}
          defaultValue={type === 'update' ? clients[0].adress[0].cep : null}
        >
          {clients[0].adress.map((adress, index) => (
            <MenuItem key={index} value={adress.cep}>
              {adress.street} - {adress.number} - {adress.neighborhood}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name='driver' 
          label='Motorista'
          variant="outlined" 
          select
          disabled={disabled}
          defaultValue={type === 'update' ? drivers[0].name : null}
        >
          {drivers.map((driver, index) => (
            <MenuItem key={index} value={driver.name}> {driver.name} </MenuItem>
          ))}
        </TextField>

        <TextField 
          name='equipment' 
          label='Equipamento'
          variant="outlined"
          select 
          disabled={disabled}
          defaultValue={type === 'update' ? equipments[0] : null}
        >
          {equipments.map((equipment, index) => (
            <MenuItem key={index} value={equipment}> {equipment} </MenuItem>
          ))}
        </TextField>

        <TextField 
          name='truck' 
          label='Caminhão'
          variant="outlined"
          select
          disabled={disabled}
          defaultValue={type === 'update' ? trucks[0].plate : null}
        >
          {trucks.map((truck, index) => (
            <MenuItem key={index} value={truck.plate}> {truck.plate} </MenuItem>
          ))}
        </TextField>

        <TextField 
          name='service' 
          label='Serviço'
          variant="outlined"
          select 
          disabled={disabled}
          defaultValue={type === 'update' ? services[0] : null}
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
          defaultValue={type === 'update' ? 2 : null}
        />

        <DateInput 
          onChange={handleDateChange} 
          value={selectedDate} 
          label='Data da retirada'
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