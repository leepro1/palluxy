import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo/logo.svg';

const ResetPasswordModal = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError('이메일의 형태를 갖추어야 합니다.');
    } else {
      setEmailError('');
    }
  }, [email]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log({
      email,
    });
    setSuccessMessage(
      '성공적으로 이메일을 발송했습니다.\n 전송되기까지 시간이 소요될 수 있으니 기다려주세요!',
    );
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
        <div className="mb-4 flex justify-center">
          <img
            src={logo}
            alt="logo_image"
          />
        </div>
        <h4 className="mb-4 text-center font-bold text-black">
          비밀번호를 찾고자 하는 계정의 이메일을 입력해주세요.
        </h4>
        {successMessage && (
          <p className="mt-4 whitespace-pre-wrap text-center text-green-500">
            {successMessage}
          </p>
        )}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">이메일*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border px-3 py-2 text-black"
              placeholder="이메일을 입력해주세요."
              required
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="flex justify-center gap-20">
            <button
              type="submit"
              className="rounded bg-pal-purple px-4 py-2 text-white"
            >
              비밀번호 찾기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
