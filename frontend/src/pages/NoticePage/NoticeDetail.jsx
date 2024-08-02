import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContentsLayout from '@layout/ContentsLayout';
import { instance } from '@/utils/axios';
import GlobalBtn from '@components/GlobalBtn';

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await instance.get(`/api/notice/detail/${noticeId}`);
        setNotice(response.data.result);
      } catch (error) {
        console.error('공지사항을 불러오는 데 실패했습니다:', error);
      }
    };

    fetchNoticeDetail();
  }, [noticeId]);

  if (!notice) {
    return <div>로딩 중...</div>;
  }

  return (
    <ContentsLayout>
      <div className="mx-auto flex min-h-screen w-[90%] flex-col rounded bg-white">
        <div className="p-5 text-center font-jamsilBold text-3xl">
          {notice.title}
        </div>
        <div className="mx-auto w-[90%] border border-gray-200"></div>
        <div className="mx-auto w-[90%] p-3 font-jamsilRegular">
          {notice.content}
        </div>
        <div className="mx-auto mb-5 mt-auto flex justify-center">
          <GlobalBtn
            className="bg-pal-purple font-jamsilRegular text-white"
            size={'md'}
            text={'목록'}
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </ContentsLayout>
  );
};

export default NoticeDetail;
