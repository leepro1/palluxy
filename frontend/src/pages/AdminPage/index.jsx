import React from 'react';
import ContentsLayout from '@layout/ContentsLayout';
import { instance } from '@/utils/axios';

const AdminPage = () => {
  return (
    <ContentsLayout>
      <div>
        <p className="text-4xl text-pal-lightwhite">관리자 페이지</p>
        <div className="flex justify-center">
          <button className="mx-36 bg-pal-purple">치유모임</button>
          <button className="mx-36">공지사항</button>
        </div>
      </div>
    </ContentsLayout>
  );
};

export default AdminPage;
