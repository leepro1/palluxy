import SpaceOverview from '@components/SpaceOverview';
import ContentsLayout from '@layout/ContentsLayout';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchRoomOverview,
  fetchRoomOverviewNoneUser,
} from '@api/roomOverview';
import { fetchUserByAccess } from '@api/user';

const MemorySpaceOverviewPage = () => {
  const queryClient = useQueryClient();

  const {
    data: roomOverview,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['roomOverview'],
    queryFn: async () => {
      const data = await queryClient.ensureQueryData({
        queryKey: ['userInfo'],
        queryFn: fetchUserByAccess,
      });

      if (data) {
        return fetchRoomOverview(data.id);
      } else {
        return fetchRoomOverviewNoneUser();
      }
    },
    retry: 1,
  });

  if (!roomOverview || roomOverview.length === 0) {
    return (
      <div className="w-full text-center">
        <p className="text-xl text-white">
          탐방할 수 있는 공간이 아직 없습니다.
        </p>
      </div>
    );
  }

  return (
    <ContentsLayout>
      <div className="relative flex flex-col items-center">
        <div
          className="flex items-center gap-x-4 py-10 text-xl text-white"
          onClick={() => {
            refetch();
          }}
        >
          <span>다른 공간 둘러보기</span>
          <span className="material-symbols-outlined cursor-pointer text-5xl text-white">
            cached
          </span>
        </div>
        <div className="flex flex-col gap-y-8 sm:gap-y-12 lg:flex-row lg:gap-x-16">
          {isSuccess &&
            roomOverview.map((data) => (
              <SpaceOverview
                key={data.roomId}
                data={data}
              />
            ))}
        </div>
      </div>
    </ContentsLayout>
  );
};

export default MemorySpaceOverviewPage;
