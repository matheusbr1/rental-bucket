import React from 'react'
import { Backdrop, CircularProgress, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'rgba(0, 0, 0, 0.3)'
  },
  spinner: {
    color: theme.palette.primary.main
  }
}))

const Loading: React.FC = () => {
  const classes = useStyles()

  return (
    <Backdrop id="loadingSpinner" className={classes.backdrop} open >
      <CircularProgress size={70} thickness={5.5} className={classes.spinner} />
    </Backdrop>
  )
}

export default Loading
