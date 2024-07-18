import { instance } from '@/utils/axios';

const getFrameImage = async () => {
  try {
    const res = await instance.get('/api/albums/1/images');
    return res.data.result;
  } catch {
    console.error('asdf');
  }
};

export { getFrameImage };
