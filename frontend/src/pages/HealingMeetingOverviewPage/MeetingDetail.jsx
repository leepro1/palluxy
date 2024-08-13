import React, { useEffect, useState } from 'react';
import ContentsLayout from '@layout/ContentsLayout';
import { useNavigate, useParams, ScrollRestoration } from 'react-router-dom';
import defaultImage from '@assets/images/healingMeetingOverview/default.png';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const fetchData = async () => {
    try {
      const response = await instance.get(`api/group/detail/${meetingIdInt}`);
      setData(response.data.result);
      setTitle(response.data.result.title);
      setDescription(response.data.result.description);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [meetingIdInt]);

  const navigate = useNavigate();

  const handleSubmitButton = async () => {
    const postData = {
      userId: userInfo.id,
    };

    try {
      await instance.post(`/api/group/detail/${meetingIdInt}/join`, postData);
      fetchData(); // 데이터 다시 불러오기
      setNotification('성공적으로 신청됐습니다');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000); // 3초 후에 메시지 사라지게 하기
    } catch (err) {
      setNotification('에러 발생, 잠시 후에 시도해 보세요');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const handleCancelButton = async () => {
    const postData = {
      userId: userInfo.id,
    };

    try {
      await instance.delete(`/api/group/detail/${meetingIdInt}/join`, {
        data: postData,
      });
      setNotification('성공적으로 취소됐습니다');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      fetchData(); // 데이터 다시 불러오기
    } catch (err) {
      setNotification('에러 발생, 잠시 후에 시도해 보세요');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const handleEditButton = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = async () => {
    const patchData = {
      title,
      description,
    };

    try {
      await instance.patch(`/api/group/detail/${meetingIdInt}`, patchData);
      setData((prevData) => ({
        ...prevData,
        title: patchData.title,
        description: patchData.description,
      }));
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  const renderButton = () => {
    if (!userInfo) {
      return <p>로그인 후 신청해 주세요 </p>; // 로그인이 되어있지 않을 때
    }
    if (userInfo.id === data.leaderId) {
      return (
        <button
          onClick={handleEditButton}
          className="w-full rounded-lg bg-pal-purple px-5 py-2 text-pal-lightwhite transition-colors duration-200 hover:bg-purple-950"
        >
          모임 수정
        </button>
      );
    }

    const now = new Date();
    const startTime = new Date(data.startTime);
    if (now >= startTime) {
      return <p>이미 마감된 공고입니다</p>;
    }

    if (data.groupUserId?.includes(userInfo.id)) {
      return (
        <button
          onClick={handleCancelButton}
          className="w-full rounded-lg bg-pal-purple px-5 py-2 text-pal-lightwhite transition-colors duration-200 hover:bg-purple-950"
        >
          신청 취소
        </button>
      );
    }
    if (data.remainCapacity === 0) {
      return <p>이미 마감된 공고입니다</p>;
    }
    return (
      <button
        onClick={handleSubmitButton}
        className="w-full rounded-lg bg-pal-purple px-5 py-2 text-pal-lightwhite transition-colors duration-200 hover:bg-purple-950"
      >
        신청하기
      </button>
    );
  };

  return (
    <ContentsLayout>
      <ScrollRestoration />
      <div className="container mx-auto p-4">
        <button
          type="button"
          onClick={handleBackButton}
          className="flex items-center justify-center gap-x-2 rounded-lg bg-pal-purple px-5 py-2 text-sm text-pal-lightwhite transition-colors duration-200 hover:bg-purple-950"
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
            {renderButton()}
          </div>
        </div>
      </div>
      {showNotification && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 transform rounded bg-pal-purple p-4 text-white shadow-lg">
          {notification}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">모임 수정</h2>
            <label className="mb-2 block">
              제목:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded border border-gray-300 p-2"
              />
            </label>
            <label className="mb-4 block">
              상세 설명:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded border border-gray-300 p-2"
              />
            </label>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded bg-gray-300 px-4 py-2"
              >
                취소
              </button>
              <button
                onClick={handleModalSubmit}
                className="rounded bg-pal-purple px-4 py-2 text-white"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </ContentsLayout>
  );
};

export default MeetingDetail;
