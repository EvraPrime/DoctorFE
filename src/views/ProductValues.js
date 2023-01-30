import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import CardMedia from '@mui/material/CardMedia';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 15, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src={require('../images/productCurvyLines.png')}
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <CardMedia
                component="img"
                sx={{ display: { xs: 'none', sm: 'block' }, objectFit: "contain" }}
                image={require('../images/value1.jpg')}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Nhanh chóng
              </Typography>
              <Typography variant="h5">
                Bệnh nhân chủ động chọn thông tin đặt khám (ngày khám và giờ khám)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <CardMedia
                component="img"
                sx={{ display: { xs: 'none', sm: 'block' }, objectFit: "contain" }}
                image={require('../images/value2.jpg')}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Dễ dàng
              </Typography>
              <Typography variant="h5">
                Người dùng chọn và thực hiện thanh toán trên phần mềm
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <CardMedia
                component="img"
                sx={{ display: { xs: 'none', sm: 'block' }, objectFit: "contain" }}
                image={require('../images/value3.jpg')}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Nhận phiếu trực tuyến
              </Typography>
              <Typography variant="h5">
                Bệnh nhân sẽ nhận phiếu khám trực tuyến ngay trên phần mềm
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
