import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router'

import { Container, Divider } from './styles'
import { clients } from '../../../../mocks'

import FloatingButton from '../../../../components/FloatingButton'
import { MenuItem } from '@material-ui/core'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import TextField from '../../../../components/TextField'

import AdressTable from '../Table/Adress'
import ContactTable from '../Table/Contact'

interface FieldVariations {
  [key: string]: React.ReactNode
}

interface CardProps {
  type: 'create' | 'update'
  onConfirm(): void
  onDelete?(): void
  loading: boolean
}

const Card: React.FC<CardProps> = ({ type, loading, onConfirm, onDelete = () => {} }) => {
  const { goBack } = useHistory()

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

  const personFields: FieldVariations = {
    fisic: (
      <React.Fragment>
        <TextField 
          name='' 
          label='CPF'
          variant="outlined" 
          disabled={disabled}
        />
  
        <TextField
          name='' 
          label='Nome'
          variant="outlined" 
          disabled={disabled}
        />
      </React.Fragment>
    ),
    legal: (
      <React.Fragment>
        <TextField 
          name='' 
          label='CNPJ'
          variant="outlined" 
          disabled={disabled}
        />
  
        <TextField
          name='' 
          label='Razão Social'
          variant="outlined" 
          disabled={disabled}
        />
  
        <TextField
          name='' 
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
        name=''
        label='Email'
        variant="outlined" 
        disabled={disabled}
      />
    ),
    telephone: (
      <TextField 
        name=''
        label='Telefone'
        variant="outlined" 
        disabled={disabled}
      />
    ),
    cellphone: (
      <TextField 
        name=''
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

      <form>

        <div className="grid">
          
          <RadioGroup value={person} onChange={handlePerson}>
            <FormControlLabel value="fisic" control={<Radio />} label="Pessoa Física" disabled={disabled} />
            <FormControlLabel value="legal" control={<Radio />} label="Pessoa Jurídica" disabled={disabled} />
          </RadioGroup>
          
          {personFields[person]}
        </div>

        <Divider />

        <h2>Endereço</h2>

        <div className="grid">
          <TextField 
            name=''
            label='CEP'
            variant="outlined" 
          />

          <TextField 
            name=''
            label='Logradouro'
            variant="outlined"
          />

          <TextField 
            name=''
            label='Número'
            variant="outlined" 
          />

          <TextField
            name='' 
            label='Estado'
            variant="outlined" 
            select
          >
            <MenuItem value='SP'> SP </MenuItem>
            <MenuItem value='RJ'> RJ </MenuItem>
            <MenuItem value='MG'> MG </MenuItem>
          </TextField>

          <TextField
            name='' 
            label='Cidade'
            variant="outlined" 
            select
          >
            <MenuItem value='Osasco'> Osasco </MenuItem>
            <MenuItem value='Carapicuíba'> Carapicuíba </MenuItem>
            <MenuItem value='Vinhedo'> Vinhedo </MenuItem>
          </TextField>
          
          <TextField 
            name=''
            label='Bairro'
            variant="outlined" 
          />

          <TextField 
            name=''
            label='Complemento'
            variant="outlined" 
          />
        </div>

        <AdressTable title='Endereços cadastrados' />

        <Divider />

        <h2>Contato</h2>

        <div className="grid">

          <TextField
            name='' 
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
              <FloatingButton variant='confirm' onClick={onConfirm} loading={loading} />
            ) : isChanging ? (
                <FloatingButton variant='confirm' onClick={onConfirm} loading={loading} />
              ) : (
                <div className='group' >
                  <FloatingButton variant='edit' onClick={handleChange} />
                  <FloatingButton variant='delete' onClick={onDelete} loading={loading} />
                </div>
              )
          }
        </div>
      </form>
    </Container>
  )
}

export default Card