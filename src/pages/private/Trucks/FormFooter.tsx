import React from 'react';
import Button from 'components/Button'
import { Box, Grid } from '@material-ui/core'
import { FormStatus } from 'interfaces';

interface FormFooterProps {
  formStatus: FormStatus
  isDeleting?: boolean
  isSubmitting?: boolean
  buttonLabels: {
    primary: string
    secondary: string
  }
  onSecondaryButtonClick?: () => void
  changeFormStatus?:  (formStatus: FormStatus) => void
}

const TruckFormFooter: React.FC<FormFooterProps> = ({ 
  formStatus, 
  isDeleting, 
  isSubmitting,
  buttonLabels,
  onSecondaryButtonClick, 
  changeFormStatus
}) => {
  return (
    <Grid container spacing={3} justifyContent='flex-end' >
      <Grid item lg={4} md={4} sm={4} xs={12} >
        <Box 
          mb='2rem'
          display='flex'
          justifyContent='space-between'
          gridGap={5}
        >
          <Button 
            loading={isDeleting} 
            color='secondary'
            onClick={onSecondaryButtonClick} 
          >
            {buttonLabels.secondary}
          </Button>

          {formStatus === 'isViewing' && (
            <Button 
              color='primary'
              type='button'
              onClick={() => changeFormStatus && changeFormStatus('isFilling')}
            >
              Editar
            </Button>
          )}

          {formStatus === 'isFilling' && (
            <Button 
              loading={isSubmitting} 
              color='primary'
              type='submit'
            >
              {buttonLabels.primary}
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export { TruckFormFooter }