import * as React from 'react';
import { useState } from "react";
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
import Patient from '../views/Patient';
import Confirm from '../views/Confirm';
import Success from '../views/Success';
import Doctors from '../views/Doctors';
import Dates from '../views/Dates';

const steps = ['Chọn bệnh viện', 'Chọn hồ sơ bệnh nhân', 'Chọn bác sĩ', 'Chọn ngày khám', 'Xác nhận'];
const service = {};

function Booking() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClick = (input, value) => {
    service[input] = value;
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
          <Patient
            nextStep={handleNext}
            prevStep={handleBack}
            handleClick={handleClick}
          />
        );
      case 2:
        return (
          <Doctors
            nextStep={handleNext}
            prevStep={handleBack}
            handleClick={handleClick}
            service={service}
          />
        );
      case 3:
        return (
          <Dates 
            nextStep={handleNext}
            prevStep={handleBack}
            handleClick={handleClick}
            service={service}
          />
        );
      case 4:
        return (
          <Confirm 
            nextStep={handleNext}
            prevStep={handleBack}
            handleClick={handleClick}
            service={service}
          />
        );
      case 5:
        return (
          <Success service={service}/>
        )
      default:
        return 'Something is wrong';
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
