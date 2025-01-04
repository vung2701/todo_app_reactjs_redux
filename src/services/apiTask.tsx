import { createAxios } from './axios';

const axiosInstance = createAxios();

const getTasks = async () => {
  try {
    const res = await axiosInstance.get('todo');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { getTasks };
