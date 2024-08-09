import { instance } from '@/utils/axios';

const fetchLetter = async (payload) => {
  const res = await instance.get(`/api/letter/room/${payload}`);
  return res.data.result;
};

const fetchPetId = async () => {
  const res = await instance.get(`/api/pets`);

  return res.data.result.petId;
};

// https://i11a208.p.ssafy.io/api/letter/first?petId=2&roomId=2
const postFirstLetter = async (payload) => {
  await instance.post(`/api/letter/first`, null, {
    params: payload,
  });
};

// https://i11a208.p.ssafy.io/api/letter/2?roomId=2

const postLetter = async (payload) => {
  await instance.post(`/api/letter/${payload.petId}`, payload.data, {
    params: { roomId: payload.roomId },
  });
};

export { fetchLetter, postFirstLetter, postLetter, fetchPetId };
