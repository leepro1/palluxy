import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { instance } from '@/utils/axios';
import ContentsLayout from '@layout/ContentsLayout';
import SvgLoading from '@components/DynamicLoading/SvgLoading';
import NotFound from '@components/NotFound';
import { fetchUserRoom } from '@api/memorySpace/roomApi';

const fetchUserInfo = async () => {
  const { data } = await instance.get('/api/userInfo');
  return data;
};

const PersonalInfo = () => {
  const {
    data: userInfo,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    retry: 1,
  });

  const [roomName, setRoomName] = useState('');

  const {
    data: roomData,
    isLoading: roomLoading,
    isError: roomError,
  } = useQuery({
    queryKey: ['userRoom', userInfo?.id],
    queryFn: () => fetchUserRoom(userInfo?.id),
    enabled: !!userInfo?.id,
    retry: 1,
  });

  useEffect(() => {
    if (roomData) {
      setRoomName(roomData.name);
    } else if (roomError) {
      setRoomName('아직 추억공간이 생성되지 않았습니다.');
    } else if (roomData === null) {
      setRoomName('아직 추억공간이 생성되지 않았습니다.');
    }
  }, [roomData, roomError]);

  if (userLoading || roomLoading) {
    return (
      <ContentsLayout>
        <div className="flex h-full items-end justify-center">
          <SvgLoading />
        </div>
      </ContentsLayout>
    );
  }

  return (
    <ContentsLayout>
      <div className="flex h-full flex-col p-4 font-jamsilLight md:text-xl">
        <div className="py-5 text-center font-jamsilMedium text-2xl text-pal-purple">
          <NavLink to={'/mypage/createdMeetings'}>My Page</NavLink>
        </div>
        <div className="flex items-center py-3 text-center font-jamsilRegular text-lg">
          <span className="material-symbols-outlined">account_circle</span>
          <span>개인정보</span>
        </div>
        <div className="mb-2 mt-6 font-jamsilLight text-base">
          {'닉네임 > '}
          {userInfo.nickname}
          {' 님'}
        </div>
        <div className="mt-2 font-jamsilLight text-base">
          {roomName
            ? `추억공간 > ${roomName}`
            : ' 아직 추억공간이 생성되지 않았습니다.'}
        </div>
        <button className="mt-10 justify-center rounded border-pal-purple bg-pal-purple px-5 py-2 font-jamsilLight text-white hover:font-jamsilMedium md:px-3">
          <NavLink to={'/reset'}>비밀번호 수정하기</NavLink>
        </button>
      </div>
    </ContentsLayout>
  );
};

export default PersonalInfo;
