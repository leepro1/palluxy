import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MakeSession from './MakeSession';
import Pagination from './Pagination';
import './app.css';
import ContentsLayout from '@layout/ContentsLayout';
import defaultImage from '@assets/images/healingMeetingOverview/default.png';
import { useParams } from 'react-router-dom';
import { ScrollRestoration } from 'react-router-dom';
// 더미데이터([Item 1, Item 2, Item 3 ...])
const data = Array.from({ length: 200 }, (_, index) => `Item ${index + 1}`);

const HealingSessionPage = () => {
  const { pageIndex } = useParams();
  const pageIndexInt = parseInt(pageIndex, 10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 9;
  const indexOfLastItem = pageIndexInt * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPage = Math.ceil(data.length / itemsPerPage);
  const [showingPage, setShowingPage] = useState(pageIndexInt);
  const showingPageMin = Math.max(showingPage - 2, 1);
  const showingPageMax = Math.min(showingPage + 2, totalPage);

  const navigate = useNavigate();

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    navigate(`/meetingoverview/${pageNumber}`);
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

  const handleImageClick = (index) => {
    navigate(`/meetingoverview/detail/${index}`);
  };

  return (
    <ContentsLayout>
      <ScrollRestoration />
      <div className="text-white">
        <div className="flex flex-row justify-between">
          <div className="flex w-6/12 flex-row">
            <select
              id="categories"
              className="block w-2/12 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="leader">방장</option>
              <option value="meetingName">모임 이름</option>
            </select>

            <form className="mx-3 w-7/12">
              <label
                htmlFor="default-search"
                className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="방장 혹은 모임 이름을 검색해보세요"
                  required
                />
                <button
                  type="submit"
                  className="absolute bottom-2.5 end-2.5 rounded-lg bg-pal-purple px-4 py-2 text-sm font-medium text-white hover:bg-purple-950 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  검색
                </button>
              </div>
            </form>
          </div>
          <div className="flex w-3/12 flex-row items-center">
            <div className="me-3 inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor="check"
              >
                <input
                  type="checkbox"
                  className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-pal-purple checked:before:bg-gray-900 hover:before:opacity-10"
                  id="check"
                />
                <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <label
                className="mt-px cursor-pointer select-none font-light text-pal-lightwhite"
                htmlFor="check"
              >
                마감된 모임 제외하기
              </label>
            </div>
            <div
              className="h-max cursor-pointer rounded bg-pal-purple p-2 text-center text-white"
              onClick={openModal}
            >
              생성하기
            </div>
          </div>
        </div>

        <div className="m-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {currentItems.map((item, index) => (
            <div
              className="m-3 flex w-3/4 cursor-pointer flex-col items-center rounded-md border border-gray-700 bg-pal-lightwhite text-pal-overlay shadow transition hover:-translate-x-1 hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-900"
              key={index}
              onClick={() => handleImageClick(index)}
            >
              <div className="relative w-full rounded-md">
                <div className="mb-1 flex aspect-square w-full justify-center">
                  <img
                    src={defaultImage}
                    alt="default"
                    className="rounded-md"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <button className="rounded border-gray-700 bg-pal-purple px-4 py-2 text-pal-lightwhite">
                      신청하기
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full p-4 text-left">
                <p className="mb-2 text-2xl font-semibold text-gray-900">
                  제목제목제목제목제목
                </p>
                <p className="text-gray-700">
                  {item} 내용예시 내용예시 내용예시 내용예시 내용예시 내용예시
                  내용예시ㄴㅁㅇasdaasdasdsdsa
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
          showingPage={showingPage}
          showingPageMax={showingPageMax}
          showingPageMin={showingPageMin}
          pageIndexInt={pageIndexInt}
        />

        {isModalOpen && <MakeSession removeModal={closeModal} />}
      </div>
    </ContentsLayout>
  );
};

export default HealingSessionPage;
