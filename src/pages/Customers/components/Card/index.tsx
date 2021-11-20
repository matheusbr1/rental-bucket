import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Form } from '@unform/web'
import * as yup from 'yup'
import FloatingButton from 'components/FloatingButton'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from 'components/TextField'
import MaskedField from 'components/TextField/masked'
import { FormHandles } from '@unform/core'
import getValidationErrors from 'utils/getValidationFormErrors'
import { useData } from 'hooks/data'
import { IAddress, IContact, ICustomer } from 'interfaces'
import Title from 'components/Title'
import { useParams } from 'react-router-dom'

import Adresses from './Adresses'
import Contacts from './Contacts'
import { Container, Divider } from './styles'

interface CardProps {
  type: 'create' | 'update'
  onConfirm(fields: ICustomer): void
  onDelete?(): void
  loading: boolean
}

const Card: React.FC<CardProps> = ({ type, loading, onConfirm, onDelete = () => {} }) => {
  const formRef = useRef<FormHandles>(null)
  
  const { goBack } = useHistory()

  const path: { id: string } = useParams()

  const { customers } = useData()

  const [customer, setCustomer] = useState({ 
    id: 0,
    name: '',
    CPF: '',
    address: [],
    contacts: [],
   } as ICustomer)

  const [person, setPerson] = useState('fisic')

  const [adresses, setAdresses] = useState<IAddress[]>([])

  const [contacts, setContacts] = useState<IContact[]>([])

  useEffect(() => {
    if (type !== 'update') {
      return
    }

    const id = Number(path.id)

    const filtered = customers.filter(customer => customer.id === id)[0]

    if (!filtered) {
      console.log('404 - Not found')
      return
    }

    setCustomer(filtered)
    setContacts(filtered.contacts)
    setAdresses(filtered.address)
    
    formRef.current?.setData(filtered)
  }, [type, path, customers])

  const handlePerson = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerson((event.target as HTMLInputElement).value)
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

  const handleFormSubmit = useCallback(async fields => {

    try {
      formRef.current?.setErrors({})

      const fisicPersonSchema = yup.object().shape({
        CPF: yup.string().required('Campo obrigatório'),
        name: yup.string().required('Campo obrigatório'),
      })

      const legalPersonSchema = yup.object().shape({
        CNPJ: yup.string().required('Campo obrigatório'),
        companyName: yup.string().required('Campo obrigatório'),
        fantasyName: yup.string().required('Campo obrigatório'),
        stateRegistration: yup.string(),
      })

      if(person === 'fisic') {
        await fisicPersonSchema.validate(fields, {
          abortEarly: false
        })
      } else {
        await legalPersonSchema.validate(fields, {
          abortEarly: false
        })
      }

      onConfirm({
        id: customers.length + 1 ,
        ...fields,
        contacts,
        adresses
      } as ICustomer)

    } catch (error) {
      if(error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        console.log(errors)
      }
    }
  }, [onConfirm, person, adresses, contacts, customers])

  return (
    <Container>

    <Title 
      text={type === 'create'  ?  'Novo Cliente' : customer?.name} 
      size='big'
    />

      <Form ref={formRef} onSubmit={handleFormSubmit} >
        <div className="grid">
          <RadioGroup name='person' value={person} onChange={handlePerson}>
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
          
          { person === 'fisic' ? (
            <React.Fragment>

              <MaskedField 
                mask='cpf'
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
          ) : (
            <React.Fragment>
               <MaskedField 
                mask='cnpj'
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
          )}
        </div>
        <div className='floating-buttons'>
          <FloatingButton variant='return' onClick={goBack} />

          {
            type === 'create' ? (
              <FloatingButton 
                variant='confirm' 
                type='submit' 
                loading={loading} 
              />
            ) : isChanging ? (
                <FloatingButton 
                  variant='confirm' 
                  type='submit' 
                  loading={loading} 
                />
              ) : (
                <div className='group' >
                  <FloatingButton 
                    variant='edit' 
                    onClick={handleChange} 
                  />
                  
                  <FloatingButton 
                    variant='delete' 
                    onClick={onDelete} 
                    loading={loading} 
                  />
                </div>
              )
          }
        </div>
      </Form>

      <Divider />

      <Adresses adresses={adresses} setAdresses={setAdresses} />

      <Divider />

      <Contacts contacts={contacts} setContacts={setContacts} />
      
    </Container>
  )
}

export default Card