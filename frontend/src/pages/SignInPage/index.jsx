import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '@/utils/axios';
import logo from '../../assets/images/logo/logo.svg';

const SigninModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
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

  // const getCookie = (name) => {
  //   const nameEQ = name + '=';
  //   const ca = document.cookie.split(';');
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
  //     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  //   }
  //   return null;
  // };

  const loginUser = async (payload) => {
    try {
      const res = await instance.post('/login', payload);
      const accessToken = res.headers['access'];

      if (accessToken) {
        sessionStorage.setItem('access', accessToken);
      }
      return res.data.result;
    } catch (error) {
      console.error('logintester 실패', error);
    }
  };

  const { mutate: signMutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      console.log('return mutate data', data);
      queryClient.setQueryData(['userInfo'], data);
      // const cachedData = queryClient.getQueryData(['userInfo']);
      // console.log('Cached userInfo after login:', cachedData);
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    },
  });

  const onSubmit = (data) => {
    try {
      signMutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleBackgroundClick = (e) => {
  //   if (e.target === e.currentTarget) {
  //     navigate('/');
  //   }
  // };

  const email = watch('email', '');
  const password = watch('password', '');

  const isEmailValid = validateEmail(email) === true;
  const isPasswordValid = validatePassword(password) === true;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      // onClick={handleBackgroundClick}
    >
      <div
        className="w-1/2 rounded bg-white bg-opacity-60 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-full border border-black bg-pal-purple p-1"
            onClick={() => navigate(-1)}
          >
            ✖️
          </button>
        </div>
        <div className="mb-10 flex justify-center">
          <img
            src={logo}
            alt="logo_image"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center text-center">
            <label className="w-1/3 px-4 text-right font-semibold text-gray-700">
              이메일
            </label>
            <div className="w-2/3">
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
          <div className="flex">
            <div className="w-1/3"></div>
            {errors.email && (
              <p className="my-2 w-2/3 text-start text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mt-5 flex items-center text-center">
            <label className="w-1/3 px-4 text-right font-semibold text-gray-700">
              비밀번호
            </label>
            <div className="w-2/3">
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
          <div className="flex">
            <div className="w-1/3"></div>
            {errors.password && (
              <p className="my-2 text-start text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-center gap-20">
            <button
              type="submit"
              className={`my-6 w-full rounded p-2 text-white ${
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
            onClick={() => navigate('/find')}
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
