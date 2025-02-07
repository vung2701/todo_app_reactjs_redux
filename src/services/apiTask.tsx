import { createAxios } from './axios';

const axiosInstance = createAxios();

const getTasks = async (params: any) => {
  let per_page = params?.perPage || 5;
  let page = params?.page || 1;
  try {
    const res = await axiosInstance.get(`todo?page=${page}&per_page=${per_page}&sort=-_id`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const createTask = async (values) => {
  try {
    const res = await axiosInstance.post('todo/create', values);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const updateTask = async (id?: string) => {
  try {
    const res = await axiosInstance.put(`todo/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const deleteTask = async (id?: string) => {
  try {
    const res = await axiosInstance.delete(`todo/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { getTasks, createTask, updateTask, deleteTask };
