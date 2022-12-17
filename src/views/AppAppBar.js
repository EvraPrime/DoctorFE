import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { IconButton, Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import AppBar from '../components/AppBar';
import { useNavigate } from "react-router-dom";
import Toolbar from '../components/Toolbar';
import Typography from '../components/Typography';
import useHttp from '../modules/use-http';
import { signout } from '../api/auth'
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  let navigate = useNavigate();
//  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const authCtx = useContext(AuthContext);
  const { user, setUser } = authCtx;
  const { data, status, sendRequest } = useHttp(signout);

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        setUser(data);
      } else {
        setUser(null);
      }
      navigate("/");
    }
  }, [data, setUser, status]);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box 
            component="img" 
            sx={{ height:30, width: 30 }} 
            alt="logo"
            src={require('../images/medLogo.png')}/>
          <Link
            component={ RouterLink }
            variant="h5"
            underline="none"
            color="inherit"
            to="/"
            sx={{ fontSize: 25, mr: 2 }}
          >
            {'edbook'}
          </Link>
          <Link
            component={ RouterLink }
            variant="h6"
            underline="none"
            color="inherit"
            to="/"
            sx={{ fontSize: 16 }}
          >
            {'Trang chủ'}
          </Link>
          <Box sx={{ width: 15 }}/>
          <Link
            component={ RouterLink }
            variant="h6"
            underline="none"
            color="inherit"
            to="/about"
            sx={{ fontSize: 16 }}
          >
            {'Giới thiệu'}
          </Link>
          <Box sx={{ width: 15 }}/>
          <Link
            component={ RouterLink }
            variant="h6"
            underline="none"
            color="inherit"
            to="/blogs"
            sx={{ fontSize: 16 }}
          >
            {'Tin tức'}
          </Link>
          <Box sx={{ width: 15 }}/>
          <Link
            component={ RouterLink }
            variant="h6"
            underline="none"
            color="inherit"
            to={ user !== null ? "/booking" : "/sign-in"}
            sx={{ fontSize: 16 }}
          >
            {'Dịch vụ'}
          </Link>
          { user !== null ?
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp"/>
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
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={sendRequest}>
                  <Typography textAlign="center">Đăng xuất</Typography>
                </MenuItem>
                <MenuItem component={ RouterLink } to="/booking">
                  <Typography textAlign="center">Hồ sơ bệnh nhân</Typography>
                </MenuItem>
              </Menu>
            </Box>
            :
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              component={ RouterLink }
              color="inherit"
              variant="h6"
              underline="none"
              to="/sign-in"
              sx={rightLink}
            >
              {'Sign In'}
            </Link>
            <Link
              component={ RouterLink }
              variant="h6"
              underline="none"
              to="/sign-up"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Sign Up'}
            </Link>
          </Box>
          }
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
