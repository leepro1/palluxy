import { instance } from '@/utils/axios';

const postGuestboxComment = async (payload) => {
  // /api/guestbook/{guestbookId}/comment/user/{userId}
  await instance.post(`/api/albums/1/images`, payload.data);
};

const fetchGuestboxComment = async (payload) => {
  // /api/guestbook/{guestbookId}/comments
  await instance.get(
    `/api/albums/1/images/${payload.imageId}/url`,
    payload.data,
  );
};

export { postGuestboxComment, fetchGuestboxComment };
