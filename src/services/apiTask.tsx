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
const createTask = async () => {
  try {
    const res = await axiosInstance.get('todo');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const updateTask = async () => {
  try {
    const res = await axiosInstance.get('todo');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const deleteTask = async () => {
  try {
    const res = await axiosInstance.get('todo');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { getTasks };
