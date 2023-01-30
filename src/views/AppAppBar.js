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
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

const normal = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
  padding: "8px 15px",
  float: "left",
  display: "block",
  borderBottom: "3px solid transparent",
}

const active = {
  color: "red",
  textDecoration: "none",
  fontSize: "18px",
  padding: "8px 15px",
  float: "left",
  display: "block",
  borderBottom: "3px solid red",
}

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
          <NavLink
            to="/"
            style={({ isActive }) => isActive ? active : normal}
          >
            Trang chủ
          </NavLink>
          <Box sx={{ width: 15 }}/>
          <NavLink
            to="/about"
            style={({ isActive }) => isActive ? active : normal}
          >
            Giới thiệu
          </NavLink>
          <Box sx={{ width: 15 }}/>
          <NavLink
            to="/blogs"
            style={({ isActive }) => isActive ? active : normal}
          >
            Tin tức
          </NavLink>
          <Box sx={{ width: 15 }}/>
          <NavLink
            to={user ? "/booking" : "/sign-in"}
            style={({ isActive }) => isActive ? active : normal}
          >
            Dịch vụ
          </NavLink>
          { (user !== undefined && user !== null) ?
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography sx={{ mr: 3, mt: 1, color: "red" }}>{user.username}</Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "red" }} alt="Remy Sharp"/>
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
                <MenuItem onClick={ sendRequest }>
                  <Typography textAlign="center">Đăng xuất</Typography>
                </MenuItem>
                <MenuItem component={ RouterLink } to="/account">
                  <Typography textAlign="center">Thông tin tài khoản</Typography>
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
              {'Đăng nhập'}
            </Link>
            <Link
              component={ RouterLink }
              variant="h6"
              underline="none"
              to="/sign-up"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Đăng ký'}
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
