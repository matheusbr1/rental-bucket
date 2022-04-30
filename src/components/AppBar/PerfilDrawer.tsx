import React, { useState }  from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux'
import { IDefaultRootState } from 'interfaces'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { api } from 'services/api'
import Skeleton from '@mui/material/Skeleton'
import { useSnackbar } from 'notistack'
import { updateUserAvatar } from 'redux/user/user.actions'

interface PerfilDrawerProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const ChangeAvatarIcon = styled(CameraAltIcon)(() => ({
  width: 32,
  height: 32,
}))

const Input = styled('input')({
  display: 'none',
})

const PerfilDrawer: React.FC<PerfilDrawerProps> = ({ isOpen, setIsOpen }) =>  {
  const { enqueueSnackbar: snackbar } = useSnackbar()

  const dispatch = useDispatch()

  const user = useSelector((state: IDefaultRootState) => state.user.data)

  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpen(open)
    }

    const handleAvatarChange = async () => {
      const fileInput = document.getElementById('icon-button-file') as any
    
      fileInput.onchange = async () => {
        const selectedFiles = [...fileInput.files]

        if (selectedFiles.length) {
          const file = selectedFiles[0]

          var formData = new FormData()
          
          formData.append("avatar", file)

          try {
            setIsUploadingAvatar(true)

            const url = 'https://lh3.googleusercontent.com/a-/AOh14GjFOW9XIzTAnRBsiQ7HHIHEDENmp0LObBXrMyeN4ac=s288-p-rw-no'
            
            await api.patch('/users/avatar', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })

            dispatch(updateUserAvatar(url))

            snackbar('Avatar alterado com sucesso!', { variant: 'success' })
          } catch (error) {
            snackbar('Não foi possível alterar o avatar, tente novamente!', { variant: 'error' })
          } finally {
            setIsUploadingAvatar(false)
          }
        }
      }
    }

  const content = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
    >
      <Box p={2} >
        <Box
          p={2}
          width={1}
          flexDirection='column'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Stack direction="row" spacing={2} mb={2} >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <label htmlFor="icon-button-file">
                  <Input 
                    accept="image/*" 
                    id="icon-button-file" 
                    type="file"
                    disabled={isUploadingAvatar}
                  />

                  <IconButton 
                    sx={{ p: 0 }}
                    onClick={handleAvatarChange}
                    aria-label="upload picture" 
                    component="span"
                    disabled={isUploadingAvatar}
                  >
                    <ChangeAvatarIcon />
                  </IconButton>
                </label>
              }
            >
              {isUploadingAvatar 
                ? <Skeleton variant='circular' sx={{ width: 100, height: 100 }} />
                : <Avatar 
                    alt={user.name} 
                    src={user.avatar}
                    sx={{ width: 100, height: 100 }}
                  />
              }
            </Badge>
          </Stack>

          <Typography variant='h6' >
            {user.name}
          </Typography>
          
          <Typography variant='body2' >
            {user.email}
          </Typography>
        </Box>

        <Divider />

        <Box
          display='flex'
          justifyContent='space-around'
          p={2}
        >
          <Button onClick={toggleDrawer(false)} >
            Fechar
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor='right'
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {content()}
      </Drawer>
    </div>
  )
}

export { PerfilDrawer }