import React from 'react';
import Button from '@mui/material/Button';
import { Container, Box, Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '../components/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import MaleIcon from '@mui/icons-material/Male';
import Grid from '@mui/material/Unstable_Grid2';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import useHttp from '../modules/use-http';
import { getAllPatients } from '../api/booking';
import LoadingBox from '../components/LoadingBox';
import PatientForm from './PatientForm';
import { AuthContext } from '../store/auth-context';
import dayjs from 'dayjs';

function Patient(props) {
  const { user } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const { prevStep, nextStep, handleClick } = props;

  const [ content, setContent ] = React.useState([]);
  const { data, error, status, sendRequest } = useHttp(getAllPatients);
  
  React.useEffect(() => {
    sendRequest(user);
  }, [sendRequest, open]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setContent(data);
      console.log(data);
    }
  }, [data, status, setContent]);

  if (status === 'pending') return <LoadingBox />;

  if (error) return <h1>Đã có lỗi xảy ra</h1>;

  return (
    <Container sx={{ mt: 5, mb: 5}}>
      <Box sx={{ flex: 1, display:'flex', justifyContent:'center' }}>
        <List sx={{ width: '100%', maxWidth: 500 }}>
          { content !== null ?
          content.map(row => (
            <ListItem               
              sx={{ 
                mt: 2,
                borderRadius: 2,
                border: '3px solid',
                borderColor: '#C5C5C5',
                ':hover': {
                  border: '3px solid',
                  borderColor: '#3c52b2',
              }}}>
              <Grid container spacing={1}>
                <Grid item xs={1}>
                  <AccountCircleOutlinedIcon sx={{ fontSize: 20 }}/>
                </Grid>
                <Grid item xs={11}>
                  <Typography><b>{row.name}</b></Typography>
                </Grid>

                <Grid item xs={1}>
                  <CakeOutlinedIcon sx={{ fontSize: 20 }}/>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Ngày sinh</Typography>
                </Grid>
                <Grid item xs={6} xsOffset={1}>
                  <Typography sx={{wordWrap: "break-word"}}>{dayjs(row.dob).format("DD/MM/YYYY")}</Typography>
                </Grid>

                <Grid item xs={1}>
                  <PhoneIphoneOutlinedIcon sx={{ fontSize: 20 }}/>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Số điện thoại</Typography>
                </Grid>
                <Grid item xs={6} xsOffset={1}>
                  <Typography sx={{wordWrap: "break-word"}}>{row.phone}</Typography>
                </Grid>

                <Grid item xs={1}>
                  <MaleIcon sx={{ fontSize: 20 }}/>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Giới tính</Typography>
                </Grid>
                <Grid item xs={6} xsOffset={1}>
                  <Typography sx={{wordWrap: "break-word"}}>{row.gender}</Typography>
                </Grid>

                <Grid item xs={1}>
                  <ContactsOutlinedIcon sx={{ fontSize: 20 }}/>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Dân tộc</Typography>
                </Grid>
                <Grid item xs={6} xsOffset={1}>
                  <Typography sx={{wordWrap: "break-word"}}>{row.ethnic}</Typography>
                </Grid>

                <Grid item xs={1}>
                  <LocationOnOutlinedIcon sx={{ fontSize: 20 }}/>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Địa chỉ</Typography>
                </Grid>
                <Grid item xs={6} xsOffset={1}>
                  <Typography sx={{wordWrap: "break-word"}}>{row.address}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider variant="middle" />
                </Grid>

                <Grid item xs={3}>
                  <Button variant="outlined" color="error">Xóa</Button>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="outlined" color="info">Sửa</Button>
                </Grid>
                <Grid item xs={5} xsOffset='auto'>
                  <Button variant="contained" color="info">Tiếp tục</Button>
                </Grid>
              </Grid>
            </ListItem>
          ))
          :
          <ListItemText>Chưa có hồ sơ bệnh nhân</ListItemText>
          }
        </List>
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
          <Grid item xs={5} xsOffset="auto">
            <Button variant="contained" color="info" onClick={()=> { setOpen(true) }}>
              Thêm hồ sơ
            </Button>
          </Grid>
        </Grid>
      </Box>
      <PatientForm username={user.username} open={open} setOpen={setOpen}/>
    </Container>
  );
}

export default Patient;