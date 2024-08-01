import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { instance } from '@/utils/axios';
import Pagination from '@pages/HealingMeetingOverviewPage/Pagination';
import { Link } from 'react-router-dom';
import ContentsLayout from '@layout/ContentsLayout';

const AppliedMeetings = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['userInfo']);
  const userId = userInfo?.id;
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const fetchMeetings = async (page) => {
    try {
      const response = await instance.get(
        `/api/group/my/${userId}/${page - 1}`,
      );
      const result = response.data.result;
      const allMeetings = result.groups;
      const userMeetings = allMeetings.filter(
        (meeting) => meeting.leaderId !== userId,
      );

      setMeetings(userMeetings);

      setTotalPage(Math.ceil(userMeetings.length / itemsPerPage));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMeetings(currentPage);
    }
  }, [userId, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginatePrev = (showingPage) =>
    setCurrentPage(Math.max(showingPage - 1, 1));
  const paginateNext = (showingPage) =>
    setCurrentPage(Math.min(showingPage + 1, totalPage));

  return (
    <ContentsLayout>
      <div>
        <div className="flex flex-col justify-center">
          {error ? (
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
          )}
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
