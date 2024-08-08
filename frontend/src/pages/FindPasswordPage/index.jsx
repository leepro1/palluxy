import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import logo from '@assets/images/logo/logo.svg';
import { instance } from '@/utils/axios';
import ContentsLayout from '@layout/ContentsLayout';

const FindPasswordModal = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
  } = useForm({ mode: 'onChange' });

  const sendResetVerificationCode = async (email) => {
    const response = await instance.post('/api/email/code', {
      type: 'password',
      email,
    });
    if (response.status !== 200) {
      throw new Error(response.data.message || '이메일 전송에 실패했습니다.');
    }
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: sendResetVerificationCode,
    onSuccess: () => {
      setSuccessMessage(
        '성공적으로 이메일을 발송했습니다.\n 전송되기까지 시간이 소요될 수 있으니 기다려주세요!',
      );
    },
    onError: (error) => {
      setError('email', {
        type: 'manual',
        message: error.message,
      });
    },
  });

  // const checkEmailDuplicate = async (email) => {
  //   if (!email) {
  //     setError('email', {
  //       type: 'manual',
  //       message: '이메일을 입력해주세요.',
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await instance.get(`/api/users/check-email/${email}`);

  //     if (response.status === 200) {
  //       setIsEmailChecked(true);
  //     } else {
  //       setIsEmailChecked(false);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 400) {
  //       setIsEmailChecked(false);
  //     }
  //   }
  // };

  const handleFindPassword = (data) => {
    mutation.mutate(data.email);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) || '이메일의 형태를 갖추어야 합니다.';
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
            회원가입한 이메일 주소를 입력해주세요.
          </h4>
          {successMessage && (
            <p className="mb-4 whitespace-pre-wrap text-center text-pal-purple">
              {successMessage}
            </p>
          )}
          <form onSubmit={handleSubmit(handleFindPassword)}>
            <div className="mb-4">
              <div className="flex flex-row items-center">
                <label className="mr-2 w-1/3 text-end font-semibold text-gray-700">
                  이메일
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
                {mutation.isPending ? '전송 중...' : '이메일 전송'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ContentsLayout>
  );
};

export default FindPasswordModal;
