import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import Background from '../images/doctorHero.png';
import { Link as RouterLink } from 'react-router-dom';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${Background})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      <img
        style={{ display: 'none' }}
        src={ Background }
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Check your heath
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Sign up right now to have some special offers
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component={ RouterLink }
        to="/sign-up"
        sx={{ minWidth: 200 }}
      >
        Sign Up
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}
