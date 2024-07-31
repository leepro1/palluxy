import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, Outlet, useLocation } from 'react-router-dom';
import PersonalInfo from '@pages/MyPage/PersonalInfo';

const MyPage = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['userInfo']);
  const location = useLocation();

  useEffect(() => {
    console.log('userInfo in MyPage:', userInfo);
  }, [userInfo]);

  return (
    <div className="flex w-full flex-col">
      <nav className="flex flex-row justify-center gap-16 text-xl font-semibold text-white">
        <Link
          to="personalInfo"
          className=""
        >
          마이페이지
        </Link>
        <Link
          to="createdMeetings"
          className=""
        >
          생성한 치유모임
        </Link>
        <Link to="appliedMeetings">신청한 치유모임</Link>
      </nav>
      <div className="mx-16 my-5 border border-white"></div>
      <section className="bg-sky-300 text-start text-xl text-white">
        {/* {location.pathname === '/mypage' && <PersonalInfo />} */}
        {location.pathname === '/mypage' && <div>메인 마이페이지</div>}
        <Outlet />
      </section>
    </div>
  );
};

export default MyPage;
