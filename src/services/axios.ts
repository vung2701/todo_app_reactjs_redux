import axios, { AxiosInstance } from 'axios';
import { logoutUser, refreshToken } from './apiAuth';

const API_URL = import.meta.env.VITE_API_URL;

let axiosInstance: AxiosInstance;

const _createAxios = (url: string, token?: string | null, headers?: Record<string, string>): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    headers: headers || {}
  });

  instance.interceptors.request.use(
    (config) => {
    const tokens = localStorage.getItem('accessToken');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    } else if (tokens) {
      config.headers.Authorization = `Bearer ${tokens}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.config && !error.config._retry) {
      error.config._retry = true; // Prevent infinite retry loops
      try {
        await refreshToken();
        return instance(error.config); // Retry the failed request
      } catch (err) {
        logoutUser(); // Clear user data on token refresh failure
        window.location.href = '/login'; // Redirect to login
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);


  return instance;
};

const createAxios = (token?: string | null): AxiosInstance => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    localStorage.setItem('token', token);
    headers.Authorization = `Bearer ${token}`;
  }

  axiosInstance = _createAxios(API_URL, token, headers);

  return axiosInstance;
};


const uploadAxios = (token?: string | null): AxiosInstance => {
  const headers: Record<string, string> = {
    'Content-type': 'multipart/form-data',
  };

  axiosInstance = _createAxios(API_URL, token, headers);
  return axiosInstance;
};



export { axiosInstance, createAxios, uploadAxios };
