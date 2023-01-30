import React from 'react';
import { useEffect } from "react";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Container } from '@mui/material';
import useHttp from '../modules/use-http';
import { getAllDoctors } from '../api/booking'
import LoadingBox from '../components/LoadingBox';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '../components/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MedicationIcon from '@mui/icons-material/Medication';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MaleIcon from '@mui/icons-material/Male';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function Doctors(props) {
  const { prevStep, nextStep, handleClick } = props;
  const { service } = props;
  const [ content, setContent ] = React.useState("");
  const { data, error, status, sendRequest } = useHttp(getAllDoctors);
  
  useEffect(() => {
    sendRequest(service.hospitalID);
  }, [sendRequest]);

  useEffect(() => {
    if (status === 'completed' && data) {
      setContent(data);
      console.log(data);
    }
  }, [data, status, setContent]);

  if (status === 'pending' || content === '') return <LoadingBox />;

  if (error) return <h1>Đã có lỗi xảy ra</h1>;

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Box sx={{ flex: 1, display:'flex', justifyContent:'center' }}>
        <List sx={{ width: '100%', maxWidth: 500 }}>
          { content.map(row => (
            <ListItemButton 
            onClick={() => {
              handleClick('doctorID', row.doctorID);
              handleClick('doctorName', row.name);
              handleClick('department', row.department);
              handleClick('price', row.price);
              handleClick('weekday', row.weekday);
              nextStep();
            }}
            sx={{ 
              mb: 1,
              borderRadius: 2,
              border: '3px solid',
              borderColor: '#C5C5C5',
              ':hover': {
                border: '3px solid',
                borderColor: '#3c52b2',
              }}}>
              <ListItem>
              <Grid container spacing={1}>
                <Grid item xs={1}>
                  <AccountCircleOutlinedIcon sx={{ fontSize: 20 }}/>
                </Grid>
                <Grid item xs={11}>
                  <Typography><b>{row.position + " " + row.name}</b></Typography>
                </Grid>

                <Grid item xs={1}>
                  <MaleIcon sx={{ fontSize: 20 }}/>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Giới tính</Typography>
                </Grid>
                <Grid item xs={7} xsOffset={1}>
                  <Typography sx={{wordWrap: "break-word"}}>{row.gender}</Typography>
                </Grid>

                <Grid item xs={1}>
                  <MedicationIcon sx={{ fontSize: 20 }}/>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Chuyên khoa</Typography>
                </Grid>
                <Grid item xs={7} xsOffset={1}>
                  <Typography sx={{wordWrap: "break-word"}}>{row.department}</Typography>
                </Grid>

                <Grid item xs={1}>
                  <CalendarMonthIcon sx={{ fontSize: 20 }}/>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Lịch khám</Typography>
                </Grid>
                <Grid item xs={7} xsOffset={1}>
                  <Typography sx={{wordWrap: "break-word"}}>{row.weekday}</Typography>
                </Grid>

                <Grid item xs={1}>
                  <AttachMoneyIcon sx={{ fontSize: 20 }}/>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Giá</Typography>
                </Grid>
                <Grid item xs={7} xsOffset={1}>
                  <Typography sx={{wordWrap: "break-word"}}>{`${row.price} USD`}</Typography>
                </Grid>
              </Grid>
              </ListItem>
            </ListItemButton>
        ))}
        </List>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Divider variant="middle" sx={{ borderBottomWidth: 2, width: '100%', maxWidth: 500, mt: 1 }}/>
          <Button
            onClick={prevStep}
            sx={{
              bgcolor: "transparent",
              ':hover': {
                bgcolor: "transparent"
              }
            }}
          >Quay lại</Button>
      </Box>
    </Container>
  );
}

export default Doctors;