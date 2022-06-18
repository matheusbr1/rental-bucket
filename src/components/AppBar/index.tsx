import React, { useCallback, useState }  from 'react'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'redux/user/user.actions'
import { IDefaultRootState } from 'interfaces'
import { PerfilDrawer } from './PerfilDrawer'
import usePersistedState from 'hooks/usePersistedState'
interface IConfig {
  label: string
  destiny: string
}

const pages: IConfig[] = [
  { label: 'Serviços', destiny: '/works' },
  { label: 'Clientes', destiny: '/customers' },
  { label: 'Motoristas', destiny: '/drivers' },
  { label: 'Caminhões', destiny: '/trucks' }
]

const settings: string[] = ['Perfil', 'Sair']

const AppBar = () => {
  const [, setTokens] = usePersistedState('@rentalbucket:tokens', null)

  const user = useSelector((state: IDefaultRootState) => state.user.data)

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const history = useHistory()

  const dispatch = useDispatch()

  const handleSignOut = useCallback(async () => {
    dispatch(signOut())

    setTokens(null)

    history.push('/')
  }, [dispatch, history, setTokens])

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        position: 'fixed',
        zIndex: 10,
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <PerfilDrawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
      />

      <MuiAppBar position="static" enableColorOnDark={false} >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={e => setAnchorElNav(e.currentTarget)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                keepMounted
                id="menu-appbar"
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
                sx={{ display: { xs: 'block', md: 'none' } }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {pages.map(({ label, destiny }) => (
                  <MenuItem 
                    key={label} 
                    onClick={() => {
                      setAnchorElNav(null)
                      history.push(destiny)
                    }}
                  >
                    <Typography textAlign="center">{label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              noWrap
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map(({ label, destiny }) => (
                <Button
                  key={label}
                  onClick={() => {
                    setAnchorElNav(null)
                    history.push(destiny)
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {label}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir configurações">
                <IconButton 
                  onClick={e => setAnchorElUser(e.currentTarget)} 
                  sx={{ p: 0 }}
                >
                  <Avatar alt={user.name} src={user.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map(setting => (
                  <MenuItem key={setting} onClick={() => {
                    setAnchorElUser(null)

                    switch (setting) {
                      case 'Sair':
                        handleSignOut()
                        break;
                      case 'Perfil':
                        setIsDrawerOpen(true)
                        break;
                      default:
                        break;
                    }
                  }}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </Box>
  );
};

export { AppBar }