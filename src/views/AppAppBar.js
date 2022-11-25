import React, { useContext, useEffect } from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Button from '../components/Button';
import Toolbar from '../components/Toolbar';
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
  const authCtx = useContext(AuthContext);
  const { user, setUser } = authCtx;
  const { data, status, sendRequest } = useHttp(signout);

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        setUser(data);
      } else setUser(null);

    }
  }, [data, setUser, status]);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link
            component={ RouterLink }
            variant="h6"
            underline="none"
            color="inherit"
            to="/"
            sx={{ fontSize: 24, mr: 2 }}
          >
            {'medbook'}
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
          {
            user !== null ?
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={ sendRequest }
                variant="h6"
                underline="none"
                sx={{ ...rightLink, color: 'secondary.main' }}
              >
                {'Sign Out'}
              </Button>
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
