import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ActionSheetIOS,
  Linking,
  Alert,
} from 'react-native';
import RightSvg from 'src/Resource/svg/Icons/right-arrow-icon.svg';
import globalColors from '../../styles/color/globalColors';
import GallerySvg from 'src/Resource/svg/gallery-icon.svg';
import ImagePicker from 'react-native-image-crop-picker';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import CloseGraySvg from 'src/Resource/svg/clock-icon.svg';
import RequiredTextLabel from '../../components/RequiredTextLabel';
import Text14R from '../../styles/texts/body_medium/Text14R';
import NaverCirclePng from 'src/Resource/png/naver-login-button-circle.png';
import KakaoCirclePng from 'src/Resource/png/kakao-login-button-circle.png';
import GoogleCirclePng from 'src/Resource/png/google-login-button-circle.png';
import AppleCirclePng from 'src/Resource/png/apple-login-button-circle.png';
import PoppinCirclePng from 'src/Resource/png/app-logo.png';
import usePatchUserSetting from '../../hooks/myPage/usePatchUserSetting';
import {useDispatch, useSelector} from 'react-redux';
import useChangeProfileImageInfo from '../../hooks/myPage/usePutChangeProfileImage.tsx';
import ConfirmationModal from '../../components/ConfirmationModal.tsx';
import CustomOKModal from '../../components/CustomOKModal.tsx';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  setProfileImageUrl,
  setProfileNickname,
} from '../../redux/slices/user.ts';
import {RootState} from '../../redux/stores/reducer.ts';
import {requestGalleryPermissions} from '../../Util/function/requestGalleryPermission.ts';
import useDeleteProfileImage from '../../hooks/myPage/usedeleteProfileImage.tsx';
import FastImage from 'react-native-fast-image';

type ProfileEditScreenRouteProp = RouteProp<
  AppNavigatorParamList,
  'ProfileEdit'
>;

function MyProfileEditScreen() {
  const {deleteProfileImageHandler} = useDeleteProfileImage();
  const {changeProfileImageInfo} = useChangeProfileImageInfo();
  const [profileImage, setProfileImage] = useState<any>(PoppinCirclePng);
  const [nickname, setNickname] = useState('');
  const [emailIcon, setEmailIcon] = useState<any>(null);
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const nicknameInputRef = useRef<TextInput>(null);
  const user = useSelector((state: RootState) => state.user);

  const route = useRoute<ProfileEditScreenRouteProp>();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      switch (user.provider) {
        case 'KAKAO':
          setEmailIcon(KakaoCirclePng);
          break;
        case 'NAVER':
          setEmailIcon(NaverCirclePng);
          break;
        case 'GOOGLE':
          setEmailIcon(GoogleCirclePng);
          break;
        case 'APPLE':
          setEmailIcon(AppleCirclePng);
          break;
        default:
          setEmailIcon(null);
          break;
      }
      if (user.userImageUrl) {
        setProfileImage({uri: user.userImageUrl});
      }
    }
  }, [dispatch, user]);

  const openCompleteModal = () => {
    setCompleteModalVisible(true);
  };

  const closeCompleteModal = () => {
    setCompleteModalVisible(false);
    navigation.goBack();
  };

  const handleNicknameFocus = () => setIsNicknameFocused(true);
  const handleNicknameBlur = () => setIsNicknameFocused(false);
  const handleMemberWithdrawalPress = () => {
    navigation.navigate('MemberDelete');
  };

  const handleClearNickname = () => {
    setNickname('');
  };

  const openGallery = async () => {
    const hasPermission = await requestGalleryPermissions();
    if (!hasPermission) {
      Alert.alert(
        '갤러리 접근 권한 요청',
        '팝핀에서 프로필 사진 설정시 사진 라이브러리 접근 권한 동의가 필요합니다. 설정에서 이를 변경할 수 있습니다.',
        [
          {text: '다음에 하기', style: 'cancel'},
          {text: '설정 열기', onPress: () => Linking.openSettings()},
        ],
      );
      return;
    }

    try {
      const image = await ImagePicker.openPicker({
        width: 100,
        height: 100,
        cropping: true,
        cropperCircleOverlay: true,
      });
      setProfileImage({uri: image.path});
      await changeProfileImageInfo({
        uri: image.path,
        type: image.mime,
        name: image.filename || 'profileImage',
      });
      dispatch(setProfileImageUrl({userImageUrl: image.path}));
    } catch (error) {}
  };

  const showActionSheet = () => {
    const options = ['기본 프로필 설정', '사진 선택하기', '취소'];
    const cancelButtonIndex = 2;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async buttonIndex => {
        if (buttonIndex === 0) {
          setProfileImage(PoppinCirclePng);
          const response = await deleteProfileImageHandler();
          if (response.success) {
            dispatch(setProfileImageUrl({userImageUrl: null}));
          } else {
            // console.error('Failed to delete profile image:', response.error);
          }
        } else if (buttonIndex === 1) {
          openGallery();
        }
      },
    );
  };

  const {patchUserInfo} = usePatchUserSetting();

  const handleNicknameChange = async () => {
    const nicknameRegex = /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9\s]{2,10}$/;

    let validationMessage = '';

    if (nickname === user.nickname) {
      validationMessage = '닉네임은 기존 닉네임과 달라야 합니다.';
    } else if (nickname.length < 2) {
      validationMessage = '닉네임은 2글자 이상이어야 합니다.';
    } else if (nickname.length > 10) {
      validationMessage = '닉네임은 10글자 이내여야 합니다.';
    } else if (!nicknameRegex.test(nickname)) {
      validationMessage = '올바른 형식으로 입력해주세요.';
    }

    if (validationMessage) {
      setModalMessage(validationMessage);
      setIsModalVisible(true);
      return;
    }

    const updatedData = {
      nickname: nickname,
    };

    try {
      await patchUserInfo(updatedData);
      dispatch(setProfileNickname({nickname: nickname}));
      openCompleteModal();
    } catch (error) {}
  };

  if (!user) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={globalColors.blue} />
      </View>
    );
  }

  const isNicknameChangeButtonDisabled =
    nickname === user.nickname || nickname.length < 2;

  return (
    <DismissKeyboardView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            source={profileImage.uri ? profileImage : PoppinCirclePng}
          />
          <TouchableOpacity
            style={styles.galleryIcon}
            onPress={showActionSheet}>
            <GallerySvg />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.preferenceButton}
          onPress={() => navigation.navigate('PreferenceSetting')}>
          <Text style={styles.preferenceButtonText}>취향 설정</Text>
        </TouchableOpacity>
        <View style={styles.emailContainer}>
          <Text style={styles.labelText}>
            {['KAKAO', 'NAVER', 'GOOGLE', 'APPLE'].includes(user.provider)
              ? '이메일'
              : '아이디'}
          </Text>
          <View style={styles.emailInputContainer}>
            {emailIcon && (
              <Image source={emailIcon} style={styles.socialIcon} />
            )}
            <TextInput
              style={styles.emailInput}
              value={user.email || 'test@poppin.com'}
              editable={false}
            />
          </View>

          <View style={{height: 30}} />
          <RequiredTextLabel label={'닉네임'} />
          <View style={styles.nicknameRow}>
            <View
              style={[
                styles.inputContainer,
                isNicknameFocused && {borderColor: globalColors.blue},
              ]}>
              <TextInput
                ref={nicknameInputRef}
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
                onFocus={handleNicknameFocus}
                onBlur={handleNicknameBlur}
              />
              <TouchableOpacity onPress={handleClearNickname}>
                <CloseGraySvg style={{paddingHorizontal: 15}} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.nicknameChangeButton,
                isNicknameChangeButtonDisabled && {
                  backgroundColor: globalColors.font,
                },
              ]}
              onPress={handleNicknameChange}
              disabled={isNicknameChangeButtonDisabled}>
              <Text style={styles.nicknameChangeButtonText}>닉네임 변경</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 30}} />
        </View>
      </View>
      {!['KAKAO', 'NAVER', 'GOOGLE', 'APPLE'].includes(user.provider) && (
        <TouchableOpacity
          style={styles.middleContainer}
          onPress={() => {
            navigation.navigate('PasswordChange');
          }}>
          <Text style={Text14R.text}>비밀번호 변경</Text>
          <RightSvg style={styles.svgStyle} />
        </TouchableOpacity>
      )}
      <Text
        style={{color: globalColors.red, marginLeft: 15, marginTop: 10}}
        onPress={handleMemberWithdrawalPress}>
        회원 탈퇴
      </Text>
      <ConfirmationModal
        isVisible={completeModalVisible}
        onClose={closeCompleteModal}
        mainTitle="프로필 설정이 변경됐어요!"
        subTitle={'변경사항이 저장되었습니다.'}
      />
      <CustomOKModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        isSuccessModal={false}
        mainTitle={modalMessage}
      />
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  birthdayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: globalColors.warmGray,
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: globalColors.warmGray,
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 15,
    borderRadius: 50,
  },
  labelText: {
    color: globalColors.black,
    fontSize: 15,
    marginBottom: 5,
  },
  emailInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.component,
    borderRadius: 30,
    padding: 10,
  },
  emailInput: {
    flex: 1,
    marginLeft: 10,
    color: globalColors.font,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
  },
  socialIcon: {
    marginRight: 5,
    width: 30,
    height: 30,
  },
  preferenceButton: {
    marginTop: 20,
    backgroundColor: globalColors.blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preferenceButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {},
  image: {
    width: 100,
    height: 100,
    borderRadius: 55,
  },
  galleryIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  svgStyle: {
    height: 30,
    width: 30,
    paddingRight: 10,
  },
  nicknameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nicknameChangeButton: {
    backgroundColor: globalColors.blue,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 10,
  },
  nicknameChangeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default MyProfileEditScreen;
