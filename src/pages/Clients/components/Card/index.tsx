import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Form } from '@unform/web'
import * as yup from 'yup'

import { Container, Divider } from './styles'
import { clients } from 'mocks'

import FloatingButton from 'components/FloatingButton'
import { MenuItem } from '@material-ui/core'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import TextField from 'components/TextField'

import AdressTable from '../Table/Adress'
import ContactTable from '../Table/Contact'
import { FormHandles } from '@unform/core'
import getValidationErrors from 'utils/getValidationFormErrors'

interface FieldVariations {
  [key: string]: React.ReactNode
}

interface Adress {
  cep: string
  street: string
  number: string
  neighborhood: string
  state: string
  city: string
  complement?: string
}

interface Contact {
  email: string
  telephone: string[]
  cellphone: string[]
}

interface Client {
  cpf?: string
  cnpj?: string
  name: string
  stateRegistration?: string
  adress: Adress[]
  contact: Contact
}

interface CardProps {
  type: 'create' | 'update'
  onConfirm(fields: Client): void
  onDelete?(): void
  loading: boolean
}

const Card: React.FC<CardProps> = ({ type, loading, onConfirm, onDelete = () => {} }) => {
  const { goBack } = useHistory()

  const formRef = useRef<FormHandles>(null)

  const [person, setPerson] = useState('fisic')

  const handlePerson = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerson((event.target as HTMLInputElement).value)
  }

  const [contactField, setContactField] = useState('email')

  const handleContactField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactField((event.target as HTMLInputElement).value)
  }

  const [isChanging, setIsChanging] = useState(false)

  const handleChange = useCallback(() => {
    setIsChanging(state => !state)
  }, [])

  const disabled = useMemo(() => type === 'update' && !isChanging, [type, isChanging])

  useEffect(() => {
    if (!loading) {
      setIsChanging(false)
    }
  }, [loading])

  const handleFormSubmit = useCallback(async () => {

    try {
      formRef.current?.setErrors({})

      const schema = yup.object().shape({
        cpf: yup.string(),
        cnpj: yup.string(),
        name: yup.string().required('Campo obrigatório'),
        stateRegistration: yup.string(),
        contact: yup.object({
          email: yup.string().email('E-mail inválido'),
          telephone: yup.array().of(yup.string()),
          cellphone:yup.array().of(yup.string()),
        }),
        adress: yup.array().of(
          yup.object({
            cep: yup.string().required('Campo obrigatório'),
            street: yup.string().required('Campo obrigatório'),
            number: yup.string().required('Campo obrigatório'),
            neighborhood: yup.string().required('Campo obrigatório'),
            state: yup.string().required('Campo obrigatório'),
            city: yup.string().required('Campo obrigatório'),
          })
        )
      })

      await schema.validate({}, {
        abortEarly: false
      })

      onConfirm({} as Client)

    } catch (error) {
      if(error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        console.log(errors)
      }
    }
  }, [onConfirm])

  const personFields: FieldVariations = {
    fisic: (
      <React.Fragment>
        <TextField 
          name='CPF' 
          label='CPF'
          variant="outlined" 
          disabled={disabled}
        />
  
        <TextField
          name='name' 
          label='Nome'
          variant="outlined" 
          disabled={disabled}
        />
      </React.Fragment>
    ),
    legal: (
      <React.Fragment>
        <TextField 
          name='CNPJ' 
          label='CNPJ'
          variant="outlined" 
          disabled={disabled}
        />
  
        <TextField
          name='companyName' 
          label='Razão Social'
          variant="outlined" 
          disabled={disabled}
        />
  
        <TextField
          name='fantasyName' 
          label='Nome Fantasia'
          variant="outlined" 
          disabled={disabled}
        />
      </React.Fragment>
    )
  }
  
  const contactFields: FieldVariations = {
    email: (
      <TextField
        name='email'
        label='Email'
        variant="outlined" 
        disabled={disabled}
      />
    ),
    telephone: (
      <TextField 
        name='telephone'
        label='Telefone'
        variant="outlined" 
        disabled={disabled}
      />
    ),
    cellphone: (
      <TextField 
        name='cellphone'
        label='Celular'
        variant="outlined" 
        disabled={disabled}
      />
    )
  }

  return (
    <Container>
      
      { 
        type === 'create' 
          ? <h1>Novo Cliente</h1> 
          : <h1>{clients[0].name}</h1> 
      }

      <Form ref={formRef} onSubmit={handleFormSubmit} >

        <div className="grid">
          
          <RadioGroup value={person} onChange={handlePerson}>
            <FormControlLabel 
              value="fisic" 
              control={<Radio />} 
              label="Pessoa Física" 
              disabled={disabled} 
            />
            
            <FormControlLabel 
              value="legal" 
              control={<Radio />} 
              label="Pessoa Jurídica" 
              disabled={disabled} 
            />
          </RadioGroup>
          
          {personFields[person]}
        </div>

        <Divider />

        <h2>Endereço</h2>

        <div className="grid">
          <TextField 
            name='CEP'
            label='CEP'
            variant="outlined" 
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
            name='state' 
            label='Estado'
            variant="outlined" 
            select
          >
            <MenuItem value='SP'> SP </MenuItem>
            <MenuItem value='RJ'> RJ </MenuItem>
            <MenuItem value='MG'> MG </MenuItem>
          </TextField>

          <TextField
            name='city' 
            label='Cidade'
            variant="outlined" 
            select
          >
            <MenuItem value='Osasco'> Osasco </MenuItem>
            <MenuItem value='Carapicuíba'> Carapicuíba </MenuItem>
            <MenuItem value='Vinhedo'> Vinhedo </MenuItem>
          </TextField>
          
          <TextField 
            name='district'
            label='Bairro'
            variant="outlined" 
          />

          <TextField 
            name='complement'
            label='Complemento'
            variant="outlined" 
          />
        </div>

        <AdressTable title='Endereços cadastrados' />

        <Divider />

        <h2>Contato</h2>

        <div className="grid">

          <TextField
            name='type' 
            label='Tipo'
            variant="outlined" 
            onChange={handleContactField}
            value={contactField}
            disabled={disabled}
            select
          >
            <MenuItem value='email'> Email </MenuItem>
            <MenuItem value='telephone'> Telefone </MenuItem>
            <MenuItem value='cellphone'> Celular </MenuItem>
          </TextField>

          {contactFields[contactField]}
        
        </div>

        <ContactTable title='Contatos  cadastrados' />

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