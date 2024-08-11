import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { instance } from '@/utils/axios';
import ContentsLayout from '@layout/ContentsLayout';
import Loading from '@components/Loading';
import NotFound from '@components/NotFound';

const fetchUserInfo = async () => {
  const { data } = await instance.get('/api/userInfo');
  return data;
};

const PersonalInfo = () => {
  const {
    data: userInformation,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });

  const [petData, setPetData] = useState(null);

  useEffect(() => {
    if (userInformation) {
      const getPetName = async () => {
        try {
          const response = await instance.get(
            `/api/pets/users/${userInformation.id}`,
          );
          setPetData(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      getPetName();
    }
  }, [userInformation]);

  if (userLoading) {
    return (
      <ContentsLayout>
        <Loading />
      </ContentsLayout>
    );
  }

  if (userError) {
    return (
      <ContentsLayout>
        <NotFound />
      </ContentsLayout>
    );
  }

  return (
    <ContentsLayout>
      <div className="flex h-full flex-col p-4 font-jamsilLight text-lg md:text-xl">
        <div className="py-5 text-center font-jamsilMedium text-2xl">
          <NavLink to={'/mypage/createdMeetings'}>My Page</NavLink>
        </div>
        <div className="py-3 font-jamsilRegular">개인정보</div>
        <div className="mb-2 mt-6 font-jamsilLight">
          {userInformation.nickname} {'님 >'}
        </div>
        <div className="mt-2 font-jamsilLight">
          반려동물 이름:
          {petData?.name ? petData.name : ' 현재 등록된 반려동물이 없습니다'}
        </div>
        <button className="my-2 justify-center rounded border-pal-purple bg-pal-purple p-2 font-jamsilLight text-pal-purple text-white hover:border-none hover:bg-white hover:font-jamsilBold hover:text-pal-purple">
          <NavLink
            to={'/reset'}
            className=""
          >
            비밀번호 수정하기
          </NavLink>{' '}
        </button>
      </div>
    </ContentsLayout>
  );
};

export default PersonalInfo;
