import React from 'react'
import { CircularProgress, Fab } from '@material-ui/core'

import { Edit, Add, Delete, KeyboardArrowLeft, Check  } from '@material-ui/icons'

import { Container } from './styles'

interface Props {
  onClick(e: React.MouseEvent<HTMLButtonElement>): void
  variant?: 'add' | 'confirm' | 'delete' | 'edit' | 'return'
  disabled?: boolean
  loading?: boolean
}

const variationIcons = {
  add: <Add />,
  confirm: <Check />,
  delete: <Delete />,
  edit: <Edit />,
  return: <KeyboardArrowLeft />
}

const FloatingButton: React.FC<Props> = ({ onClick, loading, variant = 'add', disabled }) => {
  return (
    <Container variant={variant}>
      <div>
        <Fab color="default" style={{ margin: 5 }} onClick={onClick} disabled={disabled}>
          {
          loading ? (
            <CircularProgress variant='indeterminate' size={30}/>
          ) : variationIcons[variant]}
        </Fab>
      </div>
    </Container>
  )
}

export default FloatingButton