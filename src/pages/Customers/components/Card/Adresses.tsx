import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import TextField from 'components/TextField'
import MaskedField from 'components/TextField/masked'
import { Button, MenuItem } from '@material-ui/core'
import AddressTable from '../Table/Address'
import * as yup from 'yup'
import getValidationErrors from 'utils/getValidationFormErrors'
import Title from 'components/Title'
import axios from 'axios'
import { IAddress } from 'interfaces'
import { addressSchema } from 'validations/addressSchema'

interface AdressesProps {
  adresses: IAddress[]
  setAdresses(adresses: IAddress[]): void
}

interface AddressProps {
  logradouro: string 
  uf: string 
  localidade: string  
  bairro: string 
}

interface IState {
  id: number
  sigla: string
  nome: string
}

interface ICity {
  id: number
  nome: string
}

const Adresses: React.FC<AdressesProps> = ({ adresses, setAdresses }) => {

  const formRef = useRef<FormHandles>(null)

  useEffect(() => console.log('Endereços Cadastrados', adresses), [adresses])

  const [states, setStates] = useState([])
  const [citys, setCitys] = useState([])

  const [street, setStreet] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [number, setNumber] = useState(0)

  const [error, setError] = useState('')

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

  const clearAdress = useCallback(() => {
    formRef.current?.reset()
    setState('')
    setCity('')
    setNeighborhood('')
    setStreet('')
    setNumber(0)
  }, [])

  const handleAddAdress = useCallback(async (fields) => {
    console.log('Adresses fields', fields)

    const data = {
      ...fields,
      city,
      state
    }

    try {
      formRef.current?.setErrors({})

      await addressSchema.validate(data, {
        abortEarly: false
      })

      setAdresses([
        ...adresses,
        data
      ])

      clearAdress()

    } catch (error) {
      if(error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        console.log(errors)
      }
    }
  }, [city, state, adresses, setAdresses, clearAdress])

  const handleGetAdress = useCallback(e => {

    const cep = e.target.value

    axios
      .get(`https://viacep.com.br/ws/${cep}/json`)
      .then(response => {

      if (!response.data) {
        return
      }

      if(response.data.erro) {
        setError('CEP inválido, tente novamente!')
        formRef.current?.setFieldError('CEP', 'CEP inválido')
      } else {
        setError('')
        formRef.current?.setFieldError('CEP', '')
      }

      const { logradouro, uf, localidade, bairro }: AddressProps = response.data

      setStreet(logradouro)
      setState(uf)
      setCity(localidade)
      setNeighborhood(bairro)

      console.log(response.data)
    })
  },[])

  return (
    <div>
      <Form ref={formRef} onSubmit={handleAddAdress} >

        <Title 
          text='Endereço' 
          error={
            error 
              ? error
              : !adresses.length && 'Adicione pelo menos 1 endereço'
          } 
        />

        <div className="grid">

          <MaskedField 
            name='CEP'
            label='CEP'
            variant="outlined" 
            mask='cep'
            onBlur={handleGetAdress}
          />

          <TextField 
            name='street'
            label='Logradouro'
            variant="outlined"
            value={street}
            onChange={e => setStreet(e.target.value)}
          />

          <TextField 
            name='number'
            label='Número'
            variant="outlined" 
            type='number'
            value={number}
            onChange={e => setNumber(Number(e.target.value))}
          />

          <TextField
            select
            name='state' 
            label='Estado'
            variant="outlined" 
            value={state}
            onChange={e => setState(e.target.value)}
          >
            {states.map((state, index) => (
              <MenuItem value={state} key={index} > {state} </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            name='city' 
            label='Cidade'
            disabled={!citys.length}
            variant="outlined" 
            value={city}
            onChange={e => setCity(e.target.value)}
          >
            {citys.map((city, index) => (
              <MenuItem value={city} key={index} > {city} </MenuItem>
            ))}
          </TextField>
          
          <TextField 
            name='neighborhood'
            label='Bairro'
            variant="outlined" 
            value={neighborhood}
            onChange={e => setNeighborhood(e.target.value)}
          />

          <TextField 
            name='complement'
            label='Complemento'
            variant="outlined" 
          />
        </div>

        <Button 
          type='submit'
          style={{
            height: 50,
            borderRadius: 10,
            padding: 20,
            marginTop: 10,
          }}>
            Cadastrar endereço
        </Button>
      </Form>

      <AddressTable 
        title='Endereços cadastrados' 
        adresses={adresses}
      />
    </div>
  )
}

export default Adresses