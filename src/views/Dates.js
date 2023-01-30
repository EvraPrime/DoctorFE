import React from 'react';
import dayjs from 'dayjs';
import n1 from 'dayjs/locale/vi'
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import Typography from '../components/Typography';
import Radio from '@mui/material/Radio';
import swal from 'sweetalert';
import useHttp from '../modules/use-http';
import { getAllBills } from '../api/booking'

function Doctors(props) {
  const { prevStep, nextStep, handleClick } = props;
  const [ date, setDate ] = React.useState();
  const { service } = props;

  const [ value, setValue ] = React.useState();

  const [ time, setTime ] = React.useState();
  const { data, status, sendRequest } = useHttp(getAllBills);

  const [ t1 , setT1 ] = React.useState(false);
  const [ t2 , setT2 ] = React.useState(false);
  const [ t3 , setT3 ] = React.useState(false);
  const [ t4 , setT4 ] = React.useState(false);

  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setTime(data);
    }
  }, [data, status, setTime]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function disableDays(date) {
    switch (service.weekday) {
      case "Thứ 2":
        return date.day() !== 1;
      case "Thứ 3":
        return date.day() !== 2;
      case "Thứ 4":
        return date.day() !== 3;
      case "Thứ 5":
        return date.day() !== 4;
      case "Thứ 6":
        return date.day() !== 5;
      case "Thứ 7":
        return date.day() !== 6;
      case "Chủ nhật":
        return date.day() !== 0;
      default:
        return false;
    }
  }

  const getMaxDate = () => {
    const today = new Date();
    return new Date(new Date().setDate(today.getDate() + 30));
  }

  const disableTime = (d) => {
    setT1(false);
    setT2(false);
    setT3(false);
    setT4(false);
    time.forEach(element => {
      if (element.date === dayjs(d).format("DD-MM-YYYY")) {
        if (element.time === "07:00-08:00") {
          setT1(true);
        }
        if (element.time === "08:00-09:00") {
          setT2(true);
        }
        if (element.time === "09:00-10:00") {
          setT3(true);
        }
        if (element.time === "10:00-11:00") {
          setT4(true);
        }
      }
    });
  }

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Box sx={{ flex: 1, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' }}>
        <Typography sx={{ mr: 40 }}><b>Chọn ngày</b></Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={n1}>
          <CalendarPicker 
            maxDate={getMaxDate()}
            dayOfWeekFormatter={(day) => `${day}`}
            shouldDisableDate={disableDays} disablePast="true" date={date} onChange={(newDate) => {
              setDate(newDate);
              disableTime(newDate);
              setValue(null);
              }}/>
        </LocalizationProvider>
        <Typography sx={{ mr: 40 }}><b>Chọn giờ</b></Typography>
      </Box> 
      <Box sx={{ flex: 1, display:'flex', justifyContent:'center', alignItems: 'center' }}>
        <Radio checked={value === '07:00-08:00'} 
          disabled={t1}
          onChange={handleChange} 
          value="07:00-08:00"/>
        <Typography>07:00-08:00</Typography>
        <Radio checked={value === '08:00-09:00'} 
          disabled={t2}
          onChange={handleChange} 
          value="08:00-09:00"/>
        <Typography>08:00-09:00</Typography>
        <Radio checked={value === '09:00-10:00'} 
          disabled={t3}
          onChange={handleChange} 
          value="09:00-10:00"/>
        <Typography>09:00-10:00</Typography>
        <Radio checked={value === '10:00-11:00'} 
          disabled={t4}
          onChange={handleChange} 
          value="10:00-11:00"/>
        <Typography>10:00-11:00</Typography>
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
                if (date === undefined || date === null || value === undefined || value === null) {
                  swal('Lỗi', 'Vui lòng chọn ngày và giờ khám bệnh', 'error');
                }
                else {
                  console.log(date);
                  handleClick('date', dayjs(date).format("DD-MM-YYYY"));
                  handleClick('time', value);
                  nextStep();
                }
              }}>
              Tiếp tục
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Doctors;