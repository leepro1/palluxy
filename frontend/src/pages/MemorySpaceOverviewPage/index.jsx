import SpaceOverview from '@components/SpaceOverview';
import ContentsLayout from '@layout/ContentsLayout';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRoomOverview } from '@api/roomOverview';
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
      return fetchRoomOverview(data.id);
    },
  });

  return (
    <ContentsLayout>
      <div className="relative flex flex-col items-center">
        <div className="flex w-full justify-end py-4">
          <span
            className="material-symbols-outlined cursor-pointer text-5xl text-white"
            onClick={() => {
              refetch();
            }}
          >
            cached
          </span>
        </div>
        <div className="flex gap-x-32">
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
