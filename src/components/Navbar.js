import * as React from 'react';

// Navbar Imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';

// Icon Imports
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import imgAvatar from '../assets/avatar.png'

// Config Imports
import { pages, settings } from "../config";

const Navbar = ({address, setAddress, setLocation, mode, setMode}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    setLocation(page);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const flipTheme = () => {
    return (mode === 'light' ? 'dark' : 'light');

  };

  const handleThemeMode = () => {
    console.log("im in color mode!!");
    setMode(flipTheme());
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            D4CBooks
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>                      {/* Render Left Side of Navbar When Logged In */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            { address &&
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
            }
          </Box>
          <AutoStoriesIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          {/* Render Left Side of Navbar When Logged In */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            { address && 
              pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))
            }
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            <Badge variant="dot" color="error">
              <Tooltip title="Profile Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Account Avatar" src={imgAvatar} />
                </IconButton>
              </Tooltip>              
            </Badge>
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
              onClose={handleCloseUserMenu}
            >
              
              { // eslint-disable-next-line
              settings.map((setting) => {
                if (address && setting === "Account") {
                  return (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <AccountBalanceWalletIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                      <Typography textAlign="center">{setting}: {address.slice(0, 6)}...{address.slice(-4)}</Typography>
                    </MenuItem>
                  )
                }             
                if (address && setting === "Upgrade") {
                  return (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <UpgradeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                      <Badge variant="dot" color="error">
                        <Typography textAlign="center">Upgrade to Premium</Typography>
                      </Badge>
                    </MenuItem>
                  )
                }  
                if (setting === "Theme") {
                  return (
                    <MenuItem key={setting} onClick={handleThemeMode}>
                      { mode === 'dark'? <Brightness7Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> : <Brightness4Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />}
                      <Typography textAlign="center" style={{textTransform: "capitalize"}}>Switch to {flipTheme()} Mode</Typography>
                    </MenuItem>   
                  )         
                }   
                 if (address && setting === "Logout") {
                  return (
                    <MenuItem key={setting} onClick={() => setAddress(null)}>
                      <LogoutIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  )       
                }      
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
