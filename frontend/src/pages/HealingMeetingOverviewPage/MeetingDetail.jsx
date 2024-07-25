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
      <button
        type="button"
        onClick={handleBackButton}
        className="flex w-1/2 w-full items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
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
      <div className="mt-5 flex flex-row">
        <div className="w-5/12">
          <img
            src={defaultImage}
            alt="img"
          />
        </div>
        <div className="w-7/12 bg-white">
          <p>안녕안녕 {meetingIdInt}</p>
        </div>
      </div>
    </ContentsLayout>
  );
};

export default MeetingDetail;
