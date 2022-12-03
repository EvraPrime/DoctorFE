import { instance } from './config';

export const getAllHospitals = async () => {
  try {
    const response = await instance.get('/booking/hospital');
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};