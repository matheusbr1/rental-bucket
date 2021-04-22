import { MenuItem } from '@material-ui/core'
import React, { useCallback, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar from 'components/AppBar'
import DateInput from 'components/DateInput'
import FloatingButton from 'components/FloatingButton'
import TextField from 'components/TextField'
import { clients, drivers, equipments, services, trucks } from 'mocks'

import { Container, Content } from './styles'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

const Reports: React.FC = () => {

  const formRef = useRef<FormHandles>(null)

  const { goBack } = useHistory()

  const handleNewReport = useCallback((fields) => {

    console.log('fields', fields)

    goBack()
  }, [goBack])


  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  const [fields]: any = useState({
    clients: (
      <TextField  
        name='client' 
        label='Cliente'
        variant="outlined" 
        
        helperText="Campo obrigatório"
        error

        select
      >
        {clients.map((client, index) => (
          <MenuItem key={index} value={client.name} >{client.name}</MenuItem>
        ))}
      </TextField>
    ),
    drivers: (
      <TextField
        name='driver' 
        label='Motorista'
        variant="outlined" 
        select
      >
        {drivers.map((driver, index) => (
          <MenuItem key={index} value={driver.name}> {driver.name} </MenuItem>
        ))}
      </TextField>
    ),
    equipments: (
      <TextField 
        name='equipment' 
        label='Equipamento'
        variant="outlined"
        select 
      >
        {equipments.map((equipment, index) => (
          <MenuItem key={index} value={equipment}> {equipment} </MenuItem>
        ))}
      </TextField>
    ),
    trucks: (
      <TextField 
        name='truck' 
        label='Caminhão'
        variant="outlined"
        select
      >
        {trucks.map((truck, index) => (
          <MenuItem key={index} value={truck.plate}> {truck.plate} </MenuItem>
        ))}
      </TextField>
    ),
    services: (
      <TextField 
        name='service' 
        label='Serviço'
        variant="outlined"
        select 
      >
        {services.map((service, index) => (
          <MenuItem  key={index} value={service}> {service} </MenuItem>
        ))}
      </TextField>
    )
  })

  const [type, setType] = useState('')

  const handleFieldSelected = useCallback((e) => {
    setType(e.target.value)
  } ,[])

  return (
    <Container>
      <AppBar search={false} />

      <Content>

        <h1>Relatórios</h1>

        <Form ref={formRef} onSubmit={handleNewReport} >
          <TextField 
            name='type' 
            label='Filtrar por'
            variant="outlined" 
            onChange={handleFieldSelected}
            select
          >
            <MenuItem value='clients' >Clientes</MenuItem>
            <MenuItem value='trucks' >Caminhões</MenuItem>
            <MenuItem value='equipments' >Equipamentos</MenuItem>
            <MenuItem value='drivers' >Motoristas</MenuItem>
          </TextField>


          <DateInput 
            onChange={handleDateChange} 
            value={selectedDate} 
            label='Data inicial'
          />

          <DateInput 
            onChange={handleDateChange} 
            value={selectedDate} 
            label='Data final'
          />

          {fields[type]}

           <div className='floating-buttons'>
            <FloatingButton variant='confirm' type='submit' />
          </div>
        </Form>
      </Content>
      
      <div className='floating-buttons left'>
        <FloatingButton variant='return' onClick={goBack} />
      </div>
    </Container>
  )
}

export default Reports