import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { instance } from '@/utils/axios';
import PropTypes from 'prop-types';

const CreateNotice = ({ removeModal, onSessionCreated }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      removeModal();
    }
  };

  const onSubmit = async (data) => {
    const postData = {
      title: data.title,
      content: data.content,
    };

    try {
      await instance.post('/api/notice', postData, {});
      onSessionCreated('공지사항이 등록되었습니다');
      removeModal();
    } catch (error) {
      console.error('Error:', error);
      onSessionCreated('에러 발생, 잠시 후에 시도해 주세요');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="w-1/2 rounded bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-black">
          공지사항 생성하기
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
              공지 제목*
            </label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: '공지 제목을 입력해주세요.' }}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full rounded border px-3 py-2 text-black"
                  placeholder="공지 제목을 입력해주세요."
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
              공지 상세 설명*
            </label>
            <Controller
              name="content"
              control={control}
              defaultValue=""
              rules={{ required: '공지 상세 설명을 작성해주세요.' }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full rounded border px-3 py-2 text-black"
                  placeholder="공지 상세 설명을 작성해주세요."
                  rows="4"
                ></textarea>
              )}
            />
            {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div className="flex justify-center gap-20">
            <button
              type="submit"
              className="rounded bg-pal-purple px-4 py-2 text-white"
            >
              등록하기
            </button>
            <button
              type="button"
              className="rounded bg-gray-500 px-4 py-2 text-white"
              onClick={removeModal}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateNotice.propTypes = {
  removeModal: PropTypes.func.isRequired,
  onSessionCreated: PropTypes.func.isRequired,
};

export default CreateNotice;
