import { instance } from '@/utils/axios';

const fetchAllFrameImage = async () => {
  try {
    const res = await instance.get('/api/albums/1/images');
    return res.data.result;
  } catch {
    console.error('error');
  }
};

const fetchFrameAngle = (payload) => {
  const data = {
    angle: payload.angle,
  };
  console.log('fetch angle', payload.angle);
  instance.put(`/api/albums/1/images/${payload.imageId}/angle`, null, {
    params: data,
  });
};

export { fetchAllFrameImage, fetchFrameAngle };
