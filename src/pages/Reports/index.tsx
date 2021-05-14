import { MenuItem } from '@material-ui/core'
import React, { useCallback, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar from 'components/AppBar'
import DateInput from 'components/DateInput'
import FloatingButton from 'components/FloatingButton'
import TextField from 'components/TextField'
import { clients, drivers, equipments, reports, services } from 'mocks'
import * as yup from 'yup'

import { Container, Content } from './styles'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useSnackbar } from 'notistack'
import getValidationErrors from 'utils/getValidationFormErrors'
import Title from 'components/Title'
import { useData } from 'hooks/data'

const Reports: React.FC = () => {

  const formRef = useRef<FormHandles>(null)

  const { goBack } = useHistory()

  const { trucks } = useData()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const [initialDate, setInitialDate] = useState<Date | null>(new Date())

  const handleInitialDate = (date: Date | null) => {
    setInitialDate(date)
  }
  const [finalDate, setFinalDate] = useState<Date | null>(new Date())

  const handleFinalDate = (date: Date | null) => {
    setFinalDate(date)
  }

  const [variableFieldsValue, setVariableFieldsValue] = useState({
    client: '',
    driver: '',
    equipment: '',
    truck: '',
    service: '',
  })

  const handleVariableFieldsValue = useCallback((path: string, value) => {
    setVariableFieldsValue(oldValue => ({
      ...oldValue,
      [path]: value
    }))
  }, [])

  const [fields]: any = useState({
    clients: (
      <TextField  
        select
        name='client' 
        label='Cliente'
        variant="outlined" 
        value={variableFieldsValue.client}
        onChange={e => handleVariableFieldsValue('client', e.target.value)}
      >
        {clients.map((client, index) => (
          <MenuItem key={index} value={client.name} >{client.name}</MenuItem>
        ))}
      </TextField>
    ),
    drivers: (
      <TextField
        select
        name='driver' 
        label='Motorista'
        variant="outlined"
        value={variableFieldsValue.driver}
        onChange={e => handleVariableFieldsValue('driver', e.target.value)}
      >
        {drivers.map((driver, index) => (
          <MenuItem key={index} value={driver.name}> {driver.name} </MenuItem>
        ))}
      </TextField>
    ),
    equipments: (
      <TextField 
        select 
        name='equipment' 
        label='Equipamento'
        variant="outlined"
        value={variableFieldsValue.equipment}
        onChange={e => handleVariableFieldsValue('equipment', e.target.value)}
      >
        {equipments.map((equipment, index) => (
          <MenuItem key={index} value={equipment}> {equipment} </MenuItem>
        ))}
      </TextField>
    ),
    trucks: (
      <TextField 
        select
        name='truck' 
        label='Caminhão'
        variant="outlined"
        value={variableFieldsValue.truck}
        onChange={e => handleVariableFieldsValue('truck', e.target.value)}
      >
        {trucks.map((truck, index) => (
          <MenuItem key={index} value={truck.plate}> {truck.plate} </MenuItem>
        ))}
      </TextField>
    ),
    services: (
      <TextField 
        select 
        name='service' 
        label='Serviço'
        variant="outlined"
        value={variableFieldsValue.service}
        onChange={e => handleVariableFieldsValue('service', e.target.value)}
      >
        {services.map((service, index) => (
          <MenuItem  key={index} value={service}> {service} </MenuItem>
        ))}
      </TextField>
    )
  })

  const [type, setType] = useState('')

  const handleType = useCallback((e) => {
    setType(e.target.value)
  }, [])
  
  const handleNewReport = useCallback(async (fields) => {

    const data = {
      ...fields,
      type,
      initialDate,
      finalDate
    }
    
    console.log('data', data)

    setLoading(true)

    try {
      
      formRef.current?.setErrors({})

      const schema = yup.object().shape({
        type: yup.string().required('Campo Obrigatório'),
        
        initialDate: yup.date()
          .required('Campo Obrigatório')
          .typeError('Campo Obrigatório'),
        
        finalDate: yup.date()
          .required('Campo Obrigatório')
          .typeError('Campo Obrigatório'),
        
        client: yup.string(),
        truck: yup.string(),
        equipments: yup.string(),
        drivers: yup.string()
      })

      await schema.validate(data, {
        abortEarly: false
      })

      // Gerar relatório

    } catch (error) {
      if(error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        console.log(errors)
      } else {
        enqueueSnackbar('Erro ao gerar relatório, tente novamente!', {
          variant: 'error'
        })
      }
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar, initialDate, finalDate, type])

  return (
    <Container>
      <AppBar search={false} />

      <Content>

        <Title text='Relatórios' size='big' />

        <Form ref={formRef} onSubmit={handleNewReport} >
          <TextField 
            select
            name='type' 
            label='Filtrar por'
            variant="outlined" 
            value={type}
            onChange={handleType}
          >
            {reports.map(report => (
              <MenuItem value={report} key={report} >{ report }</MenuItem>
            ))}
          </TextField>

          <DateInput 
            onChange={handleInitialDate} 
            value={initialDate} 
            label='Data inicial'
            name='initialDate'
          />

          <DateInput 
            onChange={handleFinalDate} 
            value={finalDate} 
            label='Data final'
            name='finalDate'
          />

          {fields[type]}

           <div className='floating-buttons'>
            <FloatingButton variant='confirm' type='submit' loading={loading} />
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