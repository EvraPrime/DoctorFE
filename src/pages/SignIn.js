import React, { useContext, useEffect } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '../components/Typography';
import AppForm from '../views/AppForm';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';
import withRoot from '../modules/withRoot';
import useHttp from '../modules/use-http';
import { signin } from '../api/auth'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';
import swal from 'sweetalert';

function SignIn() {
  const { sendRequest, status, data, error } = useHttp(signin);
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
        console.log(error);
        swal('Đăng nhập thất bại', 'Tên tài khoản hoặc mật khẩu không hợp lệ', 'error');
      }
    }
  }, [data, error, setUser, status]);

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Đăng nhập
          </Typography>
          <Typography variant="body2" align="center">
            {'Chưa có tài khoản? '}
            <Link
              component={ RouterLink }
              to="/sign-up"
              align="center"
              underline="always"
            >
              Đăng ký ngay!
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true }}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                autoFocus
                component={RFTextField}
                fullWidth
                disabled={status === 'pending'}
                label="Tên tài khoản"
                margin="normal"
                name="username"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                required
                disabled={status === 'pending'}
                name="password"
                autoComplete="current-password"
                label="Mật khẩu"
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
                size="large"
                color="secondary"
                fullWidth
              >
                {status === 'pending' ? 'Đang chờ...' : 'Đăng nhập'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignIn);
