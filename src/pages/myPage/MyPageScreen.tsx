import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
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
import Text20B from '../../styles/texts/title/Text20B.ts';
import Text14R from '../../styles/texts/body_medium/Text14R.ts';
import Text14B from '../../styles/texts/body_medium/Text14B.ts';
import useLogout from '../../hooks/auth/useLogout.tsx';
import useGetUser from '../../hooks/auth/useGetUser.tsx';
import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn.tsx';
import logout from '../../apis/auth/logout.ts';
import Text14M from '../../styles/texts/body_medium/Text14M.ts';

function MyPageScreen({navigation}) {
  const {handleLogout, logoutStatus} = useLogout();

  const {data: user, loading, error} = useGetUser();

  // 로그아웃 확인 다이얼로그 표시
  const showLogoutConfirmation = () => {
    Alert.alert(
      '로그아웃', // 타이틀
      '로그아웃 하시겠습니까?', // 메시지
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

  useEffect(() => {
    if (logoutStatus.success) {
      console.log('로그아웃 성공');
      navigation.navigate('MyPage');
    } else if (logoutStatus.error) {
      console.log('로그아웃 실패:', logoutStatus.error);
    }
  }, [logoutStatus, navigation]);
  const navigateToProfileEdit = () => {
    isLoggedIn
      ? navigation.navigate('ProfileEdit')
      : navigation.navigate('Entry');
  };

  const navigateToReviewWrite = () => {
    isLoggedIn
      ? navigation.navigate('ReviewWrite')
      : navigation.navigate('Entry');
  };

  const navigateToKeywordAlarm = () => {
    isLoggedIn
      ? navigation.navigate('KeywordAlarm')
      : navigation.navigate('Entry');
  };

  const isLoggedIn = useIsLoggedIn();

  console.log('isLoggedIn', isLoggedIn);

  // 화면클릭시 모달 내려감
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
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ['40%'], []);

  // callbacks
  const handlePresentModal = useCallback(
    (action: () => void) => {
      if (isLoggedIn) {
        bottomSheetModalRef.current?.present();
      } else {
      }
    },
    [isLoggedIn],
  );

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const reviewCount = 10;

  return (
    <DismissKeyboardView style={styles.container}>
      <SafeAreaView style={[{flex: 1}, {backgroundColor: globalColors.white}]}>
        <View style={styles.titleContainer}>
          <Text style={text24B.text}>마이 페이지</Text>
        </View>
        <View style={styles.rowHeaderContainer}>
          <ProfileSvg />
          <View style={styles.colCloseContainer}>
            <Text style={[text20B.text]}>
              {isLoggedIn ? user?.nickname : '로그인 후 이용해주세요'}
            </Text>
            <Pressable
              style={styles.profileInfoContainer}
              onPress={navigateToProfileEdit}
              // style={styles.infoRow}>
            >
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
        <CompleteButton onPress={handlePresentModal} title={'팝업 제보하기'} />
        <View style={styles.rowBodyContainer}>
          <View style={styles.colMidContainer}>
            <Text style={Text13R.text}>후기 작성하기</Text>
            <View style={styles.infoRow}>
              <Pressable onPress={navigateToReviewWrite}>
                <FeedBackSvg style={styles.iconPadding} />
              </Pressable>
              <Text style={[Text18B.text, {color: globalColors.blue}]}>
                {reviewCount}
              </Text>
            </View>
          </View>
          <DividerSvg style={styles.dividerPadding} />
          <View style={styles.colMidContainer}>
            <Text style={Text13R.text}>작성 완료한 후기</Text>
            <View style={styles.infoRow}>
              <CompleteSvg style={styles.iconPadding} />
              <Text style={[Text18B.text, {color: 'gray'}]}>{reviewCount}</Text>
            </View>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={Text20B.text}>최근 본 팝업</Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.popUpScrollView}>
          {[...Array(10).keys()].map(index => (
            <PopUpCard
              key={index}
              Svg={FeedBackSvg} // 예시로 사용, 필요에 따라 다른 SVG 컴포넌트를 사용하세요
              title={`팝업 ${index + 1}`}
            />
          ))}
        </ScrollView>
        <View style={styles.middleContainer}>
          <Text style={Text14M.text}>키워드 알림 설정</Text>
          <RightSvg style={styles.svgStyle} onPress={navigateToKeywordAlarm} />
        </View>
        <View style={styles.middleContainer}>
          <Text style={Text14M.text}>문의하기/FAQ</Text>
          <RightSvg
            style={styles.svgStyle}
            onPress={() => {
              navigation.navigate('FAQ');
            }}
          />
        </View>
        <View style={styles.appVersionContainer}>
          <Text style={Text14M.text}>앱 버전</Text>
          <View style={styles.rowHeaderContainer}>
            <Text style={[Text13R.text, {color: globalColors.stroke2}]}>
              1.16.0
            </Text>
          </View>
        </View>
        <View style={styles.middleContainer}>
          <Text style={Text14M.text}>이용 약관 및 정책</Text>
          <RightSvg
            style={styles.svgStyle}
            onPress={() => {
              navigation.navigate('ServicePolicy');
            }}
          />
        </View>
        <Pressable style={styles.middleContainer} onPress={onLogoutClick}>
          <Text style={Text14M.text}>로그아웃</Text>
          <RightSvg style={styles.svgStyle} />
        </Pressable>
        <View style={styles.modalContainer}>
          <BottomSheetModal
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
                onPress={() => {
                  navigation.navigate('UserRegister'); // 사용자 등록 화면으로 이동
                  bottomSheetModalRef.current?.dismiss(); // 바텀시트 닫기
                }}>
                <View style={styles.optionRow}>
                  <Text style={[Text18B.text, {color: globalColors.blue}]}>
                    팝업 이용자
                  </Text>
                  <View style={styles.optionRight}>
                    <Text style={Text18B.text}>제보하기</Text>
                    <BigRightSvg />
                  </View>
                </View>
                <Text style={[Text14B.text, {paddingTop: 10}]}>
                  관심있는 팝업이 POPPIN에 올라와 있지 않다면?
                </Text>
              </Pressable>
              <View style={styles.divider} />
              <Pressable
                style={styles.optionContainer}
                onPress={() => {
                  navigation.navigate('OperatorRegister'); // 운영자 등록 화면으로 이동
                  bottomSheetModalRef.current?.dismiss(); // 바텀시트 닫기
                }}>
                <View style={styles.optionRow}>
                  <Text style={[Text18B.text, {color: globalColors.purple}]}>
                    팝업 운영자
                  </Text>
                  <View style={styles.optionRight}>
                    <Text
                      style={[Text18B.text, {color: globalColors.warmGray}]}>
                      제보하기
                    </Text>
                    <BigRightSvg />
                  </View>
                </View>
                <Text style={[Text18B.text, {paddingTop: 10}]}>
                  운영하는 팝업이 POPPIN에 올라와 있지 않다면?
                </Text>
              </Pressable>
            </View>
          </BottomSheetModal>
        </View>
      </SafeAreaView>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center', // 세로 중앙 정렬
    
  },
  // 기존 스타일 유지
  profileInfoContainer: {
    flexDirection: 'row', // 가로로 배열
    alignItems: 'center', // 세로 중앙 정렬
    // marginTop: 10, // 필요한 경우 마진 조정
  
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
    fontSize:12,
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
    paddingTop: 5, // 기존의 패딩 유지
    marginBottom: -5, // 아이콘과 텍스트 사이의 간격 조정
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
    marginLeft: 5, //small gap between the text and the icon
  },
  dropdownButtonStyle: {
    backgroundColor: 'white', // 버튼 배경색을 흰색으로 설정
    // 필요한 경우 여기에 다른 스타일 추가
  },
  rowTextStyle: {
    backgroundColor: globalColors.white,
  },
  buttonInnerContainer: {
    flexDirection: 'row', // 텍스트와 아이콘을 가로로 배열
    alignItems: 'center', // 세로 중앙 정렬
    justifyContent: 'flex-start', // 내용물 사이의 공간 동일하게 배분
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  dropdownStyle: {
    borderRadius: 10, // 모서리 둥글기 적용
    // 필요한 경우 여기에 추가 스타일 설정
  },
  popUpScrollView: {
    marginTop: 15,
    paddingHorizontal: 5, // 스크롤뷰의 좌우 패딩
  },
  svgStyle: {
    height: 30, // SVG 높이를 30으로 설정
    width: 30, // SVG 너비를 30으로 설정
    paddingRight: 10, // SVG 우측 패딩 유지
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
