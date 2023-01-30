import React from 'react';
import Button from '@mui/material/Button';
import { Container, Box, Divider, Paper } from '@mui/material';
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
import { getAllPatients, deletePatient, getAllBillsByUser } from '../api/booking';
import LoadingBox from '../components/LoadingBox';
import AddPatientForm from '../views/AddPatientForm';
import { AuthContext } from '../store/auth-context';
import dayjs from 'dayjs';
import swal from 'sweetalert';
import EditPatientForm from '../views/EditPatientForm';
import AppAppBar from '../views/AppAppBar';
import AppFooter from '../views/AppFooter';
import withRoot from '../modules/withRoot';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Barcode from 'react-barcode';

const options = [
  'Hồ sơ bệnh nhân',
  'Phiếu khám bệnh',
];

function Account() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const { user } = React.useContext(AuthContext);
  const [ openAdd, setOpenAdd ] = React.useState(false);
  const [ openEdit, setOpenEdit ] = React.useState(false);
  const [ patient, setPatient ] = React.useState([]);
  const [ bills, setBills ] = React.useState([]);

  const [ content, setContent ] = React.useState([]);
  const { data, error, status, sendRequest } = useHttp(getAllPatients);
  const { status: statusDelete, sendRequest: sendDeleteRequest } = useHttp(deletePatient);
  const { data: billsData, status: statusBills, sendRequest: sendBillsRequest } = useHttp(getAllBillsByUser);

  React.useEffect(() => {
    sendRequest(user);
    sendBillsRequest(user);
  }, [sendRequest, openAdd, openEdit]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setContent(data);
    }
  }, [data, status, setContent]);

  React.useEffect(() => {
    if (statusBills === 'completed' && billsData) {
      setBills(billsData);
      console.log(billsData);
    }
  }, [billsData, statusBills, setBills]);

  const handleDelete = (id) => {
    swal({
      title: "Bạn có muốn xóa hồ sơ này?",
      text: "Một khi xóa, bạn sẽ không thể khôi phục lại hồ sơ này!",
      icon: "warning",
      buttons: ["Hủy", "Xóa"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        let p = { id: id, username: user.username};
        sendDeleteRequest(p);
      }
    });
  } 

  React.useEffect(() => {
    if (statusDelete === 'completed') {
      sendRequest(user);
      swal("Xóa thành công", { icon: "success", });
    }
  }, [statusDelete]);

  if (status === 'pending') return <LoadingBox />;

  if (error) return <h1>Đã có lỗi xảy ra</h1>;

  return (
    <React.Fragment>
      <AppAppBar />
      <Typography variant="h3" gutterBottom marked="center" align="center" sx={{ mt: 7 }}>
              Thông tin tài khoản
      </Typography>
        <Grid container>
          <Grid item xs={3}>
              <Box sx={{ ml: 20, mt: 3 }}>
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
                <Divider />
                <Box display="flex" alignItems="flex-start" ml={1}>
                  <Button variant="contained" color="info" onClick={()=> { setOpenAdd(true) }}>
                    Thêm hồ sơ
                  </Button>
                </Box>
              </Box>
          </Grid>
            { selectedIndex === 0 ?
              <Grid item xs={9}>
              <Container sx={{ mt: 1, mb: 5}}>
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
    
                          <Grid item xs={3} xsOffset={6}>
                            <Button variant="outlined" color="error" onClick={() => handleDelete(row.recordID)}>Xóa</Button>
                          </Grid>
                          <Grid item xs={3}>
                            <Button variant="outlined" color="info" onClick={() => { 
                              setPatient(row); 
                              setOpenEdit(true); 
                            }}>Sửa</Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))
                    :
                    <ListItemText>Chưa có hồ sơ bệnh nhân</ListItemText>
                    }
                  </List>
                </Box>
                <AddPatientForm username={user.username} open={openAdd} setOpen={setOpenAdd}/>
                <EditPatientForm open={openEdit} setOpen={setOpenEdit} patient={patient} setPatient={setPatient}/>
              </Container>
              </Grid>
            :
              <Grid item xs={9}>
                <Container sx={{ mt: 1, mb: 5}}>
                  <Box sx={{ flex: 1, display:'flex', justifyContent:'center' }}>
                    <List sx={{ width: '100%', maxWidth: 500 }}>
                      { bills !== null ?
                      bills.map(row => (
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
                          <Barcode value={row.barCode} displayValue="true"/>
                          <ListItemText primary={row.transactionID} secondary={row.date} />
                        </ListItem>
                      ))
                      :
                      <ListItemText>Chưa có hồ sơ bệnh nhân</ListItemText>
                      }
                    </List>
                  </Box>
                  <AddPatientForm username={user.username} open={openAdd} setOpen={setOpenAdd}/>
                  <EditPatientForm open={openEdit} setOpen={setOpenEdit} patient={patient} setPatient={setPatient}/>
                </Container>
              </Grid>
            }
        </Grid>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Account);
