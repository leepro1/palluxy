import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import logo from '@assets/images/logo/logo.svg';
import { instance } from '@/utils/axios';
import ContentsLayout from '@layout/ContentsLayout';

const FindPasswordModal = () => {
  const navigate = useNavigate();
  const [resetVerificationCodeSent, setResetVerificationCodeSent] =
    useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
  } = useForm({ mode: 'onChange' });

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) || '이메일의 형태를 갖추어야 합니다.';
  };

  const handleFindPassword = async (data) => {
    console.log(data);
    try {
      await sendResetVerificationCode(data.email);
      setSuccessMessage(
        '성공적으로 이메일을 발송했습니다.\n 전송되기까지 시간이 소요될 수 있으니 기다려주세요!',
      );
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  // const handleBackgroundClick = (e) => {
  //   if (e.target === e.currentTarget) {
  //     navigate(-1);
  //   }
  // };

  const sendResetVerificationCode = async (email) => {
    try {
      const response = await instance.post('/api/email/code', {
        type: 'password',
        email,
      });
      if (response.status !== 200) {
        throw new Error(response.data.message || '이메일 전송에 실패했습니다.');
      }

      setResetVerificationCodeSent(true);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const email = watch('email', '');
  const isEmailValid = validateEmail(email) == true;

  return (
    <ContentsLayout>
      <div className="flex items-center justify-center">
        <div className="w-[700px] rounded bg-white bg-opacity-60 p-6">
          <div className="mb-4 flex justify-center">
            <img
              src={logo}
              alt="logo_image"
            />
          </div>
          <h4 className="mb-10 text-center font-bold text-black">
            비밀번호를 찾고자 하는 계정의 이메일을 입력해주세요.
          </h4>
          {successMessage && (
            <p className="mt-4 whitespace-pre-wrap text-center text-green-500">
              {successMessage}
            </p>
          )}
          <form onSubmit={handleSubmit(handleFindPassword)}>
            <div className="mb-4">
              <div className="flex flex-row items-center">
                <label className="mr-2 w-1/3 text-end font-semibold text-gray-700">
                  이메일*
                </label>
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
              </div>
              <div className="flex flex-row">
                <div className="w-1/3"></div>
                <div className="w-full">
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 비밀번호 찾기 버튼 */}
            <div className="flex justify-center gap-20">
              <button
                type="submit"
                className={`my-6 w-full rounded p-3 text-white ${
                  isEmailValid
                    ? 'bg-pal-purple'
                    : 'cursor-not-allowed bg-pal-disable'
                }`}
                disabled={!isEmailValid}
              >
                비밀번호 찾기
              </button>
            </div>
          </form>
        </div>
      </div>
    </ContentsLayout>
  );
};

export default FindPasswordModal;
