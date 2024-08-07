import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { instance } from '@/utils/axios';
const MakeSession = ({ removeModal, onSessionCreated }) => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['userInfo']);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorTrigger, setErrorTrigger] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [uploadImage, setUploadImage] = useState(null);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      removeModal();
    }
  };

  const handleFileChange = (e) => {

    setSelectedFile(e.target.files[0]);
    if (e.target.files) {
      setUploadImage(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onSubmit = async (data) => {
    const start_time = `${data.startDate}T${data.startTime.hour.padStart(2, '0')}:${data.startTime.minute.padStart(2, '0')}`;
    const end_time = `${data.startDate}T${data.endTime.hour.padStart(2, '0')}:${data.endTime.minute.padStart(2, '0')}`;
    if (
      parseInt(data.endTime.hour) < parseInt(data.startTime.hour) ||
      (parseInt(data.endTime.hour) === parseInt(data.startTime.hour) &&
        parseInt(data.endTime.minute) <= parseInt(data.startTime.minute))
    ) {
      setErrorTrigger(true);
      return;
    }
    const postData = {
      title: data.title,
      description: data.description,
      leaderId: userInfo.id,
      startTime: start_time,
      endTime: end_time,
      maxCapacity: parseInt(data.max_capacity),
      file: uploadImage,
    };
 
    try {
      await instance.post('/api/group', postData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      onSessionCreated('새 모임이 성공적으로 생성되었습니다!')
      removeModal();
    } catch (error) {
      console.error('Error:', error);
      onSessionCreated('에러 발생, 잠시 후에 시도해 주세요')
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
          모임 생성하기
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
              모임 이름*
            </label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: '모임 이름을 입력해주세요.' }}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full rounded border px-3 py-2 text-black"
                  placeholder="모임 이름을 입력해주세요."
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
              모임 상세 설명*
            </label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: '모임 상세 설명을 작성해주세요.' }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full rounded border px-3 py-2 text-black"
                  placeholder="어떤 모임을 가지고 싶으신가요? 모임에 대한 상세 설명을 작성해주세요."
                  rows="4"
                ></textarea>
              )}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="font-semi bold block text-gray-700">
              모임 일자*
            </label>
            <div className="flex w-fit items-center gap-2 text-black">
              <Controller
                name="startDate"
                control={control}
                defaultValue=""
                rules={{ required: '시작 날짜를 선택해주세요.' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="rounded border px-3 py-2"
                  />
                )}
              />
              {errors.startDate && (
                <p className="text-red-500">{errors.startDate.message}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
              시작 시간 ~ 종료 시간*
            </label>
            <div className="flex w-fit items-center gap-2 text-black">
              <Controller
                name="startTime.hour"
                control={control}
                defaultValue=""
                rules={{
                  required: '시작 시간을 입력해주세요.',
                  min: { value: 0, message: '0 이상이어야 합니다.' },
                  max: { value: 23, message: '23 이하이어야 합니다.' },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="rounded border px-3 py-2"
                    placeholder="ex.10"
                    min="0"
                    max="23"
                  />
                )}
              />
              <div>시</div>
              <Controller
                name="startTime.minute"
                control={control}
                defaultValue=""
                rules={{
                  required: '시작 시간을 입력해주세요.',
                  min: { value: 0, message: '0 이상이어야 합니다.' },
                  max: { value: 59, message: '59 이하이어야 합니다.' },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="rounded border px-3 py-2"
                    placeholder="ex.0"
                    min="0"
                    max="59"
                  />
                )}
              />
              <div>분 ~ </div>
              <Controller
                name="endTime.hour"
                control={control}
                defaultValue=""
                rules={{
                  required: '종료 시간을 입력해주세요.',
                  min: { value: 0, message: '0 이상이어야 합니다.' },
                  max: { value: 23, message: '23 이하이어야 합니다.' },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="rounded border px-3 py-2"
                    placeholder="ex.20"
                    min="0"
                    max="23"
                  />
                )}
              />
              <div>시</div>
              <Controller
                name="endTime.minute"
                control={control}
                defaultValue=""
                rules={{
                  required: '종료 시간을 입력해주세요.',
                  min: { value: 0, message: '0 이상이어야 합니다.' },
                  max: { value: 59, message: '59 이하이어야 합니다.' },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="rounded border px-3 py-2"
                    placeholder="ex.30"
                    min="0"
                    max="59"
                  />
                )}
              />
              <div>분</div>
            </div>
          </div>
          <div className="mb-4">
            <label className="font-semibold text-gray-700">최대 인원*</label>
            <div className="flex items-center gap-2 text-black">
              <Controller
                name="max_capacity"
                control={control}
                defaultValue=""
                rules={{
                  required: '최대 인원을 입력해주세요.',
                  min: { value: 2, message: '최소 2명이어야 합니다.' },
                  max: { value: 4, message: '최대 4명이어야 합니다.' },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="rounded border px-3 py-2"
                    placeholder="2~4"
                    min="2"
                    max="4"
                  />
                )}
              />
              <div>명</div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
              포스터 이미지
            </label>
            <input
              type="file"
              className="w-full rounded border px-3 py-2"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-700">
                선택된 파일: {selectedFile.name}
              </p>
            )}
          </div>
          {errorTrigger ===
            true ? (
              <p className="mb-3 text-red-500">
                시작 시간이 종료 시간보다 빨라야 합니다
              </p>,
            ): (<div></div>)}

          <div className="flex justify-center gap-20">
            <button
              type="submit"
              className="rounded bg-pal-purple px-4 py-2 text-white"
            >
              신청하기
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

export default MakeSession;
