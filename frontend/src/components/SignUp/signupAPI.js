import { instance } from '@/utils/axios';

export const checkEmailDuplicate = (email) =>
  instance.get(`/api/users/check-email/${email}`);

export const sendVerificationCode = (email) =>
  instance.post('/api/email/code', { type: 'signup', email });

export const verifyEmailCode = (email, code) =>
  instance.post('/api/email/verify', { email, verifyCode: code });

export const checkNicknameDuplicate = (nickname) =>
  instance.get(`/api/users/check-nickname/${nickname}`);

export const registerUser = (data) => instance.post('/api/users', data);
