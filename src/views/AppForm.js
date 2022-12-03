import * as React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '../components/Paper';
import Button from '../components/Button';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Background from '../images/appCurvyLines.png';

function AppForm(props) {
  const { children } = props;

  return (
    <Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 10 }}>
        <Button component={ RouterLink } to='/'>
          <ArrowBackIcon sx={{ mr: 1 }} />
          Back to Main page
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          backgroundImage: `url(${Background})`,
          backgroundRepeat: 'no-repeat',
        }}>
        <Container maxWidth="sm">
          <Box sx={{ mb: 9 }}>
            <Paper
              background="light"
              sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 } }}
            >
              {children}
            </Paper>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

AppForm.propTypes = {
  children: PropTypes.node,
};

export default AppForm;
