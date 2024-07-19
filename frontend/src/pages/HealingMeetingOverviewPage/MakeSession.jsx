import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

const MakeSession = ({ removeModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const start_time = `${data.startDate}T${data.startTime.hour.padStart(2, '0')}:${data.startTime.minute.padStart(2, '0')}`;
    const end_time = `${data.endDate}T${data.endTime.hour.padStart(2, '0')}:${data.endTime.minute.padStart(2, '0')}`;
    console.log({
      title: data.title,
      description: data.description,
      start_time,
      end_time,
      max_capacity: data.max_capacity,
      file_path: selectedFile ? selectedFile.name : '',
    });
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      removeModal();
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
            <label className="block font-semibold text-gray-700">
              시작 일시*
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
              <div>분</div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
              종료 일시*
            </label>
            <div className="flex w-fit items-center gap-2 text-black">
              <Controller
                name="endDate"
                control={control}
                defaultValue=""
                rules={{ required: '종료 날짜를 선택해주세요.' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="rounded border px-3 py-2"
                  />
                )}
              />
              {errors.endDate && (
                <p className="text-red-500">{errors.endDate.message}</p>
              )}
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
