import { instance } from '@/utils/axios';

const fetchAllFrameImage = async (payload) => {
  const res = await instance.get(`/api/albums/room/${payload}`);
  return res.data.result;
};

const fetchFrameAngle = async (payload) => {
  const data = {
    angle: payload.angle,
  };
  await instance.put(`/api/albums/1/images/${payload.imageId}/angle`, null, {
    params: data,
  });
};

const fetchFrameImage = async (payload) => {
  await instance.post(`/api/albums/${payload.albumId}/images`, payload.data, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};

const updateFrameImage = async (payload) => {
  await instance.put(
    `/api/albums/${payload.albumId}/images/${payload.imageId}/url`,
    payload.data,
    {
      headers: { 'content-type': 'multipart/form-data' },
    },
  );
};

export {
  fetchAllFrameImage,
  fetchFrameAngle,
  fetchFrameImage,
  updateFrameImage,
};
