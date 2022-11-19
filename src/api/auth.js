import { axios, bearerHeader } from './config';

export const signin = async ({ username, password }) => {
  try {
    const response = await axios.post('/sign-in', { username, password });
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const signup = async ({ username, email, password }) => {
  try {
    const response = await axios.post(
      '/sign-up',
      { username, email, password },
      {}
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const signout = async () => {
  try {
    const response = await axios.get('/signout');

    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const changePassword = async ({ password, tkn }) => {
  try {
    console.log(tkn);
    const response = await axios.put('/password-change', { password }, {
      params: {
        token: tkn,
        logout: true,
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const verify = async (data) => {
  try {
    const response = await axios.put('/verify', {}, {
      params: {
        token: data
      }
    });
    console.log(response.data.args);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};