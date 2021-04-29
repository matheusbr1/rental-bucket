import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'
import getValidationErrors from 'utils/getValidationFormErrors'
import TextField from 'components/TextField'
import { Button, MenuItem } from '@material-ui/core'
import ContactTable from '../Table/Contact'
import Title from 'components/Title'
import MaskedField from 'components/TextField/masked'

const Contacts: React.FC = () => {

  const formRef = useRef<FormHandles>(null)

  const [contacts, setContacts] = useState<string[]>([])

  useEffect(() => console.log('Contatos Cadastrados', contacts), [contacts])

  const [contactField, setContactField] = useState('email')

  const handleContactField = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setContactField(e.target.value)
  }, [])

  const handleAddContact = useCallback(async (fields) => {

    const data = {
      ...fields,
      type: contactField,
    }

    console.log('Contacts fields', data)

    try {
      formRef.current?.setErrors({})

      const schema = yup.object().shape({
        type: yup.string(),

        email: yup.string()
          .when('type', {
            is: 'email',
            then: yup.string()
              .email('E-mail inválido')
              .required('Campo Obrigatório')
          }),
        
        telephone: yup.string()
          .when('type', {
            is: 'telephone',
            then: yup.string()
              .required('Campo Obrigatório')
          }),
        
        cellphone: yup.string()
          .when('type', {
            is: 'cellphone',
            then: yup.string()
              .required('Campo Obrigatório')
          }),
      })

      await schema.validate(data, {
        abortEarly: false
      })

      setContacts(oldState => ([
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
  }, [contactField])

  return (
    <div>
      <Form ref={formRef} onSubmit={handleAddContact} >
        <Title 
          text='Contatos' 
          error={!contacts.length && 'Adicione pelo menos 1 contato'}  
        />

        <div className="grid">

          <TextField
            name='type' 
            label='Tipo'
            variant="outlined" 
            onChange={handleContactField}
            value={contactField}
            select
          >
            <MenuItem value='email'> Email </MenuItem>
            <MenuItem value='telephone'> Telefone </MenuItem>
            <MenuItem value='cellphone'> Celular </MenuItem>
          </TextField>

            {
              contactField === 'email' && (
                <TextField
                  name='email'
                  label='Email'
                  variant="outlined" 
                />
              )
            }

            {
              contactField === 'telephone' && (
                <MaskedField
                  mask='telephone'
                  name='telephone'
                  label='Telefone'
                  variant="outlined" 
                />
              )
            }

            {
              contactField === 'cellphone' && (
                <MaskedField 
                  mask='cellphone'
                  name='cellphone'
                  label='Celular'
                  variant="outlined" 
                />
              )
            }
        </div>

        <Button 
          type='submit'
          style={{
            height: 50,
            borderRadius: 10,
            padding: 20,
            marginTop: 10,
          }}>
            Cadastrar contato
        </Button>
      </Form>

      <ContactTable title='Contatos cadastrados' />
    </div>
  )
}

export default Contacts