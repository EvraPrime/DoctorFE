import axios from 'axios';

const SERVER = 'http://localhost:3500';
export const instance = axios.create({
  baseURL: SERVER,
  withCredentials: true,
});
export const bearerHeader = `Bearer ${localStorage.getItem('accessToken')}`;
