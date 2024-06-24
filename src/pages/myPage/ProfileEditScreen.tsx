import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
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
import useGetUserSetting from '../../hooks/myPage/useGetUserSetting';
import usePatchUserSetting from '../../hooks/myPage/usePatchUserSetting';
import {useSelector} from 'react-redux';
import useChangeProfileImageInfo from '../../hooks/myPage/usePutChangeProfileImage.tsx';
import ProfileEditOptions from '../../navigators/options/ProfileEditOptions.tsx';
import ConfirmationModal from '../../components/ConfirmationModal.tsx';

function MyProfileEditScreen({navigation}: any) {
  const {changeProfileImageInfo} = useChangeProfileImageInfo();
  const {data: userData, loading, error} = useGetUserSetting();
  const [profileImage, setProfileImage] = useState<any>(PoppinCirclePng);
  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [emailIcon, setEmailIcon] = useState<any>(null);
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);

  const nicknameInputRef = useRef<TextInput>(null);
  const user = useSelector(state => state.user);
  const userImageUrl = userData?.userImageUrl;

  useEffect(() => {
    if (userData) {
      setNickname(userData.nickname);
      setBirthdate(userData.birthDate);
      switch (userData.provider) {
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

      if (userData.userImageUrl) {
        setProfileImage({uri: userData.userImageUrl});
      }
    }
  }, [userData, userImageUrl]);

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

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      setProfileImage({uri: image.path});
      changeProfileImageInfo({
        uri: image.path,
        type: image.mime,
        name: image.filename || 'profileImage',
      }).then(r => console.log('r:', r));
    });
  };

  const {patchUserInfo, success} = usePatchUserSetting();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = async () => {
    const updatedData = {
      nickname: nickname,
      birthDate: birthdate,
    };

    await patchUserInfo(updatedData).then(() => {
      openCompleteModal(); // 모달 열기
    });
  };

  useEffect(() => {
    navigation.setOptions(ProfileEditOptions({navigation, handleSubmit}));
  }, [navigation, nickname, birthdate, profileImage, handleSubmit]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={globalColors.blue} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={{color: globalColors.red}}>{error.message}</Text>
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
          <TouchableOpacity style={styles.galleryIcon} onPress={openGallery}>
            <GallerySvg />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.preferenceButton}
          onPress={() => navigation.push('PreferenceSetting')}>
          <Text style={styles.preferenceButtonText}>취향 설정</Text>
        </TouchableOpacity>
        <View style={styles.emailContainer}>
          <Text style={styles.labelText}>
            {user.isSocialLogin ? '이메일' : '아이디'}
          </Text>
          <View style={styles.emailInputContainer}>
            {emailIcon && (
              <Image source={emailIcon} style={styles.socialIcon} />
            )}
            <TextInput
              style={styles.emailInput}
              value={userData?.email || 'test@poppin.com'}
              editable={false}
            />
          </View>
          <View style={{height: 30}} />
          <RequiredTextLabel label={'닉네임'} />
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
      <View style={styles.middleContainer}>
        <Text style={Text14R.text}>비밀번호 변경</Text>
        <RightSvg
          style={styles.svgStyle}
          onPress={() => {
            navigation.navigate('PasswordCheck');
          }}
        />
      </View>
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
  inputContainer: {
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
});

export default MyProfileEditScreen;
