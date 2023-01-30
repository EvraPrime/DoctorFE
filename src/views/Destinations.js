import React from 'react';
import { useEffect } from "react";
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Container } from '@mui/material';
import useHttp from '../modules/use-http';
import { getAllHospitals } from '../api/booking'
import LoadingBox from '../components/LoadingBox';

function Destinations(props) {
  const { nextStep, handleClick } = props;

  const [ content, setContent ] = React.useState("");
  const { data, error, status, sendRequest } = useHttp(getAllHospitals);
  
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (status === 'completed' && data) {
      setContent(data);
    }
  }, [data, status, setContent]);

  if (status === 'pending' || content === '') return <LoadingBox />;

  if (error) return <h1>Đã có lỗi xảy ra</h1>;

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {content.map(row => (
          <Grid item xs={6}>
            <ListItemButton 
              onClick={() => {
                handleClick('hospitalID', row.hospitalID);
                handleClick('hospitalName', row.name);
                handleClick('hospitalAddress', row.address);
                nextStep();
              }}
              sx={{ 
                borderRadius: 2,
                border: '3px solid',
                borderColor: '#C5C5C5',
                ':hover': {
                  border: '3px solid',
                  borderColor: '#3c52b2',
                }}}>
              <ListItem>
                <Avatar alt="NOT FOUND" src={row.image} sx={{ width: 56, height: 56, mr: 2 }}/>
                <ListItemText primary={row.name} secondary={row.address} />
              </ListItem>
            </ListItemButton>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Destinations;