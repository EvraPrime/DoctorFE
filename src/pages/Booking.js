import * as React from 'react';
import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '../components/Typography';
import AppAppBar from '../views/AppAppBar';
import AppFooter from '../views/AppFooter';
import withRoot from '../modules/withRoot';
import Destinations from '../views/Destinations';
import PersonalDetailsForm from '../views/PersonalDetailsForm';
import Confirm from '../views/Confirm';
import Success from '../views/Success';

const steps = ['Chọn bệnh viện', 'Chọn dịch vụ', 'Chọn bác sĩ', 'Chọn hồ sơ khám bệnh'];

function Booking() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [service, setService] = useState([]);

  const handleChange = input => e => {
    setService({ ...service, [input]: e.target.value });
    console.log(service);
  }

  const handleClick = (input, value) => {
    setService({ ...service, [input]: value});
    console.log(service);
  }

  function SwitchCase(props) {
    switch(props.value) {
      case 0:
        return (
          <Destinations
            nextStep={handleNext}
            handleClick={handleClick}
          />
        );
      case 1:
        return (
          <PersonalDetailsForm
            nextStep={handleNext}
            prevStep={handleBack}
            handleChange={handleChange}
            values={service}
          />
        );
      case 2:
        return (
          <Confirm
            nextStep={handleNext}
            prevStep={handleBack}
            handleChange={handleChange}
            values={service}
          />
        );
      case 3:
        return <Success />;
      default:
        return 'You are a Guest';
    }
  }

  return (
    <React.Fragment>
      <AppAppBar />
        <Container>
          <Box sx={{ mt: 7, mb: 5 }}>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Dịch vụ
            </Typography>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
          <SwitchCase value={ activeStep } />
        </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Booking);
