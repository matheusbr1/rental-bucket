import React, { useCallback } from 'react'

import Bar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import Badge from "@material-ui/core/Badge"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import SearchIcon from "@material-ui/icons/Search"
import NotificationsIcon from "@material-ui/icons/Notifications"
import MoreIcon from "@material-ui/icons/MoreVert"
import LogoutIcon from "@material-ui/icons/ExitToApp"
import { fade, makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { useGoogleLogin } from 'react-use-googlelogin'
import { useHistory } from 'react-router'

import { Container } from './styles'

interface AppBarProps {
  search?: boolean
}

const AppBar: React.FC<AppBarProps> = ({ search=true }) => {

  const googleAuth = useGoogleLogin({
    // clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID as string
    clientId: '745815052969-p903q9vcfpgb21vtc8egf7fg86ihu425.apps.googleusercontent.com'
  })

  const history = useHistory()

  const handleSignOut = useCallback(async () => {
    const { signOut, isSignedIn } = googleAuth

    await signOut()

    !isSignedIn && history.push('/')
  }, [googleAuth, history])

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      grow: {
        flexGrow: 1
      },
      menuButton: {
        marginRight: theme.spacing(2)
      },
      title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
          display: "block"
        }
      },
      search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(3),
          width: "auto"
        }
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      inputRoot: {
        color: "inherit"
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
          width: "20ch"
        }
      },
      sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
          display: "flex"
        }
      },
      sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
          display: "none"
        }
      }
    })
  )

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleOtherOptionsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => history.push('/customers')}>Clientes</MenuItem>
      <MenuItem onClick={() => history.push('/drivers')}>Motoristas</MenuItem>
      <MenuItem onClick={() => history.push('/trucks')}>Caminhões</MenuItem>
      <MenuItem onClick={() => history.push('/works')}>Serviços</MenuItem>
    </Menu>
  )

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem  onClick={() => history.push('/works')}>
        <p>Serviços</p>
      </MenuItem>

      <MenuItem  onClick={() => history.push('/customers')}>
        <p>Clientes</p>
      </MenuItem>

      <MenuItem  onClick={() => history.push('/drivers')}>
        <p>Motoristas</p>
      </MenuItem>

      <MenuItem  onClick={() => history.push('/trucks')}>
        <p>Caminhões</p>
      </MenuItem>

      <MenuItem onClick={handleSignOut}>
        <p>Sair</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Container className={classes.grow}>
      <Bar position="static">
        <Toolbar>
          
          <Typography className={classes.title} variant="h6" noWrap>
            Rental Bucket
          </Typography>

          {search && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          )}

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleOtherOptionsMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>

            <IconButton color="inherit" onClick={handleSignOut} >
              <LogoutIcon />
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          
        </Toolbar>
      </Bar>
      {renderMobileMenu}
      {renderMenu}
    </Container>
  )
}

export default AppBar