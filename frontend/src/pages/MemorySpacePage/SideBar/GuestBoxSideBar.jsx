import MemorySideBarLayout from '@layout/MemorySideBarLayout';

import GuestBookComment from '@components/GuestBook/GuestBookComment';

import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  fetchGuestbookComment,
  postGuestboxComment,
} from '@api/memorySpace/guestBookApi';

const GuestBoxSideBar = () => {
  const { register, handleSubmit, resetField } = useForm();
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const userData = queryClient.getQueryData(['userInfo']);
  const roomData = queryClient.getQueryData(['memorySpace', userId]);
  const { data: guestBookData, isSuccess } = useQuery({
    queryKey: ['guestBook', userId],
    queryFn: () => fetchGuestbookComment(roomData.roomId),
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: commentPostMutation } = useMutation({
    mutationFn: postGuestboxComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['guestBook', userId],
      });
    },
  });

  const guestBoxCommentSubmit = (formData) => {
    const payload = {
      guestbookId: guestBookData.guestbookId,
      userId: userData.id,
      content: formData.content,
    };
    resetField('content');
    commentPostMutation(payload);
  };

  const commentRegister = register('content', {
    required: {
      value: true,
    },
  });

  return (
    <MemorySideBarLayout>
      <div className="flex h-[580px] w-full flex-col px-4">
        <div
          id="guestBookOverflow"
          className="my-4 flex grow flex-col gap-y-4 overflow-y-scroll px-2"
        >
          {isSuccess &&
            guestBookData.comments
              .filter((data) => !data.deleted)
              .map((data) => (
                <GuestBookComment
                  key={data.commentId}
                  data={data}
                />
              ))}

          {isSuccess &&
            guestBookData.comments.filter((data) => !data.deleted).length ===
              0 && (
              <div className="rounded-md bg-white px-4 py-4 text-center font-bold">
                <p>아직 방명록을 남긴 분들이 없네요</p>
                <p>방명록을 남기는 건 어떠신가요?</p>
              </div>
            )}
        </div>
        {userData && (
          <div className="rounded-md bg-white px-1 py-1">
            <form onSubmit={handleSubmit(guestBoxCommentSubmit)}>
              <textarea
                id="guestBookSubmitOverflow"
                className="h-20 w-full resize-none overflow-y-auto px-2 py-2 text-sm"
                name=""
                placeholder="소중한 한 마디를 남겨주세요"
                {...commentRegister}
              ></textarea>
              <div className="flex justify-end">
                <button className="rounded-md bg-pal-purple px-4 text-white">
                  방명록 남기기
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </MemorySideBarLayout>
  );
};

export default GuestBoxSideBar;
