import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const MyPage = () => {
  const queryClient = useQueryClient();

  const cachedData = queryClient.getQueryData(['userInfo']);

  // const { data: userInfo } = useQuery({
  //   queryKey: ['userInfo'],
  //   queryFn: () => {
  //     const cachedData = queryClient.getQueryData(['userInfo']);
  //     console.log('Cached userInfo:', cachedData);
  //     return cachedData || {};
  //   },
  //   initialData: () => {
  //     const cachedData = queryClient.getQueryData(['userInfo']);
  //     console.log('Initial Cached userInfo:', cachedData); // 초기 데이터
  //     return cachedData;
  //   },
  // });

  useEffect(() => {
    console.log('userInfo in MyPage:', userInfo);
  }, [userInfo]);

  return (
    <div className="fixed inset-0 z-50 flex w-full flex-row bg-black bg-opacity-50">
      <aside className="mx-32 my-32 flex flex-[0_0_25%] flex-col justify-center bg-pink-200 text-start text-xl font-semibold text-white">
        <div className="mb-5">마이페이지</div>
        <div className="mb-5">내가 생성한 치유모임</div>
        <div>내가 신청한 치유모임</div>
      </aside>
      <section className="my-32 flex-[0_0_50%] bg-sky-300 text-start text-xl text-white">
        <div>
          <label className="mb-2 text-xl font-semibold">개인정보</label>
          <div className="mb-4 w-full border-b-2 border-white"></div>
          <div>닉네임</div>
          <div>{userInfo?.nickname}</div>
          <div>반려동물 이름</div>
          <div>뽀삐</div>
        </div>
        <div>
          <div>치유모임 리스트</div>
        </div>
        <div className="flex content-end justify-center">
          <button
            type=""
            className="bg-pal-purple p-2"
          >
            수정
          </button>
        </div>
      </section>
    </div>
  );
};

export default MyPage;
