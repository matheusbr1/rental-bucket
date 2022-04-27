import React, { useCallback } from 'react'
import clsx from 'clsx'
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import OpenIcon from '@material-ui/icons/Launch'
import { useHistory } from 'react-router'

import {  Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core'

interface EnhancedTableToolbarProps {
  numSelected: number
  currentSelected: number | undefined
  selectedList: number[]
  title: string
  path: string
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
      title: {
        flex: '1 1 100%',
        fontWeight: 500
      }
  }),
)

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (props) => {
  const classes = useToolbarStyles()
  
  const { numSelected, currentSelected, selectedList, title, path } = props;

  const history = useHistory()

  const handleEdit = useCallback(() => {
    history.push(`/${path}/${currentSelected}`)
  }, [currentSelected, history, path])

  const handleOpen = useCallback(() => {
    history.push(`/${path}/${currentSelected}`)
  }, [currentSelected, history, path])

  const handleDelete = useCallback(() => {
    console.log('Deletar: ', selectedList)
  }, [selectedList])

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography 
          className={classes.title} 
          color="inherit" 
          variant="subtitle1" 
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography 
          className={classes.title} 
          variant="h3" 
          id="tableTitle" 
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected === 1 && (
        <Tooltip title="Abrir">
          <IconButton onClick={handleOpen} >
            <OpenIcon />
          </IconButton>
        </Tooltip>
      )}
      {numSelected === 1 && (
        <Tooltip title="Editar">
          <IconButton onClick={handleEdit} >
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      {numSelected > 0 && (
        <Tooltip title="Deletar">
          <IconButton onClick={handleDelete} >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

export { EnhancedTableToolbar }