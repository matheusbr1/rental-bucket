import React from 'react';
import Button from 'components/Button'
import { Box, Grid } from '@material-ui/core'
import { FormStatus } from 'interfaces';
import green from '@material-ui/core/colors/green'

interface FormFooterProps {
  formStatus: FormStatus
  isDeleting?: boolean
  isSubmitting?: boolean
  buttonLabels: {
    primary: string
    secondary: string
  }
  isDone?: boolean
  isDetailPage?: boolean
  onMarkAsDone?: () => Promise<void>
  onSecondaryButtonClick?: () => void
  changeFormStatus?:  (formStatus: FormStatus) => void
}

const WorkFormFooter: React.FC<FormFooterProps> = ({ 
  formStatus, 
  isDeleting, 
  isSubmitting,
  buttonLabels,
  isDone = false,
  isDetailPage = false,
  onMarkAsDone,
  onSecondaryButtonClick, 
  changeFormStatus
}) => {
  const grid = isDetailPage ? 6 : 4

  return (
    <Grid container spacing={3} justifyContent='flex-end' >
      <Grid item lg={grid} md={grid} sm={grid} xs={12} >
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
              disabled={isDone}
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

        {!isDone && isDetailPage && (
            <Button 
              loading={isDeleting} 
              onClick={onMarkAsDone} 
              style={{ background: green[600] }}
            >
              Concluír
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export { WorkFormFooter }