import React, {createContext, useContext, useState} from 'react';
import {Asset} from 'react-native-image-picker';
import {getGalleryImages} from 'src/Util';
import {useUserStore} from 'src/Zustand/User/user.zustand';
import {axiosMypageProfileEdit} from 'src/Axios/Mypage/mypage.patch.axios';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
// Asset 타입 확장
interface ImageAsset extends Asset {
  uri: string;
  type?: string;
  name?: string;
}

interface ProfileEditContextType {
  userEmail: string;
  profileImage: string | Asset | null | undefined;
  nickname: string;
  socialMediaType: string;
  isModalVisible: boolean;
  isImagePickerModalVisible: boolean;
  modalMessage: string;
  setProfileImage: (image: string | undefined | null) => void;
  setNickname: (name: string) => void;
  openGallery: () => Promise<void>;
  handleModalClose: () => void;
  handleImagePickerModalClose: () => void;
  handleClearNickname: () => void;
  onCompleteProfileEdit: () => void;
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
  const setUser = useUserStore(state => state.setUser);
  const [userEmail, setUserEmail] = useState<string>(user.email);
  const [profileImage, setProfileImage] = useState<
    string | Asset | null | undefined
  >(user.userImageUrl);
  const [nickname, setNickname] = useState(user.nickname);
  const [socialMediaType, setSocialMediaType] = useState(user.accountType);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImagePickerModalVisible, setIsImagePickerModalVisible] =
    useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  const openGallery = async () => {
    try {
      const result = await getGalleryImages({sectionLimit: 1});

      if (result) {
        const selectedImage = result[0];
        await setProfileImage(selectedImage);
      }
    } catch (error) {
      setModalMessage('이미지 선택 중 오류가 발생했습니다.');
      setIsModalVisible(true);
    }
  };

  const handleModalClose = () => {
    navigation.goBack();
    setIsModalVisible(false);
  };

  const handleImagePickerModalClose = () => {
    setIsImagePickerModalVisible(false);
  };

  const handleClearNickname = () => {
    setNickname('');
  };

  const onCompleteProfileEdit = async () => {
    const formData = new FormData();

    if (profileImage) {
      if (typeof profileImage === 'string') {
        // 기존 이미지 유지, 추가 처리 불필요
      } else {
        // Asset 객체인 경우
        const imageAsset = profileImage as ImageAsset;
        formData.append('profileImage', {
          uri: imageAsset.uri,
          type: imageAsset.type || 'image/jpeg',
          name: imageAsset.fileName || `image${user.email}.jpg`,
        } as any);
      }
    }

    formData.append('nickname', nickname);
    const response = await axiosMypageProfileEdit(formData);

    if (response.success) {
      const updatedUser = {
        ...user,
        userImageUrl: response.data,
        nickname: nickname,
      };
      setModalMessage('프로필이 수정되었습니다.');
      setIsModalVisible(true);

      setUser(updatedUser);
    }
  };

  const value = {
    userEmail,
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
    onCompleteProfileEdit,
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
