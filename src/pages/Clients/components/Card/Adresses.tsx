import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import TextField from 'components/TextField'
import MaskedField from 'components/TextField/masked'
import { Button, MenuItem } from '@material-ui/core'
import AdressTable from '../Table/Adress'
import { states, citys } from 'mocks'
import * as yup from 'yup'
import getValidationErrors from 'utils/getValidationFormErrors'
import Title from 'components/Title'

interface Adress {
  cep: string
  street: string
  number: string
  neighborhood: string
  state: string
  city: string
  complement?: string
}

const Adresses: React.FC = () => {

  const formRef = useRef<FormHandles>(null)

  const [adresses, setAdresses] = useState<Adress[]>([])

  useEffect(() => console.log('Endereços Cadastrados', adresses), [adresses])

  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  const handleAddAdress = useCallback(async (fields) => {
    console.log('Adresses fields', fields)

    const data = {
      ...fields,
      city,
      state
    }

    try {
      formRef.current?.setErrors({})

      const schema = yup.object().shape({
        CEP: yup.string().required('Campo obrigatório'),
        street: yup.string().required('Campo obrigatório'),
        number: yup.string().required('Campo obrigatório'),
        neighborhood: yup.string().required('Campo obrigatório'),
        state: yup.string().required('Campo obrigatório'),
        city: yup.string().required('Campo obrigatório'),
      })

      await schema.validate(data, {
        abortEarly: false
      })

      setAdresses(oldState => ([
        ...oldState,
        data
      ]))

    } catch (error) {
      if(error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        console.log(errors)
      }
    }
  }, [city, state])

  return (
    <div>
      <Form ref={formRef} onSubmit={handleAddAdress} >

        <Title 
          text='Endereço' 
          error={!adresses.length && 'Adicione pelo menos 1 endereço'} 
        />

        <div className="grid">

          <MaskedField 
            name='CEP'
            label='CEP'
            variant="outlined" 
            mask='cep'
          />

          <TextField 
            name='street'
            label='Logradouro'
            variant="outlined"
          />

          <TextField 
            name='number'
            label='Número'
            variant="outlined" 
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

      <AdressTable title='Endereços cadastrados' />
    </div>
  )
}

export default Adresses