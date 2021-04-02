import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { useSnackbar } from 'notistack'
import { MenuItem } from '@material-ui/core'

import FloatingButton from '../../../components/FloatingButton'
import AppBar  from '../../../components/AppBar'
import TextField from '../../../components/TextField'
import { adresses, clients, drivers, equipments, services, trucks } from '../../../mocks'
import DateInput from '../../../components/DateInput'
import { Container, Content } from './styles'

const Detail: React.FC = () => {

  const { goBack } = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const [isChanging, setIsChanging] = useState(false)

  const [loading, setLoading] = useState(false)

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  const handleDelete = useCallback(() => {

    setLoading(true)

    setTimeout(() => {
      // goBack()

      enqueueSnackbar('Erro ao deletar serviço, tente novamente!', {
        variant: 'error'
      })

      setLoading(false)
    }, 2000)
  }, [enqueueSnackbar])

  const handleChange = useCallback(() => {
    setIsChanging(state => !state)
  }, [])

  return (
    <Container>
      <AppBar search={false} />

      <Content>

        <h1>Serviço #1</h1>

        <form>
          <TextField 
            disabled={!isChanging}
            name='client' 
            label='Cliente'
            variant="outlined" 
            select
            defaultValue={clients[0].name}
          >
            {clients.map((client, index) => (
              <MenuItem key={index} value={client.name} >{client.name}</MenuItem>
            ))}
          </TextField>

          <TextField 
            disabled={!isChanging}
            name='adress' 
            label='Endereço'
            variant="outlined" 
            select
            defaultValue={adresses[0].cep}
          >
            {adresses.map((adress, index) => (
              <MenuItem key={index} value={adress.cep}>
                {adress.street} - {adress.number} - {adress.neighborhood}
              </MenuItem>
            ))}
          </TextField>

          <TextField 
            disabled={!isChanging}
            name='truck' 
            label='Caminhão'
            variant="outlined"
            select
            defaultValue={trucks[0].plate}
          >
           {trucks.map((truck, index) => (
              <MenuItem key={index} value={truck.plate}> {truck.plate} </MenuItem>
            ))}
          </TextField>

          <TextField
            disabled={!isChanging}
            name='driver' 
            label='Motorista'
            variant="outlined" 
            select
            defaultValue={drivers[0].name}
          >
            {drivers.map((driver, index) => (
              <MenuItem  key={index} value={driver.name}> {driver.name} </MenuItem>
            ))}
          </TextField>

          <TextField 
            disabled={!isChanging}
            name='equipment' 
            label='Equipamento'
            variant="outlined"
            select 
            defaultValue={equipments[0]}
          >
            {equipments.map((equipment, index) => (
              <MenuItem key={index} value={equipment}> {equipment} </MenuItem>
            ))}
          </TextField>

          <TextField 
            disabled={!isChanging}
            name='service' 
            label='Serviço'
            variant="outlined"
            select 
          >
            {services.map((service, index) => (
              <MenuItem key={index} value={service}> {service} </MenuItem>
            ))}
          </TextField>

          <TextField 
            disabled={!isChanging}
            size='medium'
            name='quantity' 
            label='Quantidade'
            variant="outlined"
            type='number'
            defaultValue={2}
          />

          <DateInput 
            disabled={!isChanging}
            onChange={handleDateChange} 
            value={selectedDate} 
            label='Data da retirada'
          />

          <div className='floating-buttons'>
            {isChanging ? (
              <FloatingButton variant='confirm' onClick={handleChange} />
            ) : (
              <React.Fragment>
                <FloatingButton variant='edit' onClick={handleChange} />
                <FloatingButton variant='delete' onClick={handleDelete} loading={loading} />
              </React.Fragment>
            )}
          </div>
        </form>
      </Content>

      <div className='floating-buttons left'>
        <FloatingButton variant='return' onClick={goBack} />
      </div>
    </Container>
  )
}

export default Detail