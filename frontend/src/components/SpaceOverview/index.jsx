import defaultImage from '@assets/images/healingMeetingOverview/default.png';
import PropTypes from 'prop-types';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { likeRoomOverview, unlikeRoomOverview } from '@api/roomOverview';
import { useNavigate } from 'react-router-dom';

const SpaceOverview = ({ data }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['userInfo']);
  const roomOverviewData = queryClient.getQueryData(['roomOverview']);

  const { mutate: likeMutate } = useMutation({
    mutationFn: likeRoomOverview,
    onSuccess: () => {
      queryClient.setQueryData(
        ['roomOverview'],
        roomOverviewData.map((item) =>
          item.roomId === data.roomId ? { ...item, liked: !data.liked } : item,
        ),
      );
    },
  });
  const { mutate: unlikeMutate } = useMutation({
    mutationFn: unlikeRoomOverview,
    onSuccess: () => {
      queryClient.setQueryData(
        ['roomOverview'],
        roomOverviewData.map((item) =>
          item.roomId === data.roomId ? { ...item, liked: !data.liked } : item,
        ),
      );
    },
  });

  const handleLike = () => {
    const payload = {
      roomId: data.roomId,
      userId: userData.id,
    };
    if (data.liked) {
      unlikeMutate(payload);
    } else {
      likeMutate(payload);
    }
  };

  const handleHome = () => {
    navigate(`/memoryspace/${data.userId}`);
  };

  return (
    <div className="flex w-[330px] flex-col">
      <div className="h-[250px] w-full overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={data.thumbnailUrl ? data.thumbnailUrl : defaultImage}
          alt="Room-thumbNail"
        />
      </div>
      <div className="flex items-center gap-x-6 bg-[#323232] px-3 py-2">
        <div className="grow"></div>
        <div
          className="flex cursor-pointer items-center justify-center rounded-full bg-black"
          onClick={() => {
            handleLike();
          }}
        >
          <span
            className={`material-symbols-outlined p-1 ${data.liked ? 'text-[#EC221F]' : 'text-[#14AE5C]'} `}
          >
            favorite
          </span>
        </div>
        <div
          className="flex cursor-pointer items-center justify-center rounded-full bg-black"
          onClick={() => {
            handleHome();
          }}
        >
          <span className="material-symbols-outlined p-1 text-[#EADDFF]">
            home
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-x-6 overflow-hidden bg-[#323232] px-3 py-2 text-white">
        <p>추억공간 이름: {data.name}</p>
        <p>한줄소개</p>
        <p>
          -{' '}
          {data.description.length >= 24
            ? `${data.description.substring(0, 24)}...`
            : data.description}
        </p>
      </div>
    </div>
  );
};

SpaceOverview.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SpaceOverview;
