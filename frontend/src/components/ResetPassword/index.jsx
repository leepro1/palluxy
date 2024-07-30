import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { instance } from '@/utils/axios';
import logo from '../../assets/images/logo/logo.svg';

const ResetPasswordModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const code = urlParams.get('code');

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,16}$/;
    return (
      passwordPattern.test(password) ||
      '9자 이상 16자 이하, 한 개 이상의 숫자/영어/특수문자를 포함해야 합니다.'
    );
  };

  const resetPassword = async (payload) => {
    try {
      const response = await instance.patch(
        '/api/users/reset-password',
        payload,
      );
      console.log('resetPassword 내에서 출력', payload);
      return response.data;
    } catch (error) {
      console.error('resetPassword 실패', error);
      throw error;
    }
  };

  const { mutate: confirmResetPassword } = useMutation({
    mutationFn: resetPassword,
    onSuccess: async (data) => {
      console.log('mutate 내에서 출력', data);
    },
  });

  const onSubmit = (data) => {
    console.log('onSubmit 내에서 출력', data);
    try {
      confirmResetPassword({ code: code, password: data.password });
      console.log('urlParams', urlParams.toString());
      console.log('code', code);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate('/');
    }
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
          변경하실 비밀번호를 입력하세요.
        </h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <div className="flex flex-row items-center">
              <label className="w-1/3 font-semibold text-gray-700">
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
              <label className="w-1/3 font-semibold text-gray-700">
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
          <div className="flex justify-center gap-20">
            <button
              type="submit"
              className={`my-6 w-full rounded p-3 text-white ${
                isButtonEnabled
                  ? 'bg-pal-purple'
                  : 'cursor-not-allowed bg-pal-disable'
              }`}
              disabled={!isButtonEnabled}
            >
              비밀번호 변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
