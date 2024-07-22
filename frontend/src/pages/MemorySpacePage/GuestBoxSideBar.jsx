import MemorySideBarLayout from '@layout/MemorySideBarLayout';

import GuestBookComment from '@components/GuestBook/GuestBookComment';

import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { fetchGuestboxComment } from '@/api/memorySpace/guestBoxApi';

const GuestBoxSideBar = () => {
  const { register, handleSubmit, resetField } = useForm();

  // const { data: commentDatas, isSuccess } = useQuery({
  //   queryKey: ['guestBox'],
  //   queryFn: fetchGuestboxComment,
  //   staleTime: 300000,
  // });

  const guestBoxCommentSubmit = (formData) => {
    console.log(formData);
    resetField('content');
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
          <GuestBookComment />
          <GuestBookComment />
          <GuestBookComment />
          <GuestBookComment />
        </div>
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
      </div>
    </MemorySideBarLayout>
  );
};

export default GuestBoxSideBar;
