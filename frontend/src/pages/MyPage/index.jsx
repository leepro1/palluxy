import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, Outlet, useLocation } from 'react-router-dom';
import ContentsLayout from '@layout/ContentsLayout';
import PersonalInfo from '@pages/MyPage/PersonalInfo';

const MyPage = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['userInfo']);
  const location = useLocation();

  useEffect(() => {
    console.log('userInfo in MyPage:', userInfo);
  }, [userInfo]);

  return (
    <ContentsLayout>
      <div className="flex min-h-[500px] w-[400px] flex-col sm:w-[640px] md:w-full">
        <nav className="flex flex-row justify-center gap-8 font-jamsilRegular text-xl text-white md:gap-16">
          <Link
            to="personalInfo"
            className=""
          >
            <div className="flex items-center">
              <span className="hidden sm:inline">마이페이지</span>
              <span className="inline sm:hidden">My</span>
            </div>
          </Link>
          <Link
            to="createdMeetings"
            className=""
          >
            <div className="flex items-center">
              <span className="hidden sm:inline">생성한 치유모임</span>
              <span className="inline sm:hidden">생성</span>
            </div>
          </Link>
          <Link to="appliedMeetings">
            <div className="flex items-center">
              <span className="hidden sm:inline">신청한 치유모임</span>
              <span className="inline sm:hidden">신청</span>
            </div>
          </Link>
        </nav>
        <div className="mx-16 my-5 border border-white"></div>
        <section className="text-start text-xl text-white">
          {location.pathname === '/mypage' && <PersonalInfo />}
          <Outlet />
        </section>
      </div>
    </ContentsLayout>
  );
};

export default MyPage;
