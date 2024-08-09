import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { instance } from '@/utils/axios';
import ContentsLayout from '@layout/ContentsLayout';
import logo from '@assets/images/logo/logo.svg';

const ResetPasswordModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const code = urlParams.get('code');

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
  } = useForm({ mode: 'onChange' });

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,16}$/;
    return (
      passwordPattern.test(password) ||
      '9자 이상 16자 이하, 한 개 이상의 숫자/영어/특수문자를 포함해야 합니다.'
    );
  };

  const resetPasswordMutation = useMutation({
    mutationFn: (payload) =>
      instance.patch('/api/users/reset-password', payload),
    onSuccess: () => {
      navigate('/signin');
    },
    onError: (error) => {
      console.error('resetPassword 실패', error);
      setError('password', {
        type: 'manual',
        message: '비밀번호 재설정에 실패했습니다. 다시 시도해주세요.',
      });
    },
  });

  const onSubmit = (data) => {
    resetPasswordMutation.mutate({ code: code, password: data.password });
  };

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const isPasswordValid = validatePassword(password) === true;
    const isConfirmPasswordValid = validatePassword(confirmPassword) === true;
    const isPasswordsMatch = password === confirmPassword;
    setIsButtonEnabled(
      isPasswordValid && isConfirmPasswordValid && isPasswordsMatch,
    );
  }, [password, confirmPassword]);

  return (
    <ContentsLayout>
      <div className="flex items-center justify-center">
        <div className="w-[700px] rounded bg-white bg-opacity-60 p-10">
          <div className="mb-4 flex justify-center">
            <img
              src={logo}
              alt="logo_image"
            />
          </div>
          <h4 className="mb-10 text-center font-jamsilRegular text-black">
            변경하실 비밀번호를 입력하세요.
          </h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <div className="flex flex-row items-center">
                <label className="mr-2 w-1/3 text-end font-jamsilRegular text-gray-700">
                  비밀번호
                </label>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: '비밀번호를 입력해주세요.',
                    validate: validatePassword,
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      className="w-full rounded border px-3 py-2 text-black"
                      placeholder="비밀번호를 입력해주세요."
                    />
                  )}
                />
              </div>
              <div className="flex flex-row">
                <div className="w-1/3"></div>
                <div className="w-full">
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 비밀번호 재확인 */}
            <div className="mb-4">
              <div className="flex flex-row items-center">
                <label className="mr-2 w-1/3 text-end font-jamsilRegular text-gray-700">
                  비밀번호 확인
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: '비밀번호를 다시 입력해주세요.',
                    validate: (value) =>
                      value === password || '비밀번호가 일치하지 않습니다.',
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      className="w-full rounded border px-3 py-2 text-black"
                      placeholder="비밀번호를 다시 입력해주세요."
                    />
                  )}
                />
              </div>
              <div className="flex flex-row">
                <div className="w-1/3"></div>
                <div className="w-full">
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center font-jamsilRegular">
              <button
                type="submit"
                className={`my-6 w-full rounded p-3 text-white ${
                  isButtonEnabled
                    ? 'bg-pal-purple'
                    : 'cursor-not-allowed bg-pal-disable'
                }`}
                disabled={!isButtonEnabled}
              >
                {resetPasswordMutation.isPending
                  ? '처리 중...'
                  : '비밀번호 변경'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ContentsLayout>
  );
};

export default ResetPasswordModal;
