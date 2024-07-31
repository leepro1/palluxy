import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { instance } from '@/utils/axios';

const PersonalInfo = () => {
  const queryClient = useQueryClient();
  const userInformation = queryClient.getQueryData(['userInfo']);
  console.log(userInformation);
  const userId = userInformation.id;

  const [petData, setPetData] = useState(null);

  // const getPetName = async (userId) => {
  //   const { data } = await instance.get(`/api/pets/users/${userId}`);
  //   return data.result;
  // };

  useEffect(() => {
    const getPetName = async () => {
      try {
        const response = await instance.get(`/api/pets/users/${userId}`);
        setPetData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPetName();
  }, [userId]);

  return (
    <div className="mx-16">
      <label className="mb-10 font-semibold">개인정보</label>
      <div>닉네임: {userInformation.nickname} </div>
      <div>테스트용 userID: {userInformation.id}</div>
      <div>
        반려동물 이름:
        {petData?.name ? petData.name : '현재 등록된 반려동물이 없습니다'}
      </div>
      <div className="flex content-end justify-center">
        <button
          type="button"
          className="my-10 rounded border border-white p-2"
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
