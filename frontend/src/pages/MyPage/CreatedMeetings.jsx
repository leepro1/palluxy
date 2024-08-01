import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { instance } from '@/utils/axios';
import Pagination from '@pages/HealingMeetingOverviewPage/Pagination';
import { Link } from 'react-router-dom';
import ContentsLayout from '@layout/ContentsLayout';

const CreatedMeetings = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['userInfo']);
  const userId = userInfo.id;
  const [allMeetings, setAllMeetings] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchAllMeetings = async () => {
    try {
      let page = 0;
      let totalPages = 1;
      const allMeetings = [];

      while (page < totalPages) {
        const response = await instance.get(`/api/group/my/${userId}/${page}`);
        const result = response.data.result;
        allMeetings.push(...result.groups);
        if (page === 0) {
          totalPages = Math.ceil(result.totalGroupCount / itemsPerPage);
        }
        page += 1;
      }

      const userMeetings = allMeetings.filter(
        (meeting) => meeting.leaderId === userId,
      );

      setAllMeetings(userMeetings);
      console.log(userMeetings);
      setTotalPage(Math.ceil(userMeetings.length / itemsPerPage));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchAllMeetings();
    }
  }, [userId]);

  useEffect(() => {
    const indexOfLastMeeting = currentPage * itemsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - itemsPerPage;
    setMeetings(allMeetings.slice(indexOfFirstMeeting, indexOfLastMeeting));
  }, [allMeetings, currentPage, itemsPerPage]);

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
                <div>
                  <p>{meeting.startTime}</p>
                  <p>{meeting.endTime}</p>
                </div>
                <p className="font-thin">{meeting.description}</p>
              </div>
            ))
          ) : (
            <p>현재 생성한 모임이 없습니다.</p>
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

export default CreatedMeetings;
