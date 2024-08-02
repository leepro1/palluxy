import React, { useEffect, useState } from 'react';
import ContentsLayout from '@layout/ContentsLayout';
import { instance } from '@/utils/axios';
import GlobalBtn from '@components/GlobalBtn';

const CreateNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <ContentsLayout>
      <div className="mx-auto flex min-h-[500px] w-[90%] flex-col rounded bg-white">
        <div className="p-5 text-center font-jamsilBold text-3xl">
          공지사항 작성
        </div>
        <div className="mx-auto w-[90%] border border-gray-200"></div>
        <div className="mx-auto w-[90%] p-3 font-jamsilRegular">
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="title"
            >
              제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              className="w-full rounded border px-3 py-2 text-gray-700 shadow"
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 text-sm font-bold text-gray-700"
              htmlFor="content"
            >
              내용
            </label>
            <textarea
              id="content"
              value={content}
              className="w-full rounded border px-3 py-2 text-gray-700 shadow"
              rows="10"
            />
          </div>
        </div>
        <div className="mx-auto mb-5 mt-auto flex justify-center">
          <GlobalBtn
            className="bg-pal-purple font-jamsilRegular text-white"
            size={'md'}
            text={'등록'}
          />
        </div>
      </div>
    </ContentsLayout>
  );
};

export default CreateNotice;
