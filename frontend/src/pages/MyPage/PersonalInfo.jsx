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
      <div className="mx-16">
        <label className="font-jamsilRegular">개인정보</label>
        <li className="mb-2 mt-6 font-jamsilLight">
          닉네임: {userInformation.nickname}{' '}
        </li>
        <li className="mt-2 font-jamsilLight">
          반려동물 이름:
          {petData?.name ? petData.name : ' 현재 등록된 반려동물이 없습니다'}
        </li>
        <li className="my-2 font-jamsilLight">
          <NavLink
            to={'/reset'}
            className="hover:font-jamsilBold"
          >
            비밀번호 수정하기
          </NavLink>{' '}
        </li>
      </div>
    </ContentsLayout>
  );
};

export default PersonalInfo;
