import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

const SignupModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
  } = useForm({ mode: 'onChange' });

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) || '이메일의 형식이 올바르지 않습니다.';
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
    if (!data.termsOfUseAccepted) {
      setError('termsOfUseAccepted', {
        type: 'manual',
        message: '이용약관에 동의하셔야 합니다.',
      });
      return;
    }

    if (!data.privacyPolicyAccepted) {
      setError('privacyPolicyAccepted', {
        type: 'manual',
        message: '개인정보 수집 및 이용동의에 동의하셔야 합니다.',
      });
      return;
    }

    console.log(data);
    navigate('/signin');
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate(location.state?.from || '/');
    }
  };

  const password = watch('password', '');

  React.useEffect(() => {
    setError('termsOfUseAccepted', {
      type: 'manual',
      message: '이용약관에 동의하셔야 합니다.',
    });
    setError('privacyPolicyAccepted', {
      type: 'manual',
      message: '개인정보 수집 및 이용동의에 동의하셔야 합니다.',
    });
  }, [setError]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="w-1/2 rounded bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-pal-purple">
          회원가입
        </h2>
        <h4 className="mb-4 text-start text-xl font-bold text-black">
          기본정보
        </h4>
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
            <label className="block font-semibold text-gray-700">닉네임</label>
            <Controller
              name="nickname"
              control={control}
              defaultValue=""
              rules={{ required: '닉네임을 입력해주세요.' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full rounded border px-3 py-2 text-black"
                  placeholder="닉네임을 입력해주세요."
                />
              )}
            />
            {errors.nickname && (
              <p className="text-red-500">{errors.nickname.message}</p>
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
          <div className="flex items-center">
            <Controller
              name="termsOfUseAccepted"
              control={control}
              defaultValue={false}
              rules={{ required: '이용약관에 동의하셔야 합니다.' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="checkbox"
                  className="mr-2"
                />
              )}
            />
            <span>이용약관 동의 (필수)</span>
            <button
              type="button"
              className="ml-2 text-pal-purple underline"
              onClick={() => alert('이용약관 내용')}
            >
              보기
            </button>
          </div>
          {errors.termsOfUseAccepted && (
            <p className="text-red-500">{errors.termsOfUseAccepted.message}</p>
          )}
          <div className="mt-4 flex items-center">
            <Controller
              name="privacyPolicyAccepted"
              control={control}
              defaultValue={false}
              rules={{
                required: '개인정보 수집 및 이용동의에 동의하셔야 합니다.',
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="checkbox"
                  className="mr-2"
                />
              )}
            />
            <span>개인정보 수집 및 이용동의 (필수)</span>
            <button
              type="button"
              className="ml-2 text-pal-purple underline"
              onClick={() => alert('개인정보 수집 및 이용동의 내용')}
            >
              보기
            </button>
          </div>
          {errors.privacyPolicyAccepted && (
            <p className="text-red-500">
              {errors.privacyPolicyAccepted.message}
            </p>
          )}
          <div className="flex justify-center gap-20">
            <button
              type="submit"
              className="my-4 rounded bg-pal-purple px-4 py-2 text-white"
            >
              회원가입
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          이미 회원이신가요?{' '}
          <button
            type="button"
            className="text-pal-purple underline"
            onClick={() => navigate('/signin')}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
