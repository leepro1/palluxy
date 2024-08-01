import React, { useEffect, useState } from 'react';
import ContentsLayout from '@layout/ContentsLayout';
import { useNavigate, useParams } from 'react-router-dom';
import defaultImage from '@assets/images/healingMeetingOverview/default.png';
import { ScrollRestoration } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { instance } from '@/utils/axios';
const formatDateRange = (startDate, endDate) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const start = new Date(startDate).toLocaleString('ko-KR', options);
  const end = new Date(endDate).toLocaleString('ko-KR', options);

  return `${start.replace(',', '')}~${end.split(' ')[3]}`;
};
const MeetingDetail = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['userInfo']);
  const { meetingId } = useParams();
  const meetingIdInt = parseInt(meetingId, 10);
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`api/group/detail/${meetingIdInt}`);
        console.log(response);
        console.log(response.data.result);
        setData(response.data.result);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  const handleSubmitButton = async () => {
    const postData = {
      userId: userInfo.id,
    };

    try {
      const response = await instance.post(
        `/api/group/detail/${meetingIdInt}/join`,
        postData,
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
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
          {data.filePath === null ? (
            <div className="w-full md:w-4/12">
              <img
                src={defaultImage}
                alt="image"
                className="w-full rounded-lg"
              />
            </div>
          ) : (
            <div className="w-full md:w-4/12">
              <img
                src={data.filePath}
                alt="image"
                className="w-full rounded-lg"
              />
            </div>
          )}
          <div className="w-full rounded-lg bg-pal-lightwhite p-6 text-xl md:w-5/12">
            <p className="mb-2 font-semibold">{data.leaderNickname}</p>
            <p className="mb-4 text-3xl font-bold">{data.title}</p>
            <p className="mb-4">{data.description}</p>
            <div className="mb-2 flex items-center gap-x-2 text-pal-purple">
              <span className="material-symbols-outlined">groups</span>
              <p>
                {data.maxCapacity - data.remainCapacity}/{data.maxCapacity}
              </p>
            </div>
            <div className="mb-4 flex items-center gap-x-2 text-pal-purple">
              <span className="material-symbols-outlined">calendar_month</span>
              <p>{formatDateRange(data.startTime, data.endTime)}</p>
            </div>
            <button
              onClick={() => {
                handleSubmitButton();
              }}
              className="w-full rounded-lg bg-pal-purple px-5 py-2 text-pal-lightwhite transition-colors duration-200 hover:bg-purple-900"
            >
              신청하기
            </button>
          </div>
        </div>
      </div>
    </ContentsLayout>
  );
};

export default MeetingDetail;
