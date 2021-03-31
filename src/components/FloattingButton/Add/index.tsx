import React from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { Container } from './styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
)

interface Props {
  onClick(e: React.MouseEvent<HTMLButtonElement>): void
}

const Add: React.FC<Props> = ({ onClick, ...rest }) => {

  const classes = useStyles()

  return (
    <Container {...rest} >
      <div className={classes.root}>
        <Fab color="primary" aria-label="add" onClick={onClick} >
          <AddIcon />
        </Fab>
      </div>
    </Container>
  )
}

export default Add