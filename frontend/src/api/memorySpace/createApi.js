import { instance } from '@/utils/axios';

const postCreateRoom = async (payload) => {
  await instance.post(`/api/rooms`, payload, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};

const postCreatePet = async (payload) => {
  await instance.post(`/api/pets`, payload);
};

const fetchRoom = async (payload) => {
  const res = await instance.get(`/api/rooms/user/${payload}`);
  return res.data.result;
};

const fetchPalmeta = async (payload) => {
  const res = await instance.get(`/api/rooms/${payload}/petmeta`);
  return res.data.result;
};

const postPalImage = async (payload) => {
  const res = await instance.post(
    `/api/rooms/${payload.roomId}/petmeta/upload-image`,
    payload.data,
    {
      headers: { 'content-type': 'multipart/form-data' },
    },
  );
  return res.data.result;
};

const postCreatePalmeta = async (payload) => {
  try {
    await instance.post(`/api/rooms/${payload.roomId}/petmeta`, payload);
  } catch (e) {
    console.error(e);
  }
};

export {
  postCreateRoom,
  postCreatePet,
  fetchRoom,
  postPalImage,
  postCreatePalmeta,
  fetchPalmeta,
};
