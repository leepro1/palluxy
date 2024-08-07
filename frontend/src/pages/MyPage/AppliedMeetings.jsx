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
    const response = await instance.get(`/api/group/my/${userId}/${page}`);
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
  } else if (meetings.length > 0) {
    content = meetings.map((meeting) => (
      <div
        key={meeting.id}
        className="mx-16 my-2"
      >
        <div className="text-xl font-semibold">
          <Link to={`/meetingoverview/detail/${meeting.id}`}>
            {meeting.title}
          </Link>
        </div>
        <p className="font-thin">{meeting.description}</p>
      </div>
    ));
  } else {
    content = <p>현재 신청한 모임이 없습니다.</p>;
  }

  return (
    <ContentsLayout>
      <div>
        <div className="flex flex-col justify-center">
          {content}
          {/* {error ? (
            <p>오류가 발생했습니다: {error.message}</p>
          ) : meetings.length > 0 ? (
            meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="mx-16 my-2"
              >
                <div className="text-xl font-semibold">
                  <Link to={`/meetingoverview/detail/${meeting.id}`}>
                    {meeting.title}
                  </Link>
                </div>
                <p className="font-thin">{meeting.description}</p>
              </div>
            ))
          ) : (
            <p>현재 신청한 모임이 없습니다.</p>
          )} */}
        </div>
        <div className="flex justify-center">
          <div className="absolute bottom-0">
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
        </div>
      </div>
    </ContentsLayout>
  );
};

export default AppliedMeetings;
