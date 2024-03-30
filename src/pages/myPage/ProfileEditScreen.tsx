import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
// @ts-ignore
import ProfileImg from '../../assets/images/defaultProfile.png';
import GoBackSvg from '../../assets/icons/goBack.svg';
import GallerySvg from '../../assets/icons/gallery.svg';
import ImagePicker from 'react-native-image-crop-picker';
import KakaoSvg from '../../assets/icons/social_login/kakao.svg';
import NaverSvg from '../../assets/icons/social_login/naver.svg';
import GoogleSvg from '../../assets/icons/social_login/google.svg';
import {useSelector} from 'react-redux';
import ProfileAppBar from '../../components/ProfileAppBar.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import RightSvg from '../../assets/icons/bigRight.svg';
import CloseGraySvg from '../../assets/icons/closeGray.svg';
import RequiredTextLabel from '../../components/RequiredTextLabel.tsx';
import Text14R from '../../styles/texts/body_medium/Text14R.ts';

function MyProfileEditScreen({navigation}) {
  const [profileImage, setProfileImage] = useState(ProfileImg);
  // Redux store에서 user 상태 가져오기
  const user = useSelector(state => state.user);
  const [email, setEmail] = useState(user.email || 'poppin@gmail.com'); // 이메일이 없는 경우 디폴트 이메일 설정
  const [emailIcon, setEmailIcon] = useState(null);
  const [nickname, setNickname] = useState(user.nickname || 'test');
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);

  // 닉네임 입력 필드의 포커스 상태 변경을 위한 핸들러
  const handleNicknameFocus = () => setIsNicknameFocused(true);
  const handleNicknameBlur = () => setIsNicknameFocused(false);

  const nicknameInputRef = useRef(null); // TextInput에 대한 ref 생성

  // 닉네임 수정을 위한 핸들러
  const handleClearNickname = () => {
    setNickname(''); // 닉네임 상태 초기화
    // TextInput에 프로그램적으로 포커스
    nicknameInputRef.current.focus();
  };

  // '회원 탈퇴' 버튼 클릭 핸들러
  const handleMemberWithdrawalPress = () => {
    navigation.navigate('MemberDelete');
  };
  // useEffect(() => {
  //   // 이메일에 따라 SVG 아이콘 설정
  //   if (user.email.includes('kakao')) {
  //     setEmailIcon(<KakaoSvg />);
  //   } else if (user.email.includes('naver')) {
  //     setEmailIcon(<NaverSvg />);
  //   } else if (user.email.includes('gmail')) {
  //     setEmailIcon(<GoogleSvg />);
  //   } else {
  //     setEmailIcon(<GoogleSvg />); // 이메일이 다른 경우 아이콘 없음
  //   }
  // }, [user.email]);

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 110,
      height: 110,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(image => {
        console.log('selected image', image);
        setProfileImage({uri: image.path});
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  return (
    <DismissKeyboardView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={profileImage} />
          <TouchableOpacity style={styles.galleryIcon} onPress={openGallery}>
            <GallerySvg />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.preferenceButton}
          onPress={() => {
            // 버튼 클릭 시 이벤트 핸들러
            navigation.push('PreferenceSetting');
          }}>
          <Text style={styles.preferenceButtonText}>취향 설정</Text>
        </TouchableOpacity>
        <View style={styles.emailContainer}>
          <Text style={styles.labelText}>
            {user.isSocialLogin ? '이메일' : '아이디'}
          </Text>
          <View style={styles.emailInputContainer}>
            {/*{user.isSocialLogin && emailIcon}*/}
            {!user.isSocialLogin && <KakaoSvg style={styles.socialIcon} />}
            <TextInput
              style={styles.emailInput}
              value={email}
              editable={false} // 편집 불가능하게 설정
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
              ref={nicknameInputRef} // TextInput에 ref 할당
              style={styles.input}
              value={nickname} // 닉네임 상태를 value로 사용
              onChangeText={setNickname} // 텍스트 변경 시 닉네임 상태 업데이트
              onFocus={handleNicknameFocus}
              onBlur={handleNicknameBlur}
              clearButtonMode="while-editing"
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
              value="2021.09.30" // 임시 값
              editable={false} // 편집 불가능하게 설정
            />
          </View>
        </View>
      </View>

      <View style={styles.middleContainer}>
        <Text style={Text14R.text}>비밀번호 변경</Text>
        <RightSvg
          style={styles.svgStyle}
          onPress={() => {
            navigation.navigate('PasswordChange');
          }}
        />
      </View>
      <Text
        style={{color: globalColors.red, marginLeft: 15}}
        onPress={handleMemberWithdrawalPress}>
        회원 탈퇴
      </Text>
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
    backgroundColor: 'white', // 내부 색깔을 흰색으로 설정
    borderColor: globalColors.warmGray, // 테두리 색상을 globalColors.component로 설정
    borderWidth: 1, // 테두리 두께 설정
    borderRadius: 30,
    padding: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: 'black', // 검은색 글씨
  },
  container: {
    flex: 1,
    backgroundColor: 'white', // 전체 배경색을 흰색으로 설정
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
    flex: 1, // 나머지 공간 채우기
    marginLeft: 10, // 아이콘과의 간격
    color: globalColors.font,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 30, // 상단 여백 추가
  },
  socialIcon: {
    marginRight: 5, // 아이콘과 텍스트 필드 사이의 간격
    width: 20, // 아이콘의 너비
    height: 20, // 아이콘의 높이
  },
  profileText: {
    fontSize: 18,
    marginBottom: 20, // 텍스트와 버튼 사이의 간격
    color: globalColors.font,
  },
  preferenceButton: {
    marginTop: 20, // 버튼의 상단 여백
    backgroundColor: globalColors.blue, // 버튼 배경색
    paddingVertical: 10, // 상하 패딩
    paddingHorizontal: 20, // 좌우 패딩
    borderRadius: 25, // 모서리 둥글기
    justifyContent: 'center',
    alignItems: 'center',
  },
  preferenceButtonText: {
    color: 'white', // 텍스트 색상
    fontSize: 13, // 텍스트 크기
    fontWeight: '600',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {},
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  galleryIcon: {
    position: 'absolute', // 절대 위치 사용
    right: 0, // 오른쪽 하단에 위치
    bottom: 0, // 오른쪽 하단에 위치
  },
  svgStyle: {
    height: 30, // SVG 높이를 30으로 설정
    width: 30, // SVG 너비를 30으로 설정
    paddingRight: 10, // SVG 우측 패딩 유지
  },
});

export default MyProfileEditScreen;
