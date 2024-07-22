import React, { useState } from 'react';
import MakeSession from './MakeSession';
import Pagination from './Pagination';
import './app.css';
import ContentsLayout from '@layout/ContentsLayout';
import defaultImage from '@assets/images/healingMeetingOverview/default.png';
// 더미데이터([Item 1, Item 2, Item 3 ...])
const data = Array.from({ length: 200 }, (_, index) => `Item ${index + 1}`);

const HealingSessionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPage = Math.ceil(data.length / itemsPerPage);
  const [showingPage, setShowingPage] = useState(currentPage);
  const showingPageMin = Math.max(showingPage - 2, 1);
  const showingPageMax = Math.min(showingPage + 2, totalPage);

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setShowingPage(pageNumber);
  };

  const paginatePrev = (showingPage) => {
    setShowingPage(Math.max(showingPage - 5, 1));
  };

  const paginateNext = (showingPage) => {
    setShowingPage(Math.min(showingPage + 5, totalPage));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ContentsLayout>
      <div className="text-white">
        <div>
          <h1 className="text-3xl font-extrabold">치유모임</h1>
        </div>

        <div
          className="w-20 cursor-pointer rounded bg-pal-purple p-2 text-white"
          onClick={openModal}
        >
          생성하기
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="flex-1 rounded bg-white p-2">
              검색어를 입력하는 공간
            </div>
            <div className="ml-2 cursor-pointer rounded bg-gray-500 p-2 text-white">
              정렬버튼
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {currentItems.map((item, index) => (
            <div
              className="m-3 flex h-96 w-3/4 flex-col items-center rounded-lg bg-pal-lightwhite p-5 text-pal-overlay shadow"
              key={index}
            >
              <div className="mb-4 flex w-full justify-center">
                <img
                  src={defaultImage}
                  alt="default"
                  className="w-5/6"
                />
              </div>
              <div className="w-full text-left">
                <p className="text-xl">제목</p>
                <p>
                  {item} 내용예시 내용예시 내용예시 내용예시 내용예시 내용예시
                  내용예시ㄴㅁㅇㄹㄴㅁㅇㄹㄴㅁㅇㄹ
                </p>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalPage={totalPage}
          paginate={paginate}
          paginatePrev={paginatePrev}
          paginateNext={paginateNext}
          currentPage={currentPage}
          showingPage={showingPage}
          showingPageMax={showingPageMax}
          showingPageMin={showingPageMin}
        />

        {isModalOpen && <MakeSession removeModal={closeModal} />}
      </div>
    </ContentsLayout>
  );
};

export default HealingSessionPage;
