// src/contexts/ProfileEdit/ProfileEditContext.tsx
import React, {createContext, useContext, useState} from 'react';

interface ProfileEditContextType {
  profileImage: any;
  nickname: string;
  emailIcon: any;
  isNicknameFocused: boolean;
  isModalVisible: boolean;
  completeModalVisible: boolean;
  modalMessage: string;
  setProfileImage: (image: any) => void;
  setNickname: (name: string) => void;
  handleNicknameChange: () => void;
  handleNicknameFocus: () => void;
  handleNicknameBlur: () => void;
  openGallery: () => void;
  showActionSheet: () => void;
  handleClearNickname: () => void;
}

const MypageProfileEditContext = createContext<
  ProfileEditContextType | undefined
>(undefined);

export function MypageProfileEditProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profileImage, setProfileImage] = useState<any>(null);
  const [nickname, setNickname] = useState('');
  const [emailIcon, setEmailIcon] = useState<any>(null);
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Business Logic
  const handleNicknameChange = async () => {
    // Your existing nickname change logic
  };

  const handleNicknameFocus = () => setIsNicknameFocused(true);
  const handleNicknameBlur = () => setIsNicknameFocused(false);

  const openGallery = async () => {
    // Your existing gallery logic
  };

  const showActionSheet = () => {
    // Your existing action sheet logic
  };

  const handleClearNickname = () => {
    setNickname('');
  };

  const value = {
    profileImage,
    nickname,
    emailIcon,
    isNicknameFocused,
    isModalVisible,
    completeModalVisible,
    modalMessage,
    setProfileImage,
    setNickname,
    handleNicknameChange,
    handleNicknameFocus,
    handleNicknameBlur,
    openGallery,
    showActionSheet,
    handleClearNickname,
  };

  return (
    <MypageProfileEditContext.Provider value={value}>
      {children}
    </MypageProfileEditContext.Provider>
  );
}

export const useProfileEdit = () => {
  const context = useContext(MypageProfileEditContext);
  if (context === undefined) {
    throw new Error('useProfileEdit must be used within a ProfileEditProvider');
  }
  return context;
};
