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
  if (config.url === '/api/reissue') {
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
  async (error) => {
    const statusCode = error.response?.status;
    if (error.config.url === '/api/reissue' && statusCode === 400) {
      console.error('refresh 토큰 오류');
    }
    if (statusCode === 401) {
      console.log('refresh 토큰 오류로 reissue 진행');
      const res = await instance.post('/api/reissue');
      sessionStorage.setItem('access', res.headers['access']);
      error.config.headers['access'] = res.headers['access'];
      const reResponse = await axios(error.config);
      console.log('이전 요청 다시보내기');
      return reResponse;
    }
    if (statusCode === 404) {
      console.log(404);
    }
    return Promise.reject(error);
  },
);
