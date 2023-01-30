import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import Background from '../images/doctorHero.png';
import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';

export default function ProductHero() {
  const { user } = React.useContext(AuthContext);

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${Background})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Typography color="inherit" align="center" variant="h3" marked="center">
          Đặt lịch khám bệnh
        </Typography>
        <Typography
          color="inherit"
          align="left"
          variant="h5"
          sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
        >
          ✓ Tiện lợi<br/>✓ Chính xác<br/>✓ Chuyên nghiệp
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          align="center"
          component={ RouterLink }
          sx={{ minWidth: 200, width: "50%" }}
          to={user ? "/booking" : "/sign-in"}
        >
          Bắt đầu ngay
        </Button>
      </Box>
    </ProductHeroLayout>
  );
}
