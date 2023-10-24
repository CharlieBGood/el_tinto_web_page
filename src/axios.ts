/* eslint-disable no-param-reassign */
import axios from 'axios';
import errorHandling from './utils/errorHandling';
import toast from 'react-hot-toast';

const delay = (ms:number) => new Promise(
  resolve => setTimeout(resolve, ms)
);

const instance = axios.create({
  baseURL: process.env.REACT_APP_EL_TINTO_BASE_API,
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('EL_TINTO_API_TOKEN') || null;
    if (token && config.headers !== undefined) {
      if (!config.headers['Content-type']) {
        config.headers['Content-type'] = 'application/json';
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => Promise.reject(err)
);

instance.interceptors.response.use(
  response => response,
  async error => {
    if (!error.response) {
      toast.error('Por favor revisa tu conexión a internet 👀');
    }

    if (error.response.status === 401) {
      console.log('error 401?');
      localStorage.removeItem('EL_TINTO_API_TOKEN');
      window.location.href = '/login';
    }
    if (error.response.status === 400){
      errorHandling(Object.values(error.response.data))
    }
    if (error.response.status === 404){
      errorHandling(Object.values(error.response.data))
      await delay(3000);
      window.location.href = '/';
    }
    if (error.response.status === 500) {
      toast.error('Hubo un error en el sistema')
    }
    return Promise.reject(error);
  }
);

export default instance;
