import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams, ScrollRestoration } from 'react-router-dom';
import Pagination from '@pages/AdminPage/Pagination';
import ContentsLayout from '@layout/ContentsLayout';
import defaultImage from '@assets/images/healingMeetingOverview/default.png';
import { instance } from '@/utils/axios';

// 날짜 포맷 유틸리티 함수
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

const AdminPage = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['userInfo']);
  const { pageIndex } = useParams();
  const pageIndexInt = parseInt(pageIndex, 10);
  const itemsPerPage = 9;
  const [totalPage, setTotalPage] = useState(0);
  const [showingPage, setShowingPage] = useState(pageIndexInt);
  const showingPageMin = Math.max(showingPage - 2, 1);
  const showingPageMax = Math.min(showingPage + 2, totalPage);
  const [data, setData] = useState(null);
  const [datalength, setDatalength] = useState(0);
  const navigate = useNavigate();

  // 어드민 여부 확인
  useEffect(() => {
    if (userInfo?.isAdmin == false) {
      navigate('/'); // 어드민이 아닌 경우 홈으로 리다이렉트
    }
  }, [userInfo, navigate]);

  const fetchData = async () => {
    try {
      const response = await instance.get(
        `/api/group/wait/${pageIndexInt - 1}`,
      );
      setTotalPage(Math.ceil(response.data.result.totalGroupCount / 9));
      setData(response.data.result.groups);
      setDatalength(response.data.result.totalGroupCount);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIndexInt]);

  const handleAcceptButton = async (index) => {
    try {
      const response = await instance.patch(`api/admin/group/accept/${index}`);
      console.log(response);
      fetchData(); // 데이터 다시 불러오기
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectButton = async (index) => {
    try {
      const response = await instance.patch(`api/admin/group/reject/${index}`);
      console.log(response);
      fetchData(); // 데이터 다시 불러오기
    } catch (error) {
      console.error(error);
    }
  };

  const paginate = (pageNumber) => {
    navigate(`/admin/${pageNumber}`);
    setShowingPage(pageNumber);
  };

  const paginatePrev = (showingPage) => {
    setShowingPage(Math.max(showingPage - 5, 1));
  };

  const paginateNext = (showingPage) => {
    setShowingPage(Math.min(showingPage + 5, totalPage));
  };

  return (
    <ContentsLayout>
      <ScrollRestoration />
      <div>
        <p className="text-4xl text-pal-lightwhite">관리자 페이지</p>
        <div className="flex justify-center">
          <p className="mx-36 w-full rounded-lg bg-pal-purple p-2 text-center text-lg text-pal-lightwhite">
            치유모임 관리
          </p>
        </div>
        <p></p>
      </div>
      <div className="text-white">
        {datalength ? (
          <div className="m-5 grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data?.map((item, index) => (
              <div
                className="m-3 flex w-3/4 flex-col items-center rounded-md border border-gray-700 bg-pal-lightwhite text-pal-overlay shadow transition hover:-translate-x-1 hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-900"
                key={index}
              >
                <div className="relative w-full rounded-md">
                  {item.filePath === null ? (
                    <div className="mb-1 flex aspect-square w-full justify-center">
                      <img
                        src={defaultImage}
                        alt="image"
                        className="rounded-md"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                        <p className="text-xl text-pal-lightwhite">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-1 flex aspect-square w-full justify-center">
                      <img
                        src={item.filePath}
                        alt="image"
                        className="rounded-md"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                        <button className="rounded border-gray-700 bg-pal-purple px-4 py-2 text-pal-lightwhite">
                          신청하기
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full p-4 text-left">
                  <p className="mb-2 text-2xl font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <div className="flex flex-row gap-x-2 text-pal-purple">
                    <span className="material-symbols-outlined">
                      calendar_month
                    </span>
                    <p>{formatDateRange(item.startTime, item.endTime)}</p>
                  </div>
                  <div className="my-1 flex flex-row gap-x-2 text-pal-purple">
                    <span className="material-symbols-outlined">groups</span>
                    <p>
                      {item.maxCapacity - item.remainCapacity}/
                      {item.maxCapacity}
                    </p>
                  </div>
                  <div>
                    <p>방장 : {item.leaderNickname}</p>
                  </div>
                  <div className="flex justify-between px-5 text-pal-lightwhite">
                    <button
                      onClick={() => handleAcceptButton(item.id)}
                      className="mx-1 w-full rounded-lg bg-pal-purple py-2 hover:bg-purple-950"
                    >
                      수락
                    </button>
                    <button
                      onClick={() => handleRejectButton(item.id)}
                      className="mx-1 w-full rounded-lg bg-pal-error py-2 hover:bg-red-800"
                    >
                      거절
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-5xl">신청된 모임이 없습니다.</p>
        )}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalPage={totalPage}
          paginate={paginate}
          paginatePrev={paginatePrev}
          paginateNext={paginateNext}
          showingPage={showingPage}
          showingPageMax={showingPageMax}
          showingPageMin={showingPageMin}
          pageIndexInt={pageIndexInt}
        />
      </div>
    </ContentsLayout>
  );
};

export default AdminPage;
