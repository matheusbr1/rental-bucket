import React from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'

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

const Delete: React.FC<Props> = ({ onClick, ...rest }) => {

  const classes = useStyles()

  return (
    <Container {...rest} >
      <div className={classes.root}>
        <Fab color="secondary" aria-label="edit">
          <DeleteIcon />
        </Fab>
      </div>
    </Container>
  )
}

export default Delete