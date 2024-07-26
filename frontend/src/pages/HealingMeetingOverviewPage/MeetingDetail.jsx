import React from 'react';
import ContentsLayout from '@layout/ContentsLayout';
import { useNavigate, useParams } from 'react-router-dom';
import defaultImage from '@assets/images/healingMeetingOverview/default.png';
import { ScrollRestoration } from 'react-router-dom';

const MeetingDetail = () => {
  const { meetingId } = useParams();
  const meetingIdInt = parseInt(meetingId, 10);
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <ContentsLayout>
      <ScrollRestoration />
      <div className="container mx-auto p-4">
        <button
          type="button"
          onClick={handleBackButton}
          className="flex items-center justify-center gap-x-2 rounded-lg bg-pal-purple px-5 py-2 text-sm text-pal-lightwhite transition-colors duration-200 hover:bg-purple-900"
        >
          <svg
            className="h-5 w-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>뒤로가기</span>
        </button>

        <div className="mt-5 flex flex-col justify-center gap-5 md:flex-row">
          <div className="w-full md:w-4/12">
            <img
              className="w-full rounded-lg"
              src={defaultImage}
              alt="Meeting"
            />
          </div>
          <div className="w-full rounded-lg bg-pal-lightwhite p-6 text-xl md:w-5/12">
            <p className="mb-2 font-semibold">방장닉네임</p>
            <p className="mb-4 text-3xl font-bold">제목입니다</p>
            <p className="mb-4">
              여기에 세부내용이 들어갑니다.
              ㅇㅁㄹㅇㄴㄻㄴㄹㅇㅁㄴㅇㄻㄴㅇㄻㄴㄹㅇ
            </p>
            <div className="mb-2 flex items-center gap-x-2 text-pal-purple">
              <span className="material-symbols-outlined">groups</span>
              <p>2/4</p>
            </div>
            <div className="mb-4 flex items-center gap-x-2 text-pal-purple">
              <span className="material-symbols-outlined">calendar_month</span>
              <p>2024.07.26 14:30~15:00</p>
            </div>
            <button className="w-full rounded-lg bg-pal-purple px-5 py-2 text-pal-lightwhite transition-colors duration-200 hover:bg-purple-900">
              신청하기
            </button>
          </div>
        </div>
      </div>
    </ContentsLayout>
  );
};

export default MeetingDetail;
