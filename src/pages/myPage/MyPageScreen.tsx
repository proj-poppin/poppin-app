import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import globalColors from '../../styles/color/globalColors.ts';
import ProfileSvg from '../../assets/images/profile.svg';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import FeedBackSvg from '../../assets/icons/feedback.svg';
import CompleteSvg from '../../assets/icons/complete.svg';
import DividerSvg from '../../assets/images/divider.svg';
import PopUpCard from '../../components/PopUpCard.tsx';
import RightSvg from '../../assets/icons/bigRight.svg';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import ProfileSmallRightSvg from '../../assets/icons/profileSmallRight.svg';
import BigRightSvg from '../../assets/icons/bigRight.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import text24B from '../../styles/texts/headline/Text24B.ts';
import text20B from '../../styles/texts/title/Text20B.ts';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import Text13R from '../../styles/texts/label/Text12R.ts';
import useLogout from '../../hooks/auth/useLogout.tsx';
import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn.tsx';
import Text16M from '../../styles/texts/body_medium_large/Text16M.ts';
import {useReducedMotion} from 'react-native-reanimated';
import Text14M from '../../styles/texts/body_medium/Text14M.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/stores/reducer.ts';

function MyPageScreen({navigation}) {
  const {handleLogout, logoutStatus} = useLogout();
  const reducedMotion = useReducedMotion();
  const [loadingUser, setLoadingUser] = useState(true);
  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = useIsLoggedIn();

  console.log('user:', user);

  useEffect(() => {
    console.log('userimage:', user.userImageUrl);
    if (user.nickname) {
      setLoadingUser(false);
    }
  }, [user]);

  useEffect(() => {
    if (logoutStatus.success) {
      console.log('로그아웃 성공');
      navigation.navigate('MyPage');
    } else if (logoutStatus.error) {
      console.log('로그아웃 실패:', logoutStatus.error);
    }
  }, [logoutStatus, navigation]);

  const showLogoutConfirmation = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        {
          text: '아니오',
          onPress: () => console.log('로그아웃 취소'),
          style: 'cancel',
        },
        {text: '예', onPress: () => handleLogout()},
      ],
      {cancelable: false},
    );
  };

  const onLogoutClick = () => {
    isLoggedIn ? showLogoutConfirmation() : navigation.navigate('Entry');
  };

  const navigateToProfileEdit = () => {
    isLoggedIn
      ? navigation.navigate('ProfileEdit')
      : navigation.navigate('Entry');
  };

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['40%'], []);

  const handlePresentModal = useCallback(
    (action: () => void) => {
      if (isLoggedIn) {
        bottomSheetModalRef.current?.present();
      } else {
        action();
      }
    },
    [isLoggedIn],
  );

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleFaqPress = useCallback(() => {
    Linking.openURL('https://open.kakao.com/o/sOj6HP5f');
  }, []);

  const handleNavigation = (route: string) => {
    navigation.navigate(route);
    bottomSheetModalRef.current?.dismiss();
  };

  if (loadingUser) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={[{flex: 1}, {backgroundColor: globalColors.white}]}>
        <View style={styles.titleContainer}>
          <Text style={text24B.text}>마이 페이지</Text>
        </View>
        <View style={styles.rowHeaderContainer}>
          {user.userImageUrl ? (
            <Image
              source={{uri: user.userImageUrl}}
              style={styles.profileImage}
            />
          ) : (
            <ProfileSvg />
          )}
          <View style={styles.colCloseContainer}>
            <Text style={[text20B.text]}>
              {isLoggedIn ? user.nickname : '로그인 후 이용해주세요'}
            </Text>
            <Pressable style={styles.infoRow} onPress={navigateToProfileEdit}>
              <Text
                style={[
                  Text18B.text,
                  {color: globalColors.font},
                  styles.profileLabel,
                ]}>
                내 정보 및 취향 관리
              </Text>
              <ProfileSmallRightSvg
                style={{marginTop: 10, marginHorizontal: 5}}
              />
            </Pressable>
          </View>
        </View>
        <CompleteButton
          onPress={() => handlePresentModal(() => {})}
          title={'팝업 제보하기'}
        />
        <Pressable onPress={handleFaqPress} style={styles.middleContainer}>
          <Text style={Text14M.text}>문의하기/FAQ</Text>
          <RightSvg style={styles.svgStyle} onPress={handleFaqPress} />
        </Pressable>
        <Pressable style={styles.appVersionContainer}>
          <Text style={Text14M.text}>앱 버전</Text>
          <View style={styles.rowHeaderContainer}>
            <Text style={[Text13R.text, {color: globalColors.stroke2}]}>
              1.0.0
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Policy');
          }}
          style={styles.middleContainer}>
          <Text style={Text14M.text}>이용 약관 및 정책</Text>
          <RightSvg
            style={styles.svgStyle}
            onPress={() => {
              navigation.navigate('Policy');
            }}
          />
        </Pressable>
        <Pressable style={styles.middleContainer} onPress={onLogoutClick}>
          <Text style={Text14M.text}>
            {isLoggedIn ? '로그아웃' : '로그인 하러 가기'}
          </Text>
          <RightSvg style={styles.svgStyle} />
        </Pressable>
        <View style={styles.modalContainer}>
          <BottomSheetModal
            animateOnMount={!reducedMotion}
            ref={bottomSheetModalRef}
            index={0}
            backdropComponent={renderBackdrop}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View style={styles.contentContainer}>
              <Text style={[Text18B.text, {paddingTop: 15, paddingBottom: 40}]}>
                제보하는 사람이 누구인가요?
              </Text>
              <Pressable
                style={styles.optionContainer}
                onPress={() => handleNavigation('UserRegister')}>
                <View style={styles.optionRow}>
                  <Text style={[Text18B.text, {color: globalColors.blue}]}>
                    팝업 이용자
                  </Text>
                  <View style={styles.optionRight}>
                    <Text style={Text18B.text}>제보하기</Text>
                    <BigRightSvg />
                  </View>
                </View>
                <Text style={[Text16M.text, {paddingTop: 10}]}>
                  관심있는 팝업이 POPPIN에 올라와 있지 않다면?
                </Text>
              </Pressable>
              <View style={styles.divider} />
              <Pressable
                style={styles.optionContainer}
                onPress={() => handleNavigation('OperatorRegister')}>
                <View style={styles.optionRow}>
                  <Text style={[Text18B.text, {color: globalColors.purple}]}>
                    팝업 운영자
                  </Text>
                  <View style={styles.optionRight}>
                    <Text style={[Text18B.text]}>제보하기</Text>
                    <BigRightSvg />
                  </View>
                </View>
                <Text style={[Text16M.text, {paddingTop: 10}]}>
                  운영하는 팝업이 POPPIN에 올라와 있지 않다면?
                </Text>
              </Pressable>
            </View>
          </BottomSheetModal>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  appVersionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  middleRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 15,
  },
  profileLabel: {
    paddingTop: 10,
  },
  rowBodyContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  rowHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  colMidContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  colCloseContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  iconPadding: {
    paddingTop: 5,
    marginBottom: -5,
    marginHorizontal: 3,
  },
  dividerPadding: {
    paddingHorizontal: 30,
  },
  titleContainer: {
    marginTop: 15,
  },
  calendarViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginLeft: 5,
  },
  dropdownButtonStyle: {
    backgroundColor: 'white',
  },
  rowTextStyle: {
    backgroundColor: globalColors.white,
  },
  buttonInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  dropdownStyle: {
    borderRadius: 10,
  },
  popUpScrollView: {
    marginTop: 15,
    paddingHorizontal: 5,
  },
  svgStyle: {
    height: 30,
    width: 30,
    paddingRight: 10,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelSubStroke: {
    fontFamily: 'Pretandard-Regular',
    fontSize: 13,
    fontWeight: '400',
    color: globalColors.stroke2,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  optionContainer: {
    width: '100%',
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionDescription: {
    color: globalColors.font,
    fontSize: 14,
    paddingLeft: 10,
  },
  divider: {
    height: 2,
    backgroundColor: globalColors.warmGray,
    width: '100%',
    marginBottom: 20,
  },
});

export default MyPageScreen;
