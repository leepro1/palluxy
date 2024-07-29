import { instance } from '@/utils/axios';

const postCreateRoom = async (payload) => {
  console.log(1);
  await instance.post(`/api/rooms`, payload);
  console.log(2);
  const res = await instance.get(`/api/rooms/user/${payload.userId}`);
  console.log(3);
  console.log(res.data.result.roomId);
  await instance.post(`/api/albums/${res.data.result.roomId}`, {
    roomId: res.data.result.roomId,
  });

  console.log(4);
};

const postCreateAlbum = async (payload) => {
  await instance.post(`/api/albums/roomid`, payload);
};

const postCreatePet = async (payload) => {
  console.log(payload);
  await instance.post(`/api/pets`, payload);
};

const fetchRoom = async (payload) => {
  console.log(payload);
  const res = await instance.get(`/api/rooms/user/${payload}`);
  return res.data.result;
};

export { postCreateRoom, postCreateAlbum, postCreatePet, fetchRoom };
