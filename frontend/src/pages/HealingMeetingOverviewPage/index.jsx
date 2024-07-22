import React from 'react';
import { useState } from 'react';
import MakeSession from './MakeSession';

const HealingSessionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
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

        <div className="flex items-end gap-4">
          <div>클릭버튼</div>
          <div>마감된 모임 제외하기</div>
        </div>
      </div>

      <div>
        <div>카드 1열</div>
      </div>

      <div>페이지 버튼</div>

      {isModalOpen && <MakeSession removeModal={closeModal} />}
    </div>
  );
};

export default HealingSessionPage;
