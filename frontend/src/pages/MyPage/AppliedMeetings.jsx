import React, { useState } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { instance } from '@/utils/axios';
import Pagination from '@pages/HealingMeetingOverviewPage/Pagination';
import { Link } from 'react-router-dom';
import ContentsLayout from '@layout/ContentsLayout';
import Loading from '@components/Loading';
import NotFound from '@components/NotFound';

const fetchMeetings = async (userId) => {
  let page = 0;
  let totalPages = 1;
  const allMeetings = [];

  while (page < totalPages) {
    const response = await instance.get(`/api/group/my/all/${userId}/${page}`);
    const result = response.data.result;
    allMeetings.push(...result.groups);
    if (page === 0) {
      totalPages = Math.ceil(result.totalGroupCount / 5);
    }
    page += 1;
  }

  return allMeetings.filter((meeting) => meeting.leaderId !== userId);
};

const AppliedMeetings = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['userInfo']);
  const userId = userInfo?.id;
  const itemsPerPage = 5;
  let content;

  const {
    data: allMeetings = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['meetings', userId],
    queryFn: () => fetchMeetings(userId),
    retry: 1,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(allMeetings.length / itemsPerPage);

  const indexOfLastMeeting = currentPage * itemsPerPage;
  const indexOfFirstMeeting = indexOfLastMeeting - itemsPerPage;
  const meetings = allMeetings.slice(indexOfFirstMeeting, indexOfLastMeeting);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginatePrev = (showingPage) =>
    setCurrentPage(Math.max(showingPage - 1, 1));
  const paginateNext = (showingPage) =>
    setCurrentPage(Math.min(showingPage + 1, totalPage));

  if (isLoading) {
    return (
      <ContentsLayout>
        <Loading />
      </ContentsLayout>
    );
  } else if (error) {
    return (
      <ContentsLayout>
        <NotFound />
      </ContentsLayout>
    );
  }
  if (meetings.length > 0) {
    content = meetings.map((meeting) => {
      return (
        <div
          key={meeting.id}
          className="mx-5 my-2 rounded bg-white px-5 py-2 shadow-md transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="flex flex-row justify-between">
            <Link to={`/meetingoverview/detail/${meeting.id}`}>
              <div className="font-jamsilRegular text-xl">{meeting.title}</div>
              <p className="font-jamsilLight">{meeting.description}</p>
            </Link>
            <div className="flex items-center text-end">
              {meeting.startTime.split('T')[0]}
            </div>
          </div>
        </div>
      );
    });
  } else {
    content = (
      <p className="p-2 font-jamsilLight text-lg">
        현재 신청한 모임이 없습니다.
      </p>
    );
  }

  return (
    <ContentsLayout>
      <div className="flex min-h-[480px] flex-col">
        <div className="flex flex-grow flex-col">{content}</div>
        {meetings.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              itemsPerPage={itemsPerPage}
              totalPage={totalPage}
              paginate={paginate}
              paginatePrev={paginatePrev}
              paginateNext={paginateNext}
              showingPage={currentPage}
              showingPageMax={Math.min(currentPage + 2, totalPage)}
              showingPageMin={Math.max(currentPage - 2, 1)}
              pageIndexInt={currentPage}
            />
          </div>
        )}
      </div>
    </ContentsLayout>
  );
};

export default AppliedMeetings;
