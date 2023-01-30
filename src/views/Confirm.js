import React from 'react';
import Button from '../components/Button';
import { Divider, Grid, Box, Container, Dialog } from '@mui/material';
import Typography from '../components/Typography';
import useHttp from '../modules/use-http';
import { createNewBill } from '../api/booking';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import MaleIcon from '@mui/icons-material/Male';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import swal from 'sweetalert';
import { AuthContext } from '../store/auth-context';

const initialOptions = {
  "client-id": "AcjQJ0N4-2VMaE-pld0udl00VDUpqg2XeecdCpCSom6u-NKZi481SyzPOaK5h77vr46RvWmt_FtCIOcA",
  currency: "USD",
  intent: "capture",
  locale: "en_VN"
};

function Confirm(props) {
  const { user } = React.useContext(AuthContext);
  const { prevStep, nextStep, handleClick, service } = props;
  const [ checkout, setCheckOut ] = React.useState(false);
  const { data, status, error, sendRequest } = useHttp(createNewBill);

  React.useEffect(() => {
    if (status === 'completed') {
      if (error) {
        swal('Thất bại', error, 'error');
      } else {
        swal('Thành công', 'Đã thành công thanh toán', "success");
        handleClick("barCode", data.success);
        nextStep();
      }
    }
  }, [data, error, status]);

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
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
      <Box display="flex" alignItems="center" flexDirection="column">
        <Divider variant="middle" sx={{ borderBottomWidth: 2, width: '100%', maxWidth: 500, mt: 1 }}/>
        <Grid container width='100%' sx={{ maxWidth: 500, mt: 1 }}>
          <Grid item xs={4}>
            <Button
              onClick={prevStep}
              sx={{
                bgcolor: "transparent",
                ':hover': {
                  bgcolor: "transparent"
                }
              }}
            >Quay lại</Button>
          </Grid>
          <Grid item xs={8}>
            <Button variant="contained" color="info" 
              onClick={() => {
                setCheckOut(true);
              }}>
              Xác nhận
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog fullWidth maxWidth="xs" open={checkout}>
        <Container sx={{ mt: 5, mb: 5, display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons 
                createOrder={(data, actions) => {
                  return actions.order.create({
                      purchase_units: [
                          {
                              description: "Doctor apointment - MedBook",
                              amount: {
                                currency_code: "USD",
                                value: service.price,
                              },
                          },
                      ],
                  });
              }}
              onApprove={async(data, actions) => {
                const order = await actions.order.capture();
                console.log(order.id);
                sendRequest({...service, transactionID: order.id, user: user.username });
              }}
              onError={(err) => {
                swal('Có lỗi xảy ra', err, 'error');
              }}
            />
          </PayPalScriptProvider>
          <Button onClick={()=>setCheckOut(false)}>Hủy</Button>
        </Container>
      </Dialog>
    </Container>
  );
}


export default Confirm;