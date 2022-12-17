import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../components/Typography';
import AppForm from '../views/AppForm';
import { email, required } from '../form/validation';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';
import withRoot from '../modules/withRoot';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useHttp from '../modules/use-http';
import { signup } from '../api/auth'
import { AuthContext } from '../store/auth-context';
import swal from 'sweetalert';

function SignUp() {
  const validate = (values) => {
    const errors = required(['email'], values);
    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
    return errors;
  };

  const { sendRequest, status, data, error } = useHttp(signup);
  const authCtx = useContext(AuthContext);
  const { user, setUser } = authCtx;
  const navigate = useNavigate();
  const onSubmit = (data) => sendRequest(data);

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        setUser(data);
        navigate('/');
      } else if (error) {
        swal('Đăng nhập thất bại', 'Đã có lỗi xảy ra', 'error');
      }
    }
  }, [data, error, setUser, status]);

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link component={ RouterLink } to="/sign-in" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                autoFocus
                component={RFTextField}
                fullWidth
                disabled={status === 'pending'}
                label="Username"
                margin="normal"
                name="username"
                required
                size="large"
              />
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={status === 'pending'}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={status === 'pending'}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={status === 'pending'}
                color="secondary"
                fullWidth
              >
                {status === 'pending' ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignUp);
