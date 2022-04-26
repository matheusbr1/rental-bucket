
import React, { useCallback, useState } from 'react'
import { ContactType, IContact } from 'interfaces';
import { Delete, Check  } from '@material-ui/icons'
import ContactMail from '@material-ui/icons/ContactMail';
import ContactPhone from '@material-ui/icons/ContactPhone';
import DeleteIcon from '@material-ui/icons/Delete'
import Add from '@material-ui/icons/AddCircle'
import { useSnackbar } from 'notistack'
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
  TextField,
  Fab,
  MenuItem,
} from '@material-ui/core'

interface ContactsProps {
  contacts: IContact[]
  setContacts: (contacts: IContact[]) => void
}

const Contacts: React.FC<ContactsProps> = ({ contacts, setContacts }) => {
  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [isAddingContact, setIsAddingContact] =useState(false);

  const [contactType, setContactType] =useState<ContactType>('cellphone')
  const [contact, setContact] =useState('')

  const handleResetState = useCallback(() => {
    setIsAddingContact(false)
    setContactType('cellphone')
    setContact('')
  }, [])

  const handleDeleteContact = useCallback((contactToBeDeleted: string) => {
    setContacts(contacts.filter(contact => contact.contact !== contactToBeDeleted))
    
    snackbar('Contato deletado com sucesso!', { variant: 'success' })
  }, [contacts, setContacts, snackbar])

  const handleAddContact = useCallback(() => {
    const updatedContacts = contacts

    updatedContacts.push({ contact, contact_type: contactType as ContactType })

    setContacts(updatedContacts)
    
    handleResetState()

    snackbar('Contato adicionado com sucesso!', { variant: 'success' })
  }, [contact, contactType, contacts, handleResetState, setContacts, snackbar])

  return (
    <React.Fragment>
      <Grid item lg={12} md={12} sm={12} xs={12} >
        <Box display='flex' alignItems='center'>
          <Box mr='10px' >
            <Typography variant='h2' >
              Contatos
            </Typography>
          </Box>

          <IconButton edge="end" aria-label="add">
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
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon onClick={() => handleDeleteContact(contact)} />
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
            <TextField
              select
              fullWidth
              label='Tipo de Contato' 
              // name='contact_type'
              variant='outlined'
              value={contactType}
              onChange={e => setContactType(e.target.value as ContactType)}
            >
              <MenuItem value='phone'>Telefone</MenuItem>
              <MenuItem value='cellphone'>Celular</MenuItem>
              <MenuItem value='email'>Email</MenuItem>
            </TextField>
          </Grid>

          <Grid item lg={5} md={5} sm={5} xs={12} >
            <TextField 
              label='Contato' 
              // name='contact'
              value={contact}
              variant='outlined' 
              fullWidth
              onChange={e => setContact(e.currentTarget.value)}
            />
          </Grid>

          <Grid item lg={2} md={2} sm={2} xs={12} >
            <Box 
              display='flex' 
              alignItems='center' 
              justifyContent='space-around'
              height='100%'
            >
              <Fab color="primary" size='small' >
                <Check onClick={handleAddContact} />
              </Fab>

              <Fab color="secondary" size='small'>
                <Delete onClick={handleResetState} />
              </Fab>
            </Box>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export { Contacts }