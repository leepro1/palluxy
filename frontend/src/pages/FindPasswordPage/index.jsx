import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import logo from '@assets/images/logo/logo.svg';
import { instance } from '@/utils/axios';
import ContentsLayout from '@layout/ContentsLayout';

const FindPasswordModal = () => {
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

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
      setIsEmailSent(true);
    },
    onError: () => {
      setError('email', {
        type: 'manual',
        message: '이메일 전송에 실패하였습니다.',
      });
    },
  });

  const checkEmailDuplicate = async (email) => {
    if (!email) {
      setError('email', {
        type: 'manual',
        message: '이메일을 입력해주세요.',
      });
      return false;
    }

    try {
      const response = await instance.get(`/api/users/check-email/${email}`);

      if (response.status === 200) {
        setError('email', {
          type: 'manual',
          message: '회원가입한 이메일이 존재하지 않습니다.',
        });
        setIsEmailChecked(false);
        return false;
      } else {
        setIsEmailChecked(true);
        return true;
      }
    } catch (error) {
      if (error.response.status === 400) {
        setIsEmailChecked(true);
        return true;
      }
      setError('email', {
        type: 'manual',
        message: '이메일 중복 검사에 실패했습니다.',
      });
      setIsEmailChecked(false);
      return false;
    }
  };

  const handleFindPassword = async (data) => {
    const isRegistered = await checkEmailDuplicate(data.email);
    if (isRegistered) {
      mutation.mutate(data.email);
    }
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
        <div className="w-[350px] rounded bg-white bg-opacity-60 p-6 sm:w-[700px]">
          <div className="mb-6 flex justify-center">
            <img
              src={logo}
              alt="logo_image"
            />
          </div>
          <h4
            className={`mb-6 text-center font-jamsilRegular ${isEmailSent ? 'text-pal-purple' : 'text-black'}`}
          >
            {isEmailSent ? (
              <>
                성공적으로 이메일을 발송했습니다.
                <br />
                전송되기까지 시간이 소요될 수 있으니 기다려주세요!
              </>
            ) : (
              '회원가입한 이메일 주소를 입력해주세요.'
            )}
          </h4>
          <form onSubmit={handleSubmit(handleFindPassword)}>
            <div className="mb-4">
              <div className="flex flex-col items-center sm:flex-row">
                <label className="w-full pl-2 pr-4 text-start font-jamsilRegular text-gray-700 sm:w-1/4 sm:text-right">
                  이메일
                </label>
                <div className="w-full sm:w-3/4">
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
              </div>
              <div className="flex flex-row">
                <div className="w-1/4"></div>
                <div className="w-full sm:w-3/4">
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 비밀번호 찾기 버튼 */}
            <div className="flex justify-center font-jamsilRegular">
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
