import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import logo from '../../assets/images/logo/logo.svg';

const FindPasswordModal = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) || '이메일의 형태를 갖추어야 합니다.';
  };

  const handleFindPassword = (data) => {
    console.log(data);
    setSuccessMessage(
      '성공적으로 이메일을 발송했습니다.\n 전송되기까지 시간이 소요될 수 있으니 기다려주세요!',
    );
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate('/');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="w-1/2 rounded bg-white bg-opacity-60 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex justify-center">
          <img
            src={logo}
            alt="logo_image"
          />
        </div>
        <h4 className="mb-4 text-center font-bold text-black">
          비밀번호를 찾고자 하는 계정의 이메일을 입력해주세요.
        </h4>
        {successMessage && (
          <p className="mt-4 whitespace-pre-wrap text-center text-green-500">
            {successMessage}
          </p>
        )}
        <form onSubmit={handleSubmit(handleFindPassword)}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">이메일*</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ validate: validateEmail }}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full rounded border px-3 py-2 text-black"
                  placeholder="이메일을 입력해주세요."
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex justify-center gap-20">
            <button
              type="submit"
              className="my-6 w-full rounded bg-pal-purple p-3 text-white"
            >
              비밀번호 찾기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindPasswordModal;
