import * as React from 'react';
import dayjs from 'dayjs';
import n1 from 'dayjs/locale/vi'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import useHttp from '../modules/use-http';
import { createNewPatients } from '../api/booking';
import swal from 'sweetalert';

const mapJob = [ "Bác sĩ", "Điều dưỡng", "Y sĩ", "Kỹ sư điện", "Thợ mộc", "Thợ làm bánh", "Làm thuê", "Họa sĩ", "Giáo viên", "Giảng viên", "Sinh viên", "Học sinh" ]
const ethnic = [ "Kinh", "Hoa", "Tày", "Thái", "Mường" ]

function AddPatientForm(props) {
  const username = props.username;
  const [ value, setValue ] = React.useState([]);
  const [ date, setDate ] = React.useState(dayjs().format("MM-DD-YYYY"));
  const [ num, setNum ] = React.useState(null);
  const [ cmnd, setCMND ] = React.useState(null);
  const [ eth, setEth ] = React.useState("");

  const { open, setOpen } = props;

  const handleClose = () => {
    setValue([]);
    setDate(dayjs().format("MM-DD-YYYY"));
    setNum("");
    setCMND("");
    setEth("");
    setOpen(false);
  };

  const handleChange = input => e => {
    setValue({ ...value, [input]: e.target.value });
  };

  const { error, status, sendRequest } = useHttp(createNewPatients);

  const handleSubmit = () => {
    if (value === null || date === null || num === null || cmnd === null || eth === null
      || eth === "" || date === "" || num === "" || cmnd === "") {
      swal("Đã có lỗi xảy ra", "Vui lòng điền đầy đủ thông tin", "error")
    }
    else {
      sendRequest({ ...value, username: username })
    }
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (error) {
        swal('Thất bại', error, 'error');
      } else {
        swal('Thành công', 'Đã thành công thêm một hồ sơ bệnh nhân', "success");
        handleClose();
      }
    }
  }, [error, status]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Thêm hồ sơ bệnh nhân</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              name="name"
              label="Họ và tên"
              fullWidth
              variant="outlined"
              value={value.name}
              onChange={handleChange('name')}
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale={n1}>
              <DatePicker
                label="Ngày sinh"
                inputFormat="DD/MM/YYYY"
                value={date}
                disableFuture="true"
                onChange={(newValue) => {
                  setDate(newValue);
                  setValue({ ...value, "dob": dayjs(newValue).format("MM-DD-YYYY")});
                }}
                renderInput={(params) => <TextField margin='dense' fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              name="phone"
              label="Số điện thoại"
              fullWidth
              variant="outlined"
              onChange={(e) => {
                const regex = /^[0-9\b]+$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setNum(e.target.value);
                  setValue({ ...value, "phone": e.target.value});
                }
              }}
              value={num}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Giới tính"
              select
              required
              name="gender"
              fullWidth
              value={value.gender}
              onChange={handleChange('gender')}>
              <MenuItem value={"Nam"}>Nam</MenuItem>
              <MenuItem value={"Nữ"}>Nữ</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Nghề nghiệp"
              select
              required
              name="job"
              fullWidth
              value={value.job}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      transform: 'translate3d(0, 0, 0)',
                      maxHeight: '30%'
                    } 
                  }   
                }
              }}
              onChange={handleChange('job')}>
              {mapJob.map(row => (
                <MenuItem value={row}>{row}</MenuItem> 
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              name="cmnd"
              label="CMND"
              fullWidth
              variant="outlined"
              onChange={(e) => {
                const regex = /^[0-9\b]+$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setCMND(e.target.value);
                  setValue({ ...value, "cmnd": e.target.value});
                }
              }}
              value={cmnd}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              type="email"
              value={value.email}
              onChange={handleChange('email')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Dân tộc"
              select
              name="ethnic"
              fullWidth
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      transform: 'translate3d(0, 0, 0)',
                      maxHeight: '30%'
                    } 
                  }
                }
              }}
              value={eth}
              onChange={(e) => {
                setEth(e.target.value);
                setValue({...value, "ethnic": e.target.value});
              }}
              InputProps={{
                endAdornment: (
                  <>
                  {eth !== "" ? 
                    <IconButton
                      sx={{ mr: 2 , visibility: eth ? "visible" : "hidden" }}
                      onClick={() => {
                        setEth("");
                        setValue({...value, "ethnic": ""});
                      }}>
                      <ClearIcon />
                    </IconButton> 
                  : <></>}
                  </>
                )
              }}>
              {ethnic.map(row => (
                <MenuItem value={row}>{row}</MenuItem> 
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              autoFocus
              required
              margin="dense"
              name="address"
              label="Địa chỉ"
              fullWidth
              variant="outlined"
              value={value.address}
              onChange={handleChange('address')}
              sx={{overflowWrap: "break-word"}}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleSubmit}>Thêm</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddPatientForm;