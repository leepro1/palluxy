import React, { useState, useEffect } from 'react';
import ContentsLayout from '@layout/ContentsLayout';
import { Link } from 'react-router-dom';
import { instance } from '@/utils/axios';
import Pagination from '@pages/HealingMeetingOverviewPage/Pagination';

const NoticeBoard = () => {
  const [error, setError] = useState(null);
  const [notices, setNotices] = useState([]);
  const [totalNoticeCount, setTotalNoticeCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchNotice = async (pageNumber) => {
    try {
      const response = await instance.get(`/api/notice/${pageNumber}`);
      const result = response.data.result;
      // const sortedNotices = result.notices.sort((a, b) => b.id - a.id);
      // setNotices(sortedNotices);
      setNotices(result.notices);
      setTotalNoticeCount(result.totalNoticeCount);
      setTotalPage(Math.ceil(result.totalNoticeCount / itemsPerPage));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchNotice(currentPage - 1);
  }, [currentPage]);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const paginatePrev = (showingPage) =>
  //   setCurrentPage(Math.max(showingPage - 1, 1));
  // const paginateNext = (showingPage) =>
  //   setCurrentPage(Math.min(showingPage + 1, totalPage));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginatePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const paginateNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPage));

  return (
    <ContentsLayout>
      <div>
        <div>
          <h1 className="mb-10 text-center font-jamsilBold text-3xl text-white">
            공지사항
          </h1>
          <div className="my-2 w-full">
            <div className="border border-white"></div>
            <div className="flex w-full flex-row">
              <div className="w-[20%] items-center justify-center bg-pal-purple py-2 text-center font-jamsilRegular text-white">
                No.
              </div>
              <div className="w-[80%] items-center justify-center bg-pal-purple py-2 text-center font-jamsilRegular text-white">
                제목
              </div>
            </div>
            <div className="border border-white"></div>
          </div>
          <div className="my-2 border-y-2 border-x-pal-lightwhite text-white">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <div
                  key={notice.id}
                  className="my-2 flex w-full flex-row gap-3 font-jamsilThin"
                >
                  <div className="flex w-full flex-col">
                    <div className="flex flex-row">
                      <div className="w-[20%] text-center">{notice.id}</div>
                      <div className="w-[80%] text-center">
                        <Link to={`/noticeboard/detail/${notice.id}`}>
                          {notice.title}
                        </Link>
                      </div>
                    </div>
                    <div className="w-full border border-white"></div>
                  </div>
                </div>
              ))
            ) : (
              <p>현재 등록된 공지사항이 없습니다.</p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="">
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
