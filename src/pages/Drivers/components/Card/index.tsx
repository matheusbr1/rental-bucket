import { MenuItem } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { Scope } from '@unform/core'
import { useHistory } from 'react-router'
import DateInput from 'components/DateInput'
import FloatingButton from 'components/FloatingButton'
import TextField from 'components/TextField'
import axios from 'axios'
import { FormHandles } from '@unform/core'
import getValidationErrors from 'utils/getValidationFormErrors'
import Title from 'components/Title'
import MaskedField from 'components/TextField/masked'
import { useData } from 'hooks/data'
import { IDriver } from 'interfaces'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { driverSchema } from 'validations/driverSchema'

import { Container, Divider } from './styles'

interface IState {
  id: number
  sigla: string
  nome: string
}

interface ICity {
  id: number
  nome: string
}

interface AddressProps {
  logradouro: string 
  uf: string 
  localidade: string  
  bairro: string 
}

interface CardProps {
  type: 'create' | 'update'
  onConfirm(fields: IDriver): void
  onDelete?(): void
  loading: boolean
}

const Card: React.FC<CardProps> = ({ type, loading, onConfirm, onDelete = () => {} }) => {
  
  const formRef = useRef<FormHandles>(null)

  const { goBack } = useHistory()

  const { drivers } = useData()

  const path: { id: string } = useParams()

  const [birthday, setBirthday] = React.useState<Date | null>(new Date())

  const [states, setStates] = useState([])
  const [citys, setCitys] = useState([])

  const [street, setStreet] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [number, setNumber] = useState(0)

  useEffect(() => {
    if (type !== 'update') {
      return
    }

    const id = Number(path.id)

    const filtered = drivers.filter(driver => driver.id === id)[0]

    if (!filtered) {
      console.log('404 - Not found')
      return
    }

    const { street, state, city, neighborhood, number } = filtered.address

    setStreet(street)
    setState(state)
    setCity(city)
    setNeighborhood(neighborhood)
    setNumber(Number(number))

    formRef.current?.setData(filtered)
  }, [type, path, drivers])

  // Getting States
   useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {

      if (!response.data) {
        return 
      }

      const states = response.data.map((state: IState) => state.sigla)

      setStates(states)
    })
  }, [])

  // Getting Citys
  useEffect(() => {
    if (!state) {
      return
    }

    axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
      .then(response => {
      if (!response.data) {
        return 
      }

      const citys = response.data.map((city: ICity) => city.nome)

      setCitys(citys)
    })
  }, [state])
  
  const handleGetAddress = useCallback(e => {

    const cep = e.target.value

    axios
      .get(`https://viacep.com.br/ws/${cep}/json`)
      .then(response => {

      if (!response.data) {
        return
      }
      
      formRef.current?.setFieldError('address.CEP', response.data?.erro ? 'CEP inválido' : '')

      const { logradouro, uf, localidade, bairro }: AddressProps = response.data

      setStreet(logradouro)
      setState(uf)
      setCity(localidade)
      setNeighborhood(bairro)
      console.log(response.data)
    })
  },[])

  const handleBirhday = (date: Date | null) => {
    setBirthday(date)
  }

  const [isChanging, setIsChanging] = useState(false)

  const disabled = useMemo(() => type === 'update' && !isChanging, [type, isChanging])

  const handleChange = useCallback(() => {
    setIsChanging(state => !state)
  }, [])

  useEffect(() => {
    if (!loading) {
      setIsChanging(false)
    }
  }, [loading])

  const handleFormSubmit = useCallback(async (fields: IDriver) => {

    const data = {
      ...fields, 
      birthday,
      address: {
        ...fields.address,
        state, 
        city
      }
    }

    console.log(data)

    try {

      formRef.current?.setErrors({})

      await driverSchema.validate(data, {
        abortEarly: false
      })

      onConfirm({
        ...data,
        id: drivers.length + 1,
      } as IDriver)

    } catch (error) {
      if(error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        console.log(errors)
      }
    }
  }, [onConfirm, birthday, state, city, drivers])

  return (
    <Container>

      <Title 
        text={type === 'create'  ?  'Novo Motorista' : drivers[0].name} 
        size='big'
      />

      <Form ref={formRef} onSubmit={handleFormSubmit}>
        <div className="grid">
          <TextField
            name='name' 
            label='Nome'
            variant="outlined" 
            disabled={disabled}
          />

          <MaskedField 
            mask='cpf'
            name='CPF' 
            label='CPF'
            variant="outlined" 
            disabled={disabled}
          />

          <MaskedField 
            mask='rg'
            name='RG' 
            label='RG'
            variant="outlined" 
            disabled={disabled}
          />

          <TextField 
            name='CNH' 
            label='CNH'
            variant="outlined" 
            disabled={disabled}
          />

          <DateInput 
            name='birthday'
            label='Data de nascimento'
            onChange={handleBirhday}
            value={birthday}
            disabled={disabled}
          />
        </div>

        <Divider />

        <Title text='Endereço' />

        <div className="grid">
          <Scope path='address'>
            
            <MaskedField 
              mask='cep'
              name='CEP'
              label='CEP'
              variant="outlined"
              onBlur={handleGetAddress}
              disabled={disabled}
            />

            <TextField 
              name='street'
              label='Logradouro'
              variant="outlined"
              value={street}
              onChange={e => setStreet(e.target.value)}
              disabled={disabled}
            />

            <TextField 
              name='number'
              label='Número'
              variant="outlined" 
              value={number}
              onChange={e => setNumber(Number(e.target.value))}
              disabled={disabled}
            />

            <TextField
              select
              name='state' 
              label='Estado'
              variant="outlined" 
              disabled={disabled}
              value={state}
              onChange={e => setState(e.target.value)}
            >
              {states.map(state => (
                <MenuItem  value={state} key={state}>  {state} </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              name='city' 
              label='Cidade'
              variant="outlined"
              disabled={disabled || !citys.length}
              value={city}
              onChange={e => setCity(e.target.value)}
            >
               {citys.map(city => (
                <MenuItem  value={city} key={city}>  {city} </MenuItem>
              ))}
            </TextField>
            
            <TextField 
              name='neighborhood'
              label='Bairro'
              variant="outlined" 
              value={neighborhood}
              onChange={e => setNeighborhood(e.target.value)}
              disabled={disabled}
            />

            <TextField 
              name='complement'
              label='Complemento'
              variant="outlined" 
              disabled={disabled}
            />
          </Scope>
        </div>

        <Divider />

        <Title text='Contato' />

        <div className="grid">
          <Scope path='contact' >
            <TextField
              name='email'
              label='Email'
              variant="outlined" 
              disabled={disabled}
            />

            <MaskedField 
              mask='telephone'
              name='telephone'
              label='Telefone'
              variant="outlined" 
              disabled={disabled}
            />

            <MaskedField 
              mask='cellphone'
              name='cellphone'
              label='Celular'
              variant="outlined" 
              disabled={disabled}
            />
          </Scope>
        </div>

        <div className='floating-buttons'>
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
        </div>
      </Form>

    </Container>
  )
}

export default Card