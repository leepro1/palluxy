import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ContentsLayout from '@layout/ContentsLayout';
import PersonalInfo from '@pages/MyPage/PersonalInfo';

const MyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/mypage') {
      navigate('createdMeetings');
    }
  }, [location, navigate]);

  return (
    <ContentsLayout>
      <div className="flex flex-col items-center justify-center gap-10 md:w-full md:flex-row">
        <aside className="h-[350px] w-[500px] self-center rounded-xl bg-white p-4 md:mt-10 md:h-[400px] md:w-[350px] md:self-start">
          <PersonalInfo />
        </aside>
        <div className="flex min-h-[500px] w-[500px] flex-col md:w-[800px]">
          <nav className="flex gap-2 font-jamsilRegular text-lg text-white">
            <Link
              to="createdMeetings"
              className={`${
                location.pathname === '/mypage/createdMeetings'
                  ? 'rounded-t-lg bg-white bg-opacity-70 p-2 font-jamsilMedium text-pal-purple'
                  : 'rounded-t-lg bg-white bg-opacity-50 p-2'
              }`}
            >
              생성한 치유모임
            </Link>
            <Link
              to="appliedMeetings"
              className={`${
                location.pathname === '/mypage/appliedMeetings'
                  ? 'rounded-t-lg bg-white bg-opacity-70 p-2 font-jamsilMedium text-pal-purple'
                  : 'rounded-t-lg bg-white bg-opacity-50 p-2'
              }`}
            >
              신청한 치유모임
            </Link>
          </nav>
          <div className="min-h-[480px] rounded-b-md rounded-tr-md bg-white bg-opacity-70 p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </ContentsLayout>
  );
};

export default MyPage;
