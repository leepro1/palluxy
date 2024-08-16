import { instance } from '@/utils/axios';

const fetchUserRoom = async (payload) => {
  const res = await instance.get(`/api/rooms/user/${payload}`);
  return res.data.result;
};

// /api/rooms/{romId}/petmeta/{petMetaId}/

const updatePetPosition = async (payload) => {
  await instance.post(`/api/rooms/user/${payload}`);
  return;
};
const updatePetRotation = async (payload) => {
  await instance.post(`/api/rooms/user/${payload}`);
  return;
};

export { fetchUserRoom, updatePetPosition, updatePetRotation };
