import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const access = sessionStorage.getItem('access');
  if (config.url === '/login') {
    return config;
  }
  if (access) {
    config.headers['access'] = access;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response?.status;
    if (statusCode === 404) {
      console.log(404);
    }
  },
);
