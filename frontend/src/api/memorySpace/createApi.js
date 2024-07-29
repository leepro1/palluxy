import { instance } from '@/utils/axios';

const postCreateRoom = async (payload) => {
  await instance.post(`/api/rooms`, payload.data);
};
const postCreateAlbum = async (payload) => {
  await instance.post(`/api/albums/id`, payload.data);
};
const postCreatePet = async (payload) => {
  await instance.post(`/api/pets`, payload.data);
};

export { postCreateRoom, postCreateAlbum, postCreatePet };
