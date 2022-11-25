import { instance } from './config';

export const getAllBlogs = async () => {
  try {
    const response = await instance.get('/blogs');
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};