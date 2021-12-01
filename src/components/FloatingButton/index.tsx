import React from 'react'
import { Box, CircularProgress, Fab, FabProps } from '@material-ui/core'
import { Edit, Add, Delete, KeyboardArrowLeft, Check  } from '@material-ui/icons'

interface Props extends Omit<FabProps, 'children'> {
  iconVariant?: 'add' | 'confirm' | 'delete' | 'edit' | 'return'
  loading?: boolean
}

const variationIcons = {
  add: <Add />,
  delete: <Delete />,
  return: <KeyboardArrowLeft />,
  edit: <Edit />,
  confirm: <Check />,
}

const FloatingButton: React.FC<Props> = ({ loading, iconVariant = 'add', ...rest }) => {
  return (
    <Box
      display='flex'
      position='fixed'
      bottom={15}
      right={30}
    >
      <Fab  color="primary" {...rest} >
        {loading ? (
          <CircularProgress variant='indeterminate' size={30}/>
        ) : variationIcons[iconVariant]}
      </Fab>
    </Box>
  )
}

export default FloatingButton