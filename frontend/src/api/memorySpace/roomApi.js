import { instance } from '@/utils/axios';

const fetchUserRoom = async (payload) => {
  const res = await instance.get(`/api/rooms/user/${payload}`);
  return res.data.result;
};

export { fetchUserRoom };
