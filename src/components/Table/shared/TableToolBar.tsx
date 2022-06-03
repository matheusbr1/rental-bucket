import React, { useCallback, useState } from 'react'
import clsx from 'clsx'
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import OpenIcon from '@material-ui/icons/Launch'
import { useHistory } from 'react-router'
import { api } from 'services/api'
import { useSnackbar } from 'notistack'
import Loading from 'components/Loading'

import {  Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core'

interface EnhancedTableToolbarProps {
  numSelected: number
  currentSelected: string
  title: string
  path: string
  selected: string[]
  onDelete: (id: string) => void
  onAccess: (register: any) => void
  setSelected: (selected: string[]) => void
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
  
  const { 
    numSelected,
    currentSelected: register_id, 
    title, 
    path,
    selected, 
    setSelected,
    onDelete,
    onAccess
  } = props;

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()

  const handleOpen = useCallback(async () => {
    const treatedName = title.toLowerCase().slice(0, -1)

    try {
      setIsLoading(true)

      const { data: register } = await api.get(`/${path}/${register_id}`)

      onAccess(register)

      const singularPath = path.slice(0, -1)
  
      history.push(`/${singularPath}/${register_id}`)
    } catch (error) {
      snackbar(`Não foi possível acessar o ${treatedName}, tente novamente`, { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }, [title, path, register_id, onAccess, history, snackbar])

  const handleDelete = useCallback(async () => {
    const treatedName = title.toLowerCase().slice(0, -1)

    try {
      setIsLoading(true)

     for await (const selected_register_id of selected) {
       await api.delete(`/${path}/${selected_register_id}`)

       onDelete(selected_register_id)
     }

      setSelected([])

      const treatedName = title.toLowerCase().slice(0, -1)
  
      snackbar(`${treatedName} deletado com sucesso!`,  { variant: 'success' })
    } catch (error) {
      snackbar(`Não foi possível deletar o ${treatedName}, tente novamente!`, { variant: 'error' }
      )
    } finally {
      setIsLoading(false)
    }
  }, [onDelete, path, selected, setSelected, snackbar, title])

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {isLoading && <Loading />}
      
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