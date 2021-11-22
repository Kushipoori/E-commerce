/* eslint-disable new-cap */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) { config.headers.Authorization = `Bearer ${token}`; }

  return config;
},
// Do something before request is sent

(error) =>
  // Do something with request error
  Promise.reject(error));

// Add a response interceptor
axiosInstance.interceptors.response.use((response) =>
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  response.data,
(error) => {
  if (error?.response?.data) { return new Promise.reject(new Error(error.response.data)); }
},
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
);

export default axiosInstance;
