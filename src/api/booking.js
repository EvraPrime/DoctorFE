import { instance } from './config';

export const getAllHospitals = async () => {
  try {
    const response = await instance.get('/booking/hospital');
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const getAllPatients = async ({ username }) => {
  try {
    const response = await instance.get('/patients', {
      params: {
        username: username
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const createNewPatients = async (patients) => {
  try {
    const response = await instance.post('/patients', patients);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};