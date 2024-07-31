import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { instance } from '@/utils/axios';

const SignupModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
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
  } = useForm({ mode: 'onChange' });

  // 이메일 인증 타이머
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
      if (response) {
        setSuccessMessage('회원가입에 성공했습니다!');
        setShowSuccessModal(true);
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
    console.log('유저 등록', data);
    const response = await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error('회원가입에 실패했습니다.');
    }

    console.log('회원가입 완료');
    return await response.json();
  };

  // const handleBackgroundClick = (e) => {
  //   if (e.target === e.currentTarget) {
  //     navigate(location.state?.from || '/');
  //   }
  // };

  const checkEmailDuplicate = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/check-email/${email}`,
        {
          method: 'GET',
        },
      );

      const responseData = await response.json();

      if (
        //response body에서 이렇게 읽어옴
        response.status === 400 &&
        responseData.message === '이미 가입한 회원입니다.'
      ) {
        setError('email', {
          type: 'manual',
          message: '이미 사용 중인 이메일입니다.',
        });
        setIsEmailChecked(false);
      } else {
        setError('email', {
          type: 'manual',
          message: '사용 가능한 이메일입니다.',
        });
        setIsEmailChecked(true);
      }
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: '이메일 확인에 실패했습니다.',
      });
    }
  };

  const sendVerificationCode = async (email) => {
    try {
      const response = await fetch('http://localhost:8080/api/email/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'signup', email }),
      });
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || '이메일 전송에 실패했습니다.');
      }

      setVerificationCodeSent(true);
      alert('인증코드가 이메일로 전송되었습니다.');
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  const verifyEmailCode = async (email, code) => {
    try {
      const response = await fetch('http://localhost:8080/api/email/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verifyCode: code }),
      });

      if (response.ok) {
        setIsEmailVerified(true);
        alert('이메일 인증에 성공했습니다.');
      } else {
        const responseData = await response.json();
        throw new Error(
          responseData.message || '인증코드가 올바르지 않습니다.',
        );
      }
    } catch (error) {
      setError('emailVerification', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  // 닉네임 중복 확인
  const checkNicknameDuplicate = async (nickname) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/check-nickname/${nickname}`,
        {
          method: 'GET',
        },
      );

      const responseData = await response.json();

      if (
        response.status === 400 &&
        responseData.message === '이미 존재하는 닉네임입니다.'
      ) {
        setError('nickname', {
          type: 'manual',
          message: '이미 사용 중인 닉네임입니다.',
        });
        setIsNicknameChecked(false);
      } else {
        setError('nickname', {
          type: 'manual',
          message: '사용 가능한 닉네임입니다.',
        });
        setIsNicknameChecked(true);
      }
    } catch (error) {
      setError('nickname', {
        type: 'manual',
        message: '닉네임 확인에 실패했습니다.',
      });
    }
  };
  // const checkNicknameDuplicate = async (nickname) => {
  //   try {
  //     const response = await instance.get(
  //       `/api/users/check-nickname/${nickname}`,
  //     );

  //     console.log('API 응답:', response.status);
  //     console.log(response.data);
  //     console.log(response.data.message);

  //     // API 응답 구조에 따라 조건을 확인
  //     if (response.status === 200) {
  //       setError('nickname', {
  //         type: 'manual',
  //         message: '사용 가능한 닉네임입니다.',
  //       });
  //       setIsNicknameChecked(true);
  //     } else if (response.statusCode === 400) {
  //       setError('nickname', {
  //         type: 'manual',
  //         message: '이미 사용 중인 닉네임입니다.',
  //       });
  //       setIsNicknameChecked(false);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       if (error.response.status === 400) {
  //         console.log(error.response.status);
  //         setError('nickname', {
  //           type: 'manual',
  //           message: '이미 사용 중인 닉네임입니다.',
  //         });
  //         setIsNicknameChecked(false);
  //       } else {
  //         console.error('닉네임 중복 확인 에러:', error.response.status);
  //         setError('nickname', {
  //           type: 'manual',
  //           message: '닉네임 확인에 실패했습니다.',
  //         });
  //       }
  //     } else {
  //       console.error('닉네임 중복 확인 에러:', error);
  //       setError('nickname', {
  //         type: 'manual',
  //         message: '서버와의 통신에 실패했습니다.',
  //       });
  //     }
  //   }
  // };

  const email = watch('email', '');
  const verificationCode = watch('verificationCode', '');
  const nickname = watch('nickname', '');
  const password = watch('password', '');

  const isEmailValid = validateEmail(email) === true;
  const isPasswordValid = validatePassword(password) === true;

  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isEmailChecked &&
    isEmailVerified &&
    isNicknameChecked &&
    watch('termsOfUseAccepted') &&
    watch('privacyPolicyAccepted');

  // 이용약관 비동의 시 메시지(현재 버튼 비활성화로 의미 없음)
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
        <h2 className="mb-4 text-center text-2xl font-bold text-pal-purple">
          회원가입
        </h2>
        <h4 className="mb-5 ml-5 text-start text-xl font-bold text-black">
          기본정보
        </h4>
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

                {!verificationCodeSent && (
                  <button
                    type="button"
                    className={`ml-2 w-1/4 rounded bg-pal-purple px-4 py-2 text-white ${isEmailChecked ? 'bg-gray-500' : 'bg-pal-purple'}`}
                    onClick={() => checkEmailDuplicate(email)}
                    disabled={isEmailChecked}
                  >
                    중복 확인
                  </button>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="w-1/4"></div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            {isEmailChecked && !verificationCodeSent && (
              <button
                type="button"
                className="mt-2 w-full rounded bg-pal-purple px-4 py-2 text-white"
                onClick={() => sendVerificationCode(email)}
              >
                이메일 전송
              </button>
            )}
            {verificationCodeSent && !isEmailVerified && (
              <div className="mt-4 flex items-center">
                <Controller
                  name="verificationCode"
                  control={control}
                  defaultValue=""
                  rules={{ required: '인증코드를 입력해주세요.' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-1/4 rounded border px-3 py-2 text-black"
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
                {timer > 0 && (
                  <p className="ml-4 w-1/4 text-gray-700">
                    {`남은 시간: ${Math.floor(timer / 60)}분 ${timer % 60}초`}
                  </p>
                )}

                {errors.emailVerification && (
                  <p className="text-red-500">
                    {errors.emailVerification.message}
                  </p>
                )}
              </div>
            )}
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
            <div className="flex">
              <div className="w-1/4"></div>
              {errors.nickname && (
                <p className="text-red-500">{errors.nickname.message}</p>
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
          <div className="flex">
            <div className="w-1/4"></div>
            {errors.password && (
              <p className="text-start text-red-500">
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
          <div className="flex">
            <div className="w-1/4"></div>
            {errors.confirmPassword && (
              <p className="text-start text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {/* 이용약관 동의 */}
          <div className="ml-5 mt-10 flex items-center">
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
          {errors.termsOfUseAccepted && (
            <p className="ml-5 text-red-500">
              {errors.termsOfUseAccepted.message}
            </p>
          )}
          <div className="ml-5 mt-4 flex items-center">
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
          {errors.privacyPolicyAccepted && (
            <p className="ml-5 text-red-500">
              {errors.privacyPolicyAccepted.message}
            </p>
          )}
          {/* 회원가입 버튼 */}
          <div className="flex justify-center gap-20">
            <button
              type="submit"
              className={`my-6 w-full rounded p-2 text-white ${
                isFormValid ? 'bg-pal-purple' : 'cursor-not-allowed bg-gray-400'
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
                className="mt-4 rounded bg-pal-purple px-4 py-2 text-white"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupModal;

/*
이메일 입력하기  - 중복 확인
(중복이 아닌 경우) -> 이메일 보내기 -> 10분 안에 인증
인증 완료시: 이메일 수정 불가, 중복 확인 버튼 사라짐

닉네임 중복 확인 

비밀번호 유효성 확인
비밀번호 일치/불일치 확인

이용약관 2개 동의

-> 모든 조건 만족 시 회원가입 버튼 활성화 , 성공 모달 출력, 로그인 화면으로 이동
*/
