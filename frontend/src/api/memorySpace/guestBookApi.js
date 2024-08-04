import { instance } from '@/utils/axios';

const fetchGuestbookComment = async (payload) => {
  // /api/guestbook/{guestbookId}/comments
  const res = await instance.get(`/api/guestbook/room/${payload}`);
  return res.data.result;
};

const postGuestboxComment = async (payload) => {
  // /api/guestbook/{guestbookId}/comment/user/{userId}
  await instance.post(
    `/api/guestbook/${payload.guestbookId}/comment/user/${payload.userId}`,
    { content: payload.content },
  );
};

const deleteGuestbookComment = async (payload) => {
  // /api/guestbook/comment/{commnetId}/user/{userId}
  await instance.delete(
    `/api/guestbook/comment/${payload.commentId}/user/${payload.userId}`,
  );
};

export { postGuestboxComment, fetchGuestbookComment, deleteGuestbookComment };
