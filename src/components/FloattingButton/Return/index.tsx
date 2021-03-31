import React from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'

import { Container } from './styles'
import { useHistory } from 'react-router'

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

const Return: React.FC = ({ ...rest }) => {

  const classes = useStyles()

  const { goBack } = useHistory()

  return (
    <Container {...rest} >
      <div className={classes.root}>
        <Fab color="secondary" aria-label="edit" onClick={goBack} >
          <ArrowLeftIcon />
        </Fab>
      </div>
    </Container>
  )
}

export default Return