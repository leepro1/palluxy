import { instance } from '@/utils/axios';

const postCreateRoom = async (payload) => {
  console.log(payload);
  await instance.post(`/api/rooms`, payload, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};

const postCreatePet = async (payload) => {
  await instance.post(`/api/pets`, payload);
};

const fetchRoom = async (payload) => {
  console.log(payload);
  const res = await instance.get(`/api/rooms/user/${payload}`);
  return res.data.result;
};

export { postCreateRoom, postCreatePet, fetchRoom };
