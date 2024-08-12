import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '@/utils/axios';
import logo from '@assets/images/logo/logo.svg';
import ContentsLayout from '@layout/ContentsLayout';

const SigninProcess = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loginError, setLoginError] = useState('');
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
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

  const loginUser = async (payload) => {
    try {
      const res = await instance.post('/api/login', payload);
      const accessToken = res.headers['access'];

      if (accessToken) {
        sessionStorage.setItem('access', accessToken);
      }
      return res.data.result;
    } catch (error) {
      console.error('logintester 실패', error);
      throw error;
    }
  };

  const { mutate: signMutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      queryClient.setQueryData(['userInfo'], data);
      navigate('/', { replace: true });
    },
    onError: () => {
      reset({ email: '', password: '' });
      setLoginError('아이디 또는 비밀번호가 잘못 입력되었습니다.');
    },
  });

  const onSubmit = (data) => {
    setLoginError('');
    signMutate(data);
  };

  const email = watch('email', '');
  const password = watch('password', '');

  const isEmailValid = validateEmail(email) === true;
  const isPasswordValid = validatePassword(password) === true;

  return (
    <ContentsLayout>
      <div className="flex justify-center">
        <div className="w-[500px] rounded bg-white bg-opacity-60 p-6 px-10 max-[500px]:w-[300px]">
          <div className="mb-5 flex justify-center">
            <img
              src={logo}
              alt="logo_image"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {loginError && (
              <div className="mb-4 text-center font-jamsilRegular text-lg text-red-500">
                {loginError}
              </div>
            )}
            <div className="flex flex-col items-center text-center font-jamsilLight sm:flex-row">
              <label className="w-full pl-2 pr-4 text-start font-jamsilRegular text-gray-700 sm:w-1/4 sm:text-right">
                이메일
              </label>
              <div className="w-full sm:w-3/4">
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
              </div>
            </div>
            <div className="flex h-[12px]">
              <div className="w-1/4"></div>
              {errors.email && (
                <p className="w-3/4 text-start text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-5 flex flex-col items-center text-center sm:flex-row">
              <label className="w-full pl-2 pr-4 text-start font-jamsilRegular text-gray-700 sm:w-1/4 sm:text-right">
                비밀번호
              </label>
              <div className="w-full sm:w-3/4">
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
            </div>
            <div className="flex h-[20px]">
              <div className="w-1/4"></div>
              {errors.password && (
                <p className="w-3/4 text-start text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-center gap-20">
              <button
                type="submit"
                className={`my-6 w-full rounded p-2 font-jamsilLight text-white ${
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
          <div className="mt-4 text-center font-jamsilLight text-sm">
            <div>비밀번호를 잊어버리셨나요? </div>
            <button
              type="button"
              className="text-pal-purple underline"
              onClick={() => navigate('/find')}
            >
              여기를 클릭하세요.
            </button>
          </div>
          <div className="mt-4 text-center font-jamsilLight text-sm">
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
    </ContentsLayout>
  );
};

export default SigninProcess;
