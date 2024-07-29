import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const MyPage = () => {
  const queryClient = useQueryClient();

  const {
    data: userInfo,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => {
      const cachedData = queryClient.getQueryData(['userInfo']);
      console.log('Cached userInfo:', cachedData);
      return cachedData || {};
    },
    initialData: () => {
      const cachedData = queryClient.getQueryData(['userInfo']);
      console.log('Initial Cached userInfo:', cachedData); // 초기 데이터
      return cachedData;
    },
  });

  useEffect(() => {
    console.log('userInfo in MyPage:', userInfo);
  }, [userInfo]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user info</div>;

  return (
    <div className="fixed inset-0 z-50 flex w-full flex-row bg-black bg-opacity-50">
      <div className="w-3/10 ml-10 flex flex-col justify-center bg-red-600 text-start text-xl font-semibold text-white">
        <div className="mb-5">마이페이지</div>
        <div className="mb-5">내가 생성한 치유모임</div>
        <div>내가 신청한 치유모임</div>
      </div>
      <div className="w-7/10 flex flex-col justify-evenly bg-blue-600 text-start text-xl text-white">
        <div>닉네임</div>
        <div>{userInfo?.nickname}</div>
        <div>반려동물 이름asdasasssa</div>
      </div>
    </div>
  );
};

export default MyPage;
