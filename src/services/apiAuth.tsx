import { createAxios } from './axios';

const axiosInstance = createAxios();

const regiterUser = async (values: any) => {
  try {
    const res = await axiosInstance.post('user/register', values);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const loginUser = async (values: any) => {
  try {
    const res = await axiosInstance.post('user/login', values);
    if (res.data.refreshToken) {
      console.log(res.data.refreshToken);
      console.log('Cookie before:', document.cookie);
      document.cookie = `refreshToken=${res.data.refreshToken}; path=/; max-age=604800`; // 7 ngày
      console.log('Cookie saved:', document.cookie);
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const logoutUser = async () => {
  try {
    const res = await axiosInstance.post('user/logout', {}, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async () => {
  try {
    const res = await axiosInstance.post('user/refresh_token', {}, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { regiterUser, loginUser, logoutUser, refreshToken };
