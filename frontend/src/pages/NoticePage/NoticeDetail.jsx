import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContentsLayout from '@layout/ContentsLayout';
import { instance } from '@/utils/axios';
import Loading from '@components/Loading';
import GlobalBtn from '@components/GlobalBtn';
import { useQueryClient } from '@tanstack/react-query';

const NoticeDetail = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['userInfo']);
  const { noticeId } = useParams();
  const [notice, setNotice] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
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

  const handleDelete = async () => {
    try {
      await instance.delete(`/api/notice/detail/${noticeId}`);
      navigate(-1);
    } catch (error) {
      console.error('공지사항을 삭제하는 데 실패했습니다:', error);
    }
  };

  const handleEdit = async () => {
    try {
      await instance.patch(`/api/notice/detail/${noticeId}`, {
        title: editTitle,
        content: editContent,
      });
      setNotice({ ...notice, title: editTitle, content: editContent });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('공지사항을 변경하는 데 실패했습니다:', error);
    }
  };

  const openEditModal = () => {
    setEditTitle(notice.title);
    setEditContent(notice.content);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  if (!notice) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <ContentsLayout>
      <div className="mx-auto flex min-h-[500px] w-[80%] flex-col rounded bg-white bg-opacity-70">
        <div className="p-5 text-center font-jamsilBold text-3xl">
          {notice.title}
        </div>
        <div className="mx-auto w-[90%] border border-gray-200"></div>
        <div className="mx-auto w-[90%] px-10 py-5 font-jamsilRegular">
          {notice.content}
        </div>
        {userInfo?.isAdmin && (
          <div className="mx-auto mb-5 mt-auto flex justify-center space-x-4">
            <GlobalBtn
              className="bg-red-500 font-jamsilRegular text-white"
              size={'md'}
              text={'삭제'}
              onClick={handleDelete}
            />
            <GlobalBtn
              className="bg-blue-500 font-jamsilRegular text-white"
              size={'md'}
              text={'변경'}
              onClick={openEditModal}
            />
          </div>
        )}
        <div className="mx-auto mb-5 mt-auto flex justify-center">
          <GlobalBtn
            className="bg-pal-purple font-jamsilRegular text-white"
            size={'md'}
            text={'목록'}
            onClick={() => navigate(-1)}
          />
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/2 rounded bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">공지사항 수정</h2>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                제목
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                내용
              </label>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                rows="5"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <GlobalBtn
                className="bg-gray-500 font-jamsilRegular text-white"
                size={'md'}
                text={'취소'}
                onClick={closeEditModal}
              />
              <GlobalBtn
                className="bg-pal-purple font-jamsilRegular text-white"
                size={'md'}
                text={'저장'}
                onClick={handleEdit}
              />
            </div>
          </div>
        </div>
      )}
    </ContentsLayout>
  );
};

export default NoticeDetail;
