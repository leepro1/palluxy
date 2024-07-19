import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo/logo.svg';

const SigninModal = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) || '이메일의 형태를 갖추어야 합니다.';
  };

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
    navigate('/');
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate('/');
    }
  };

  const email = watch('email', '');
  const password = watch('password', '');

  const isEmailValid = validateEmail(email) === true;
  const isPasswordValid = validatePassword(password) === true;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="w-1/2 rounded bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex justify-center">
          <img
            src={logo}
            alt="logo_image"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">이메일</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: '이메일을 입력해주세요.',
                validate: validateEmail,
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className="w-full rounded border px-3 py-2 text-black"
                  placeholder="이메일을 입력해주세요."
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
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
          <div className="flex justify-center gap-20">
            <button
              type="submit"
              className={`rounded px-4 py-2 text-white ${
                isEmailValid && isPasswordValid
                  ? 'bg-pal-purple'
                  : 'cursor-not-allowed bg-gray-400'
              }`}
              disabled={!isEmailValid || !isPasswordValid}
            >
              로그인
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <div>비밀번호를 잊어버리셨나요? </div>
          <button
            type="button"
            className="text-pal-purple underline"
            onClick={() => navigate('/reset')}
          >
            여기를 클릭하세요.
          </button>
        </div>
        <div className="mt-4 text-center">
          <div>아직 팰럭시의 계정이 없으신가요? </div>
          <button
            type="button"
            className="text-pal-purple underline"
            onClick={() => navigate('/signup')}
          >
            계정 생성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninModal;
