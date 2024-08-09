import { instance } from '@/utils/axios';

const fetchpetPersonalities = async () => {
  const res = await instance.get(`api/pets/personalities`);

  return res.data.result;
};
const updatePalPosition = async (payload) => {
  await instance.put(
    `api/rooms/${payload.roomId}/petmeta/${payload.petMetaId}/position`,
    null,
    { params: payload.position },
  );
};
const updatePalRotation = async (payload) => {
  await instance.put(
    `api/rooms/${payload.roomId}/petmeta/${payload.petMetaId}/rotation`,
    null,
    { params: payload.rotation },
  );
};

export { fetchpetPersonalities, updatePalPosition, updatePalRotation };
