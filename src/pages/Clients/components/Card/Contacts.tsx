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
import { IContact } from 'interfaces'
import { contactSchema } from 'validations/contactSchema'

interface ContactProps {
  contacts: IContact[]
  setContacts(contacts: IContact[]): void
}

const Contacts: React.FC<ContactProps> = ({ contacts, setContacts }) => {

  const formRef = useRef<FormHandles>(null)

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

      await contactSchema.validate(data, {
        abortEarly: false
      })

      setContacts([
        ...contacts,
        data
      ])

    } catch (error) {
      if(error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        console.log(errors)
      }
    }
  }, [contactField, contacts, setContacts])

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

      <ContactTable 
        title='Contatos cadastrados'
        contacts={contacts}
      />
    </div>
  )
}

export default Contacts