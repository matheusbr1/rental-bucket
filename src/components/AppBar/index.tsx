import React, { useCallback }  from 'react'
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
import { useCookies } from 'react-cookie'
import { IDefaultRootState } from 'interfaces'
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

const settings: IConfig[] = [
  { label: 'Dashboard', destiny: '/dashboard' },
  { label: 'Perfil', destiny: '/profile' },
  { label: 'Sair', destiny: '/' },
]

const AppBar = () => {
  const avatar = useSelector((state: IDefaultRootState) => state.user.data.avatar)

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const history = useHistory()

  const dispatch = useDispatch()

  const [, , removeCookies] = useCookies(['rentalbucket.token'])

  const handleSignOut = useCallback(async () => {
    dispatch(signOut())

    removeCookies('rentalbucket.token')

    history.push('/')
  }, [dispatch, history, removeCookies])

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
              <Tooltip title="Open settings">
                <IconButton 
                  onClick={e => setAnchorElUser(e.currentTarget)} 
                  sx={{ p: 0 }}
                >
                  <Avatar alt="Remy Sharp" src={avatar} />
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
                {settings.map(({ label, destiny }) => (
                  <MenuItem key={label} onClick={() => {
                    setAnchorElUser(null)
                    destiny === '/' 
                      ? handleSignOut()
                      : history.push(destiny)
                  }}>
                    <Typography textAlign="center">{label}</Typography>
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