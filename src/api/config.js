import axios from 'axios';

const SERVER = 'http://localhost:3500';
export const instance = axios.create({
  baseURL: SERVER,
  withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = 'Bearer ' + accessToken;
  } else {
    config.headers.Authorization = '';
  }
  
  return config
});