
import React, { useCallback, useState } from 'react'
import { IContact } from 'interfaces';
import { Delete, Check  } from '@material-ui/icons'
import ContactMail from '@material-ui/icons/ContactMail';
import ContactPhone from '@material-ui/icons/ContactPhone';
import DeleteIcon from '@material-ui/icons/Delete'
import Add from '@material-ui/icons/AddCircle'
import { useSnackbar } from 'notistack'
import { Field, Form, Formik } from 'formik';
import FormikTextField from 'components/FormikTextField';
import { contactSchema } from 'validations/contactSchema';
import { 
  Avatar, 
  Box, 
  Grid,  
  IconButton,  
  List,  
  ListItem,  
  ListItemAvatar,  
  ListItemSecondaryAction,  
  ListItemText,  
  Typography,
  Fab,
  MenuItem,
} from '@material-ui/core'

interface ContactsProps {
  contacts: IContact[]
  setContacts: (contacts: IContact[]) => void
  disabled?: boolean
}

const Contacts: React.FC<ContactsProps> = ({ contacts, setContacts, disabled = false }) => {
  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [isAddingContact, setIsAddingContact] =useState(false);

  const handleDelete = useCallback((contactToBeDeleted: string) => {
    setContacts(contacts.filter(contact => contact.contact !== contactToBeDeleted))
    
    snackbar('Contato deletado com sucesso!', { variant: 'success' })
  }, [contacts, setContacts, snackbar])

  const handleAddContact = useCallback((contact: IContact) => {
    setContacts(contacts.concat([contact]))
    
    setIsAddingContact(false)

    snackbar('Contato adicionado com sucesso!', { variant: 'success' })
  }, [contacts, setContacts, snackbar])

  return (
      <Formik
        onSubmit={(values, actions) => {
          handleAddContact(values as IContact)
          actions.resetForm()
        }}
        validationSchema={contactSchema}
        initialValues={{
          contact_type: 'email',
          contact: ''
        }}
      >
        {({ submitForm, resetForm }) => (
          <Form style={{ width: '100%' }} >
            <Grid container spacing={3} >
              <Grid item lg={12} md={12} sm={12} xs={12} >
                <Box display='flex' alignItems='center'>
                  <Box mr='10px' >
                    <Typography variant='h2' >
                      Contatos
                    </Typography>
                  </Box>

                  <IconButton edge="end" aria-label="add" disabled={disabled}>
                    <Add onClick={() => setIsAddingContact(true)} />
                  </IconButton>
                </Box>
              </Grid>
              
              {!!contacts.length && (
                <Grid item lg={12} md={12} sm={12} xs={12} >
                  <List dense>
                    {contacts.map(({ contact_type, contact }) => (
                      <ListItem key={contact_type + contact} >
                        <ListItemAvatar>
                          <Avatar>
                            {contact_type === 'email' ? <ContactMail /> : <ContactPhone />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={contact}
                          secondary={contact_type}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" disabled={disabled}>
                            <DeleteIcon onClick={() => handleDelete(contact)} />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              )}
              
              {!contacts.length && !isAddingContact && (
                <Grid item lg={12} md={12} sm={12} xs={12} >
                  <Typography variant='h5' >
                    Adicione um contato!
                  </Typography>
                </Grid>
              )}

              {isAddingContact && (
                <React.Fragment>
                  <Grid item lg={5} md={5} sm={5} xs={12} >
                    <Field 
                      component={FormikTextField} 
                      label='Tipo de Contato' 
                      name='contact_type'
                      select
                      disabled={false}
                    >
                      <MenuItem value='phone'>Telefone</MenuItem>
                      <MenuItem value='cellphone'>Celular</MenuItem>
                      <MenuItem value='email'>Email</MenuItem>
                    </Field>
                  </Grid>

                  <Grid item lg={5} md={5} sm={5} xs={12} >
                    <Field 
                      component={FormikTextField} 
                      label='Contato' 
                      name='contact'
                      disabled={false}
                    />
                  </Grid>

                  <Grid item lg={2} md={2} sm={2} xs={12} >
                    <Box 
                      display='flex' 
                      alignItems='center' 
                      justifyContent='space-around'
                      height='100%'
                    >
                      <Fab 
                        color="primary" 
                        size='small'
                        onClick={submitForm} 
                      >
                        <Check />
                      </Fab>

                      <Fab
                        color="secondary" 
                        size='small' 
                        onClick={() => {
                          setIsAddingContact(false)
                          resetForm()
                        }} 
                      >
                        <Delete />
                      </Fab>
                    </Box>
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
  )
}

export { Contacts }