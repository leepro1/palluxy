import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupModal = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [isNicknameUnique, setIsNicknameUnique] = useState(true);
  const [termsOfUseAccepted, setTermsOfUseAccepted] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [termsOfUseError, setTermsOfUseError] =
    useState('이용약관에 동의하셔야 합니다.');
  const [privacyPolicyError, setPrivacyPolicyError] = useState(
    '개인정보 수집 및 이용동의에 동의하셔야 합니다.',
  );
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError('이메일의 형식이 올바르지 않습니다.');
    } else {
      setEmailError('');
    }
  }, [email]);

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,16}$/;
    return passwordPattern.test(password);
  };

  useEffect(() => {
    if (password && !validatePassword(password)) {
      setPasswordError('비밀번호 형식이 올바르지 않습니다.');
    } else {
      setPasswordError('');
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  }, [password, confirmPassword]);

  const checkEmailUnique = async () => {
    // 이메일 중복 확인 로직-(항상 true)
    setIsEmailUnique(true);
    if (!isEmailUnique) {
      setEmailError('이미 사용 중인 이메일입니다.');
    }
  };

  const checkNicknameUnique = async () => {
    // 닉네임 중복 확인 로직-(항상 true)
    setIsNicknameUnique(true);
    if (!isNicknameUnique) {
      setNicknameError('이미 사용 중인 닉네임입니다.');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!termsOfUseAccepted) {
      setTermsOfUseError('이용약관에 동의하셔야 합니다.');
      hasError = true;
    } else {
      setTermsOfUseError('');
    }

    if (!privacyPolicyAccepted) {
      setPrivacyPolicyError('개인정보 수집 및 이용동의에 동의하셔야 합니다.');
      hasError = true;
    } else {
      setPrivacyPolicyError('');
    }

    if (hasError) return;

    console.log({
      email,
      nickname,
      password,
    });
    navigate('/');
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate('/');
    }
  };

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
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">이메일</label>
            <div className="flex justify-between">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-3/4 rounded border px-3 py-2 text-black"
                placeholder="이메일을 입력해주세요."
                required
              />
              <button
                type="button"
                className="ml-2 rounded bg-pal-purple px-4 py-2 text-white"
                onClick={checkEmailUnique}
              >
                중복 확인
              </button>
            </div>
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">닉네임</label>
            <div className="flex justify-between">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-3/4 rounded border px-3 py-2 text-black"
                placeholder="닉네임을 입력해주세요."
                required
              />
              <button
                type="button"
                className="ml-2 rounded bg-pal-purple px-4 py-2 text-white"
                onClick={checkNicknameUnique}
              >
                중복 확인
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border px-3 py-2 text-black"
              placeholder="비밀번호를 입력해주세요."
              required
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded border px-3 py-2 text-black"
              placeholder="비밀번호를 다시 입력해주세요."
              required
            />
            {confirmPasswordError && (
              <p className="text-red-500">{confirmPasswordError}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={termsOfUseAccepted}
              onChange={(e) => {
                setTermsOfUseAccepted(e.target.checked);
                if (e.target.checked) {
                  setTermsOfUseError('');
                } else {
                  setTermsOfUseError('이용약관에 동의하셔야 합니다.');
                }
              }}
              className="mr-2"
              required
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
          {termsOfUseError && <p className="text-red-500">{termsOfUseError}</p>}
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              checked={privacyPolicyAccepted}
              onChange={(e) => {
                setPrivacyPolicyAccepted(e.target.checked);
                if (e.target.checked) {
                  setPrivacyPolicyError('');
                } else {
                  setPrivacyPolicyError(
                    '개인정보 수집 및 이용동의에 동의하셔야 합니다.',
                  );
                }
              }}
              className="mr-2"
              required
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
          {privacyPolicyError && (
            <p className="text-red-500">{privacyPolicyError}</p>
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
