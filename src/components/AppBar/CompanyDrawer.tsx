import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import { Card, CardActions, CardContent, Divider, makeStyles } from '@material-ui/core'
import { useCompany } from 'hooks/useCompany'
import { useCheckout } from 'hooks/useCheckout'
import { useHistory } from 'react-router-dom'

interface CompanyProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const useStyles = makeStyles(({ palette }) => ({
  root: {
    border: '2px solid',
    borderColor: palette.primary.main,
  },
}));

const CompanyDrawer: React.FC<CompanyProps> = ({ isOpen, setIsOpen }) => {
  const history = useHistory()

  const classes = useStyles();

  const { company } = useCompany()
  const { checkout } = useCheckout()

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open)
  }

  const content = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
    >
      <Box p={2} >
        <Box
          p={2}
          width={1}
          flexDirection='column'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Typography variant='h6' >
            {company?.name}
          </Typography>

          <Typography variant='body2' >
            {company?.address.CEP} - {company?.address.street}
          </Typography>

          <Typography variant='body2' >
            {company?.address.neighborhood} - {company?.address.city} - {company?.address.state}
          </Typography>
        </Box>

        <Box
          display='flex'
          justifyContent='space-around'
          p={2}
        >
          <Button onClick={() => {
            history.push(`/company/${company?.id}`)
          }} >
            Editar Empresa
          </Button>
        </Box>

        <Divider />

        <Box
          py={2}
          width={1}
        >
          <Typography variant='body2' >
            Plano Vigente: <strong>FREE</strong>
          </Typography>
        </Box>

        <Card className={classes.root} variant='outlined'>
          <CardContent>
            <Typography variant='body2' >
              Assine o <b>PRO</b> e gerencie caminhões, motoristas, clientes e serviços de forma ilimitada!
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="medium" onClick={checkout} >ASSINAR O PLANO PRO</Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor='right'
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {content()}
      </Drawer>
    </div>
  )
}

export { CompanyDrawer }