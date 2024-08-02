import React from 'react';
import ContentsLayout from '@layout/ContentsLayout';
import { instance } from '@/utils/axios';

const AdminPage = () => {
  return (
    <ContentsLayout>
      <div>
        <p className="text-4xl text-pal-lightwhite">어드민 페이지</p>
      </div>
    </ContentsLayout>
  );
};

export default AdminPage;
