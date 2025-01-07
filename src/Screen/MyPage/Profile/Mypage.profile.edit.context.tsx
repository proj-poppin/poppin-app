import React, {createContext, useContext, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {Platform} from 'react-native';
import {getGalleryImages} from 'src/Util';
import {useUserStore} from 'src/Zustand/User/user.zustand';

interface ProfileEditContextType {
  profileImage: string | null;
  nickname: string;
  socialMediaType: string;
  isModalVisible: boolean;
  isImagePickerModalVisible: boolean;
  modalMessage: string;
  setProfileImage: (image: string | null) => void;
  setNickname: (name: string) => void;
  openGallery: () => Promise<void>;
  handleModalClose: () => void;
  handleImagePickerModalClose: () => void;
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
  const user = useUserStore(state => state.user);
  const [profileImage, setProfileImage] = useState<string | null>(
    user.userImageUrl,
  );
  const [nickname, setNickname] = useState(user.nickname);
  const [socialMediaType, serSocialMediaType] = useState(user.accountType);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImagePickerModalVisible, setIsImagePickerModalVisible] =
    useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const openGallery = async () => {
    try {
      const result = await getGalleryImages({sectionLimit: 1});

      if (result) {
        const selectedImage = result[0];
        setProfileImage(selectedImage.uri ? selectedImage.uri : null);
        setModalMessage('프로필 이미지가 변경되었습니다.');
        setIsModalVisible(true);
      }
    } catch (error) {
      setModalMessage('이미지 선택 중 오류가 발생했습니다.');
      setIsModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleImagePickerModalClose = () => {
    setIsImagePickerModalVisible(false);
  };

  const handleClearNickname = () => {
    setNickname('');
  };

  const value = {
    profileImage,
    nickname,
    socialMediaType,
    isModalVisible,
    isImagePickerModalVisible,
    modalMessage,
    setProfileImage,
    setNickname,
    openGallery,
    handleModalClose,
    handleImagePickerModalClose,
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
