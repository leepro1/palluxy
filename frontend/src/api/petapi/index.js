import { instance } from '@/utils/axios';

const fetchpetPersonalities = async () => {
  const res = await instance.get(`api/pets/personalities`);

  return res.data.result;
};

export { fetchpetPersonalities };
