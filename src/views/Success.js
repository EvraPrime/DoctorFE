import React from 'react';
import Barcode from 'react-barcode';
import { Container } from '@mui/system';
import Typography from '../components/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import MaleIcon from '@mui/icons-material/Male';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Success(props) {
  const { service } = props;
    return (
      <Container sx={{ mt: 5, mb: 5 }}>
        <>
            <h1>Bạn đã thanh toán thành công</h1>
            <p>Dưới đây là thông tin phiếu khám bệnh của bạn</p>
        </>
        <Barcode value={service.barCode} displayValue="true"/>
        <Box display="flex" alignItems="center" flex={1}>
        <Grid container spacing={1} width='100%' sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography align="left" sx={{ color: "white", bgcolor: "rgb(255,0,0)", pl: 5 }}>Xác nhận thông tin khám</Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Tên bệnh viên</TableCell>
                    <TableCell>Địa chỉ</TableCell>
                    <TableCell>Tên bác sĩ</TableCell>
                    <TableCell>Chuyên khoa</TableCell>
                    <TableCell align="right">Ngày</TableCell>
                    <TableCell align="right">Giá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {service.hospitalName}
                    </TableCell>
                    <TableCell>{service.hospitalAddress}</TableCell>
                    <TableCell>{service.doctorName}</TableCell>
                    <TableCell>{service.department}</TableCell>
                    <TableCell align="right">{`${service.date} ${service.time}`}</TableCell>
                    <TableCell align="right">{service.price}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left" sx={{ color: "white", bgcolor: "rgb(255,0,0)", pl: 5 }}>Xác nhận hồ sơ khám</Typography>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={2}>
              <Box sx={{ ml: 2, display: 'flex', flexDirection: 'row' }}>
                <AccountCircleOutlinedIcon sx={{ fontSize: 20 }}/>
                <Typography sx={{ ml: 1 }}><b>Tên:</b></Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography align="left">{service.patientName}</Typography>
            </Grid>

            <Grid item xs={2}>
              <Box sx={{ ml: 2, display: 'flex', flexDirection: 'row' }}>
                <CakeOutlinedIcon sx={{ fontSize: 20 }}/>
                <Typography sx={{ ml: 1 }}><b>Ngày sinh:</b></Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography align="left" sx={{wordWrap: "break-word"}}>{service.dob}</Typography>
            </Grid>

            <Grid item xs={2}>
              <Box sx={{ ml: 2, display: 'flex', flexDirection: 'row' }}>
                <PhoneIphoneOutlinedIcon sx={{ fontSize: 20 }}/>
                <Typography sx={{ ml: 1 }}><b>Số điện thoại:</b></Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography align="left" sx={{wordWrap: "break-word"}}>{service.phone}</Typography>
            </Grid>

            <Grid item xs={2}>
              <Box sx={{ ml: 2, display: 'flex', flexDirection: 'row' }}>
                <MaleIcon sx={{ fontSize: 20 }}/>
                <Typography sx={{ ml: 1 }}><b>Giới tính:</b></Typography>
              </Box>            
            </Grid>
            <Grid item xs={4}>
              <Typography align="left" sx={{wordWrap: "break-word"}}>{service.gender}</Typography>
            </Grid>

            <Grid item xs={2}>
              <Box sx={{ ml: 2, display: 'flex', flexDirection: 'row' }}>
                <AlternateEmailIcon sx={{ fontSize: 20 }}/>
                <Typography sx={{ ml: 1 }}><b>Email:</b></Typography>
              </Box>             
            </Grid>
            <Grid item xs={4}>
              <Typography align="left" sx={{wordWrap: "break-word"}}>{service.email}</Typography>
            </Grid>

            <Grid item xs={2}>
              <Box sx={{ ml: 2, display: 'flex', flexDirection: 'row' }}>
                <LocationOnOutlinedIcon sx={{ fontSize: 20 }}/>
                <Typography sx={{ ml: 1 }}><b>Địa chỉ:</b></Typography>
              </Box>              
            </Grid>
            <Grid item xs={4}>
              <Typography align="left" sx={{wordWrap: "break-word"}}>{service.patientAddress}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      </Container>
    );
}

export default Success;