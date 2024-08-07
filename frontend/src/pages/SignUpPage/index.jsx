import React, { useState, useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { instance } from '@/utils/axios';
import ContentsLayout from '@layout/ContentsLayout';

const SignupProcess = () => {
  const navigate = useNavigate();
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [emailMessageType, setEmailMessageType] = useState('');
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [nicknameMessageType, setNicknameMessageType] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [timer, setTimer] = useState(0);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    let timerInterval;
    if (verificationCodeSent && !isEmailVerified) {
      setTimer(600);
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerInterval);
            setVerificationCodeSent(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [verificationCodeSent, isEmailVerified, setError]);

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) || '이메일의 형식이 올바르지 않습니다.';
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,16}$/;
    return (
      passwordPattern.test(password) ||
      '9자 이상 16자 이하, 한 개 이상의 숫자/영어/특수문자를 포함해야 합니다.'
    );
  };

  // 폼 제출 시
  const onSubmit = async (data) => {
    const isFormValid = validateForm(data);
    if (!isFormValid) return;

    // 데이터 변환
    const transformedData = {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      acceptedTerms: data.termsOfUseAccepted && data.privacyPolicyAccepted,
    };

    console.log('변환 전 데이터:', data);
    console.log('전송할 데이터:', transformedData);

    try {
      const response = await registerUser(transformedData);

      if (response.statusCode === 201) {
        setSuccessMessage('회원가입에 성공했습니다!');
        setShowSuccessModal(true);
      } else {
        throw new Error('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('Registration Failed', error);
      setError('submit', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  // 폼 작성이 정상적인지 확인 , 지금 setError가 의미 없음
  const validateForm = (data) => {
    let isValid = true;
    if (!data.termsOfUseAccepted || !data.privacyPolicyAccepted) {
      isValid = false;
    }

    if (!isEmailChecked || !isEmailVerified) {
      setError('email', {
        type: 'manual',
        message: '이메일 인증을 완료해주세요.',
      });
      isValid = false;
    }

    if (!isNicknameChecked) {
      setError('nickname', {
        type: 'manual',
        message: '닉네임 중복 검사를 완료해주세요.',
      });
      isValid = false;
    }

    return isValid;
  };

  const registerUser = async (data) => {
    try {
      console.log('유저 등록', data);

      const response = await instance.post('/api/users', data);

      if (response.status !== 201) {
        throw new Error('회원가입에 실패했습니다.');
      }
      return response.data;
    } catch (error) {
      throw new Error('회원가입에 실패했습니다.');
    }
  };

  const checkEmailDuplicate = async (email) => {
    if (!email) {
      setError('email', {
        type: 'manual',
        message: '이메일을 입력해주세요.',
      });
      setEmailMessage('');
      setEmailMessageType('');
      return;
    }

    try {
      const response = await instance.get(`/api/users/check-email/${email}`);

      if (response.status === 200) {
        setEmailMessage('사용 가능한 닉네임입니다.');
        setEmailMessageType('success');
        setIsEmailChecked(true);
        setVerificationCodeSent(false);
      } else {
        setEmailMessage('이미 사용 중인 이메일입니다.');
        setEmailMessageType('error');
        setIsEmailChecked(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setEmailMessage('이미 사용 중인 이메일입니다.');
        setEmailMessageType('error');
        setIsEmailChecked(false);
      } else {
        setEmailMessage('이메일 확인에 실패했습니다.');
        setEmailMessageType('error');
      }
    }
  };

  const sendVerificationCode = async (email) => {
    try {
      const response = await instance.post('/api/email/code', {
        type: 'signup',
        email,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message || '이메일 전송에 실패했습니다.');
      }

      setVerificationCodeSent(true);
      alert('인증코드가 이메일로 전송되었습니다.');
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const verifyEmailCode = async (email, code) => {
    try {
      const response = await instance.post('/api/email/verify', {
        email: email,
        verifyCode: code,
      });

      if (response.status === 200) {
        setIsEmailVerified(true);
        clearErrors('emailVerification');
        alert('이메일 인증에 성공했습니다.');
      } else {
        throw new Error('인증코드가 올바르지 않습니다.');
      }
    } catch (error) {
      setError('emailVerification', {
        type: 'manual',
        message: '인증코드가 올바르지 않습니다.',
      });
    }
  };

  const checkNicknameDuplicate = async (nickname) => {
    if (!nickname) {
      setError('nickname', {
        type: 'manual',
        message: '닉네임을 입력해주세요.',
      });
      setNicknameMessage('');
      setNicknameMessageType('');
      return;
    }

    try {
      const response = await instance.get(
        `/api/users/check-nickname/${nickname}`,
      );

      if (response.status === 200) {
        setNicknameMessage('사용 가능한 닉네임입니다.');
        setNicknameMessageType('success');
        setIsNicknameChecked(true);
      } else {
        setNicknameMessage('이미 사용 중인 닉네임입니다.');
        setNicknameMessageType('error');
        setIsNicknameChecked(false);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === '이미 존재하는 닉네임입니다.'
      ) {
        setNicknameMessage('이미 사용 중인 닉네임입니다.');
        setNicknameMessageType('error');
        setIsNicknameChecked(false);
      } else {
        setNicknameMessage('닉네임 확인에 실패했습니다.');
        setNicknameMessageType('error');
      }
    }
  };

  const email = watch('email', '');
  const verificationCode = watch('verificationCode', '');
  const nickname = watch('nickname', '');
  const password = watch('password', '');

  const termsOfUseAccepted = useWatch({ control, name: 'termsOfUseAccepted' });
  const privacyPolicyAccepted = useWatch({
    control,
    name: 'privacyPolicyAccepted',
  });

  const isEmailValid = validateEmail(email) === true;
  const isPasswordValid = validatePassword(password) === true;

  useEffect(() => {
    setEmailMessage('');
    setIsEmailChecked(false);
    setIsEmailVerified(false);
  }, [email]);

  useEffect(() => {
    setIsNicknameChecked(false);
    setNicknameMessage('');
  }, [nickname]);

  useEffect(() => {
    if (!termsOfUseAccepted) {
      setError('termsOfUseAccepted', {
        type: 'manual',
        message: '이용약관에 동의하셔야 합니다.',
      });
    } else {
      clearErrors('termsOfUseAccepted');
    }

    if (!privacyPolicyAccepted) {
      setError('privacyPolicyAccepted', {
        type: 'manual',
        message: '개인정보 수집 및 이용동의에 동의하셔야 합니다.',
      });
    } else {
      clearErrors('privacyPolicyAccepted');
    }
  }, [termsOfUseAccepted, privacyPolicyAccepted, setError, clearErrors]);

  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isEmailChecked &&
    isEmailVerified &&
    isNicknameChecked &&
    watch('termsOfUseAccepted') &&
    watch('privacyPolicyAccepted');

  return (
    <ContentsLayout>
      <div className="flex items-center justify-center">
        <div className="w-[700px] overflow-y-auto rounded bg-white bg-opacity-60 p-6">
          <h2 className="mb-4 text-center text-2xl font-bold text-pal-purple">
            회원가입
          </h2>
          {/* <h4 className="mb-5 ml-5 text-start text-xl font-bold text-black">
            기본정보
          </h4> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 이메일 입력 */}
            <div className="mb-4">
              <div className="flex items-center text-center">
                <label className="w-1/4 px-4 text-right font-semibold text-gray-700">
                  이메일
                </label>
                <div className="flex w-3/4 justify-between">
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
                        className={`w-full rounded border px-3 py-2 text-black ${isEmailChecked ? 'bg-gray-200' : ''}`}
                        placeholder="이메일을 입력해주세요."
                        readOnly={isEmailChecked && isEmailVerified}
                      />
                    )}
                  />
                  {!isEmailChecked && (
                    <button
                      type="button"
                      className={`ml-2 w-1/4 rounded bg-pal-purple px-4 py-2 text-white`}
                      onClick={() => checkEmailDuplicate(email)}
                      disabled={isEmailChecked}
                    >
                      중복 확인
                    </button>
                  )}

                  {isEmailChecked && !verificationCodeSent && (
                    <button
                      type="button"
                      className="ml-2 w-1/4 rounded bg-pal-purple px-4 py-2 text-white"
                      onClick={() => sendVerificationCode(email)}
                    >
                      메일 전송
                    </button>
                  )}
                </div>
              </div>
              <div className="flex max-h-[12px] min-h-[12px]">
                <div className="w-1/4"></div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
                {emailMessage && !errors.email && (
                  <p
                    className={`text-sm ${emailMessageType === 'success' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {emailMessage}
                  </p>
                )}
              </div>
              {verificationCodeSent && !isEmailVerified && (
                <div className="mt-4 flex items-center text-center">
                  <div className="w-1/4 px-4 text-right text-gray-700">
                    {timer > 0 && (
                      <p>
                        {' '}
                        {`남은 시간: ${Math.floor(timer / 60)}분 ${timer % 60}초`}{' '}
                      </p>
                    )}
                  </div>
                  <div className="flex w-3/4">
                    <Controller
                      name="verificationCode"
                      control={control}
                      defaultValue=""
                      rules={{ required: '인증코드를 입력해주세요.' }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full rounded border px-3 py-2 text-black"
                          placeholder="인증코드 입력"
                        />
                      )}
                    />
                    <button
                      type="button"
                      className="ml-2 w-1/4 rounded bg-pal-purple px-4 py-2 text-white"
                      onClick={() => verifyEmailCode(email, verificationCode)}
                    >
                      인증 확인
                    </button>
                  </div>
                </div>
              )}
              <div className="flex max-h-[12px] min-h-[12px]">
                <div className="w-1/4"></div>
                {errors.emailVerification && (
                  <p className="text-sm text-red-500">
                    {errors.emailVerification.message}
                  </p>
                )}
              </div>
            </div>

            {/* 닉네임 입력 */}
            <div className="mb-4">
              <div className="flex items-center text-center">
                <label className="w-1/4 px-4 text-right font-semibold text-gray-700">
                  닉네임
                </label>
                <div className="flex w-3/4 justify-between">
                  <Controller
                    name="nickname"
                    control={control}
                    defaultValue=""
                    rules={{ required: '닉네임을 입력해주세요.' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="nickname"
                        className="w-full rounded border px-3 py-2 text-black"
                        placeholder="닉네임을 입력해주세요."
                        autoComplete="off"
                      />
                    )}
                  />
                  <button
                    type="button"
                    className="ml-2 w-1/4 rounded bg-pal-purple px-4 py-2 text-white"
                    onClick={() => checkNicknameDuplicate(nickname)}
                  >
                    중복 확인
                  </button>
                </div>
              </div>
              <div className="flex max-h-[12px] min-h-[12px]">
                <div className="w-1/4"></div>
                {nicknameMessage && (
                  <p
                    className={`text-sm ${nicknameMessageType === 'success' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {nicknameMessage}
                  </p>
                )}
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div className="mt-5 flex items-center text-center">
              <label className="w-1/4 px-4 text-right font-semibold text-gray-700">
                비밀번호
              </label>
              <div className="w-3/4">
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
            <div className="flex max-h-[12px] min-h-[12px]">
              <div className="w-1/4"></div>
              {errors.password && (
                <p className="text-start text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div className="mt-5 flex items-center text-center">
              <label className="w-1/4 px-4 text-right font-semibold text-gray-700">
                비밀번호 확인
              </label>
              <div className="w-3/4">
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
            </div>
            <div className="flex max-h-[12px] min-h-[12px]">
              <div className="w-1/4"></div>
              {errors.confirmPassword && (
                <p className="text-start text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            {/* 이용약관 동의 */}
            <div className="ml-5 mt-8 flex items-center">
              <label className="flex items-center">
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
              </label>
              <button
                type="button"
                className="ml-2 text-pal-purple underline"
                onClick={() => alert('이용약관 내용')}
              >
                보기
              </button>
            </div>
            <div className="max-h-[15px] min-h-[15px]">
              {errors.termsOfUseAccepted && (
                <p className="ml-5 text-sm text-red-500">
                  {errors.termsOfUseAccepted.message}
                </p>
              )}
            </div>
            <div className="ml-5 mt-2 flex items-center">
              <label className="flex items-center">
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
              </label>
              <button
                type="button"
                className="ml-2 text-pal-purple underline"
                onClick={() => alert('개인정보 수집 및 이용동의 내용')}
              >
                보기
              </button>
            </div>
            <div className="max-h-[15px] min-h-[15px]">
              {errors.privacyPolicyAccepted && (
                <p className="ml-5 text-sm text-red-500">
                  {errors.privacyPolicyAccepted.message}
                </p>
              )}
            </div>
            {/* 회원가입 버튼 */}
            <div className="flex justify-center gap-20">
              <button
                type="submit"
                className={`my-6 w-full rounded p-2 text-white ${
                  isFormValid
                    ? 'bg-pal-purple'
                    : 'cursor-not-allowed bg-gray-400'
                }`}
                disabled={!isFormValid}
              >
                회원가입
              </button>
            </div>
          </form>
          {/*회원 여부 확인 */}
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
          {/* 성공 모달  */}
          {showSuccessModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="rounded bg-white p-6">
                <h3 className="mb-4 text-xl font-bold">{successMessage}</h3>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/signin');
                  }}
                  className="mt-4 justify-center rounded bg-pal-purple px-4 py-2 text-white"
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ContentsLayout>
  );
};

export default SignupProcess;
