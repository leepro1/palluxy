import React, { useState, useEffect } from 'react';
import ContentsLayout from '@layout/ContentsLayout';
import { Link } from 'react-router-dom';
import { instance } from '@/utils/axios';
import Pagination from '@pages/HealingMeetingOverviewPage/Pagination';

const NoticeBoard = () => {
  const [error, setError] = useState(null);
  const [notices, setNotices] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchNotice = async (pageNumber) => {
    try {
      const response = await instance.get(`api/notice/${pageNumber - 1}`);
      const result = response.data.result;
      const allNotices = result.notices;

      setNotices(allNotices);
      setTotalPage(Math.ceil(allNotices.length / itemsPerPage));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchNotice(currentPage);
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginatePrev = (showingPage) =>
    setCurrentPage(Math.max(showingPage - 1, 1));
  const paginateNext = (showingPage) =>
    setCurrentPage(Math.min(showingPage + 1, totalPage));

  const indexOfLastNotice = currentPage * itemsPerPage;
  const indexOfFirstNotice = indexOfLastNotice - itemsPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  return (
    <ContentsLayout>
      <div>
        <div>
          <h1 className="text-center font-jamsilBold text-3xl text-white">
            공지사항
          </h1>
          <div className="my-2">
            <div className="border border-white"></div>
            <div className="text-white">제목</div>
            <div className="border border-white"></div>
          </div>
          <div>
            {currentNotices.length > 0 ? (
              currentNotices.map((notice) => (
                <div key={notice.id}>
                  <Link to={`api/notice/detail/${notice.id}`}>
                    {notice.title}
                  </Link>
                </div>
              ))
            ) : (
              <p>현재 등록된 공지사항이 없습니다.</p>
            )}
          </div>
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

export default NoticeBoard;
