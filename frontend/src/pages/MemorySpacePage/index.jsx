import ContentsLayout from '@layout/ContentsLayout';

import RoomCanvas from '@components/Model/RoomCanvas';
import GlobalBtn from '@components/GlobalBtn';
import Loading from '@components/Loading';
import MemoerySideBar from '@pages/MemorySpacePage/MemorySideBar';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchUserRoom } from '@api/memorySpace/roomApi';

const MemorySpacePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  let { userId } = useParams();
  const userData = queryClient.getQueryData(['userInfo']);
  const { isError, isLoading, isSuccess } = useQuery({
    queryKey: ['memorySpace'],
    queryFn: () => fetchUserRoom(userId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  useEffect(() => {
    if (isError && parseInt(userId) !== userData?.id) {
      navigate('/404');
    }
  }, [isError, userId, userData?.id, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    // console.log(userData);
    // if (parseInt(userId) === userData.id) {
    return (
      <ContentsLayout>
        <div className="flex h-full justify-center">
          <div className="font-jamsilMedium text-white">
            <div className="flex flex-col items-center gap-y-6">
              <p className="text-2xl lg:text-4xl">아직 추억공간이 없으시네요</p>
              <p className="text-2xl lg:text-4xl">
                추억공간을 만들러 떠나볼까요?
              </p>
              <GlobalBtn
                onClick={() => navigate('/memoryspacecreate')}
                className="bg-pal-purple"
                size={'lg'}
                text={'추억공간 만들기'}
              />
            </div>
          </div>
        </div>
      </ContentsLayout>
    );
  }
  if (isSuccess) {
    return (
      <ContentsLayout>
        <div className="flex">
          <div className="flex grow items-center">
            <RoomCanvas />
          </div>
          <div className="w-[310px] rounded-xl bg-pal-purple">
            <MemoerySideBar />
          </div>
        </div>
      </ContentsLayout>
    );
  }
};

export default MemorySpacePage;
