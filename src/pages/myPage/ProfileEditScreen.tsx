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
import RightSvg from '../../assets/icons/bigRight.svg';
import globalColors from '../../styles/color/globalColors';
import GallerySvg from '../../assets/icons/gallery.svg';
import ImagePicker from 'react-native-image-crop-picker';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import CloseGraySvg from '../../assets/icons/closeGray.svg';
import RequiredTextLabel from '../../components/RequiredTextLabel';
import Text14R from '../../styles/texts/body_medium/Text14R';
import NaverCirclePng from '../../assets/png/naverCircle.png';
import KakaoCirclePng from '../../assets/png/kakaoCircle.png';
import GoogleCirclePng from '../../assets/png/googleCircle.png';
import AppleCirclePng from '../../assets/png/appleCircle.png';
import PoppinCirclePng from '../../assets/png/poppinCircle.png';
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
import {requestGalleryPermissions} from '../../utils/function/requestGalleryPermission.ts';

type ProfileEditScreenRouteProp = RouteProp<
  AppNavigatorParamList,
  'ProfileEdit'
>;

function MyProfileEditScreen() {
  const {changeProfileImageInfo} = useChangeProfileImageInfo();
  const [profileImage, setProfileImage] = useState<any>(PoppinCirclePng);
  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [emailIcon, setEmailIcon] = useState<any>(null);
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [isBlank, setIsBlank] = useState(false);

  const nicknameInputRef = useRef<TextInput>(null);
  const user = useSelector((state: RootState) => state.user);

  const route = useRoute<ProfileEditScreenRouteProp>();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setBirthdate(user.birthDate);
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
        '갤러리 권한 필요',
        '갤러리 접근 권한이 필요합니다. 앱 설정에서 갤러리 접근 권한을 허용해주세요.',
        [
          {text: '취소', style: 'cancel'},
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
      console.log('ImagePicker Success: ', image);
      dispatch(setProfileImageUrl({userImageUrl: image.path}));
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };
  const showActionSheet = () => {
    const options = ['기본 프로필 설정', '사진 선택하기', '취소'];
    const cancelButtonIndex = 2;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          setProfileImage(PoppinCirclePng);
          dispatch(setProfileImageUrl({userImageUrl: null}));
        } else if (buttonIndex === 1) {
          openGallery();
        }
      },
    );
  };

  const {patchUserInfo} = usePatchUserSetting();

  const handleNicknameChange = async () => {
    if (nickname === user.nickname || nickname.length < 2) {
      setIsBlank(nickname.length < 2);
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
    } catch (error) {
      console.log('Nickname change error: ', error);
    }
  };

  if (!user) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={globalColors.blue} />
      </View>
    );
  }

  return (
    <DismissKeyboardView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
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
              style={styles.nicknameChangeButton}
              onPress={handleNicknameChange}>
              <Text style={styles.nicknameChangeButtonText}>닉네임 변경</Text>
            </TouchableOpacity>
          </View>

          <View style={{height: 30}} />

          <RequiredTextLabel label={'생년월일'} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={birthdate}
              editable={false}
            />
          </View>
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
        style={{color: globalColors.red, marginLeft: 15}}
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
        mainTitle={
          isBlank
            ? '닉네임은 2글자 이상이어야 합니다!'
            : '닉네임은 기존 닉네임과 달라야 합니다.'
        }
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
