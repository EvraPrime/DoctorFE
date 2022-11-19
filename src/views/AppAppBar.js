import * as React from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import { Link as RouterLink } from 'react-router-dom';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
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
            to="/terms"
            sx={{ fontSize: 16 }}
          >
            {'Điều khoản'}
          </Link>
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
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
