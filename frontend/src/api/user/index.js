import { instance } from '@/utils/axios';

const fetchUserByAccess = async () => {
  const access = sessionStorage.getItem('access');
  if (!access) return null;
  const res = await instance.get('/api/users/user-info');
  console.log('fet');
  return res.data.result;
};

export { fetchUserByAccess };
