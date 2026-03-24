import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://vocalize-api.onrender.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Vocalize:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});