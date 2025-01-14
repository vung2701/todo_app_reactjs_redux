import axios, { AxiosInstance } from 'axios';
import { refreshToken } from './apiAuth';

const API_URL = import.meta.env.VITE_API_URL;
let axiosInstance: AxiosInstance;

const _createAxios = (url: string, token?: string | null, headers?: Record<string, string>): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    headers: headers || {}
  });

  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

 instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Special handling for refresh token API
      if (originalRequest.url?.includes('/refresh-token')) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // Handle 401 errors by refreshing the token
      if (error.response?.status === 401 && !originalRequest._retry) {
        console.log( originalRequest._retry)
        originalRequest._retry = true;
        console.log( originalRequest._retry)
        try {
          await new Promise((resolve) => setTimeout(resolve, 10000)); // Delay 10 seconds
          const res = await refreshToken();
          if (res?.accessToken) {
            localStorage.setItem('accessToken', res.accessToken);
            instance.defaults.headers.Authorization = `Bearer ${res.accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
            return instance(originalRequest);
          } else {
            throw new Error('Failed to refresh token');
          }
        } catch (err) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
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
    localStorage.setItem('accessToken', token);
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