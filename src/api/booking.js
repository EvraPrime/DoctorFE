import { instance } from './config';

export const getAllHospitals = async () => {
  try {
    const response = await instance.get('/booking/hospital');
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const getHospitalById = async ({ hospitalID }) => {
  try {
    const response = await instance.post('booking/hospital', { hospitalID });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
}

export const getAllDoctors = async (id) => {
  try {
    const response = await instance.get('booking/doctor', {
      params: {
        hospitalID: id
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
}

export const getDoctorById = async ({ hospitalID, doctorID }) => {
  try {
    const response = await instance.post('booking/doctor', { hospitalID, doctorID });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
}

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

export const deletePatient = async ({ id, username }) => {
  try {
    const response = await instance.delete('/patients', { data: { id: id, username: username } });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const updatePatient = async (patients) => {
  try {
    const response = await instance.put('/patients', patients);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const createNewBill = async (service) => {
  try {
    const response = await instance.post('/bills', service);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const getAllBills= async () => {
  try {
    const response = await instance.get('/bills');
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const getAllBillsByUser= async ({ username }) => {
  try {
    const response = await instance.get('/bills', {
      params: {
        username: username
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};