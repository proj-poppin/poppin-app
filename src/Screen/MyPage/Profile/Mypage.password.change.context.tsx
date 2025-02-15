import React, {createContext, useContext, useEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {axiosMypagePasswordCheck} from 'src/Axios/Mypage/mypage.post.axios';
import {axiosMypagePasswordChange} from 'src/Axios/Mypage/mypage.put.axios';

interface PasswordChangeContextType {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  currentPasswordVisible: boolean;
  newPasswordVisible: boolean;
  confirmPasswordVisible: boolean;
  isFailed: boolean;
  step: 'current' | 'new';
  setCurrentPassword: (password: string) => void;
  setNewPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  toggleCurrentPasswordVisible: () => void;
  toggleNewPasswordVisible: () => void;
  toggleConfirmPasswordVisible: () => void;
  handleCurrentPasswordSubmit: () => void;
  handleNewPasswordSubmit: () => void;
  isValidNewPassword: () => boolean;
  passwordConditions: {
    hasLetterAndNumber: boolean;
    hasSpecialChar: boolean;
    hasMinLength: boolean;
  };
  isPasswordMatch: boolean;
  isModalVisible: boolean;
  modalMessage: string;
  handleModalClose: () => void;
}

const MypagePasswordChangeContext = createContext<
  PasswordChangeContextType | undefined
>(undefined);

export function MypagePasswordChangeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [step, setStep] = useState<'current' | 'new'>('current');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPasswordState, setNewPasswordState] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordConditions, setPasswordConditions] = useState({
    hasLetterAndNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const toggleCurrentPasswordVisible = () => {
    setCurrentPasswordVisible(prev => !prev);
  };

  const toggleNewPasswordVisible = () => {
    setNewPasswordVisible(prev => !prev);
  };

  const toggleConfirmPasswordVisible = () => {
    setConfirmPasswordVisible(prev => !prev);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    if (modalMessage.includes('변경되었습니다')) {
      navigation.goBack();
    }
  };

  const handleCurrentPasswordSubmit = async () => {
    const response = await axiosMypagePasswordCheck(currentPassword);
    if (response.data) {
      setStep('new');
    } else {
      setIsFailed(true);
    }
  };

  const handleNewPasswordSubmit = async () => {
    try {
      const response = await axiosMypagePasswordChange({
        password: newPasswordState,
        passwordConfirm: confirmPassword,
      });

      if (response.data) {
        setModalMessage('비밀번호가 성공적으로 변경되었습니다.');
        setIsModalVisible(true);
      } else {
        setIsFailed(true);
        setModalMessage('비밀번호 변경에 실패했습니다.');
        setIsModalVisible(true);
      }
    } catch (error) {
      setModalMessage('오류가 발생했습니다. 다시 시도해주세요.');
      setIsModalVisible(true);
    }
  };

  // 비밀번호 조건 체크 함수
  const checkPasswordConditions = (password: string) => {
    setPasswordConditions({
      hasLetterAndNumber: /(?=.*[A-Za-z])(?=.*\d)/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasMinLength: password.length >= 8,
    });
  };

  const setNewPassword = (password: string) => {
    setNewPasswordState(password);
    checkPasswordConditions(password);
  };

  const isValidNewPassword = (): boolean => {
    return Boolean(
      newPasswordState &&
        confirmPassword &&
        newPasswordState === confirmPassword,
    );
  };

  // 비밀번호 일치 여부 체크
  useEffect(() => {
    setIsPasswordMatch(
      newPasswordState === confirmPassword && newPasswordState !== '',
    );
  }, [newPasswordState, confirmPassword]);

  const value = {
    currentPassword,
    newPassword: newPasswordState, // 내부 상태를 context value로 전달
    confirmPassword,
    currentPasswordVisible,
    newPasswordVisible,
    confirmPasswordVisible,
    step,
    isFailed,
    setIsFailed,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    toggleCurrentPasswordVisible,
    toggleNewPasswordVisible,
    toggleConfirmPasswordVisible,
    handleCurrentPasswordSubmit,
    handleNewPasswordSubmit,
    isValidNewPassword,
    passwordConditions,
    isPasswordMatch,
    isModalVisible,
    modalMessage,
    handleModalClose,
  };

  return (
    <MypagePasswordChangeContext.Provider value={value}>
      {children}
    </MypagePasswordChangeContext.Provider>
  );
}

export const usePasswordChange = () => {
  const context = useContext(MypagePasswordChangeContext);
  if (context === undefined) {
    throw new Error(
      'usePasswordChange must be used within a PasswordChangeProvider',
    );
  }
  return context;
};
