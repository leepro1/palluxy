import PropTypes from 'prop-types';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteGuestbookComment } from '@api/memorySpace/guestBookApi';

const GuestBookComment = ({ data }) => {
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData(['userInfo']);
  const { mutate: commentDeleteMutation } = useMutation({
    mutationFn: deleteGuestbookComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['guestBook'],
      });
    },
  });

  const handleDeleteBtn = () => {
    const userData = queryClient.getQueryData(['userInfo']);
    const payload = {
      commentId: data.commentId,
      userId: userData.id,
    };
    commentDeleteMutation(payload);
  };

  return (
    <div className="rounded-md bg-white px-4 pt-4">
      <div className="flex flex-col text-sm">
        <div>
          <span className="font-semibold">{data.nickname}</span>
        </div>
        <div>
          <p>{data.content}</p>
        </div>
        <div className="flex justify-end py-2 text-xs">
          {data.userId === userData?.id && (
            <span
              className="material-symbols-outlined cursor-pointer"
              onClick={() => {
                handleDeleteBtn();
              }}
            >
              delete
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

GuestBookComment.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GuestBookComment;
