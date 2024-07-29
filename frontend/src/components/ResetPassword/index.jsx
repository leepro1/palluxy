import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import logo from '../../assets/images/logo/logo.svg';

const ResetPasswordModal = () => {
  const navigate = useNavigate();

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

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate('/');
    }
  };

  const password = watch('password', '');

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
            <label className="block font-semibold text-gray-700">
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
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
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
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="flex justify-center gap-20">
            <button
              type="submit"
              className="my-6 w-full rounded bg-pal-purple p-3 text-white"
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
