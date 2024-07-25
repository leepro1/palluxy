import create from 'zustand';

const useSignupStore = create((set) => ({
  isEmailChecked: false,
  isNicknameChecked: false,
  isEmailVerified: false,
  verificationCodeSent: false,
  successMessage: '',
  showSuccessModal: false,

  setIsEmailChecked: (value) => set({ isEmailChecked: value }),
  setIsNicknameChecked: (value) => set({ isNicknameChecked: value }),
  setIsEmailVerified: (value) => set({ isEmailVerified: value }),
  setVerificationCodeSent: (value) => set({ verificationCodeSent: value }),
  setSuccessMessage: (message) => set({ successMessage: message }),
  setShowSuccessModal: (value) => set({ showSuccessModal: value }),
}));

export default useSignupStore;
