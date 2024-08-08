import { instance } from '@/utils/axios';

const fetchRoomOverview = async (payload) => {
  const res = await instance.get(`/api/rooms/recommend/${payload}`);
  return res.data.result;
};
const likeRoomOverview = async (payload) => {
  await instance.post(
    `/api/likes/room/${payload.roomId}/user/${payload.userId}`,
  );
};
const unlikeRoomOverview = async (payload) => {
  await instance.delete(
    `/api/likes/room/${payload.roomId}/user/${payload.userId}`,
  );
};

export { fetchRoomOverview, likeRoomOverview, unlikeRoomOverview };
