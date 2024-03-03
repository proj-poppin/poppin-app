import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import primaryColors from '../../style/primaryColors.ts';
import {globalStyles} from '../../style/textStyles.ts';
import ProfileSvg from '../../assets/images/profile.svg';
import CompleteButton from '../../components/CompleteButton.tsx';
import FeedBackSvg from '../../assets/icons/feedback.svg';
import CompleteSvg from '../../assets/icons/complete.svg';
import DividerSvg from '../../assets/images/divider.svg';
import PopUpCard from '../../components/PopUpCard.tsx';
import RightSvg from '../../assets/icons/bigRight.svg';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import ProfileSmallRightSvg from '../../assets/icons/profileSmallRight.svg';
import BigRightSvg from '../../assets/icons/bigRight.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
function MyPageScreen({navigation}) {
  const navigateToProfileEdit = () => {
    navigation.navigate('ProfileEdit');
  };

  // 화면클릭시 모달 내려감
  const renderBackdrop = useCallback(
    props => (
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
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    // handleOpenBottomSheet();
  }, []);

  const reviewCount = 10;

  return (
    <DismissKeyboardView style={styles.container}>
      <SafeAreaView style={{flex: 1, backgroundColor: primaryColors.white}}>
        <View style={styles.titleContainer}>
          <Text style={globalStyles.headline}>마이 페이지</Text>
        </View>
        <View style={styles.rowHeaderContainer}>
          <ProfileSvg />
          <View style={styles.colCloseContainer}>
            <Text style={[globalStyles.title]}>팝핀퀸</Text>
            <Pressable
              style={styles.profileInfoContainer}
              onPress={navigateToProfileEdit}
              style={styles.infoRow}>
              <Text
                style={[globalStyles.labelPrimaryGray, styles.profileLabel]}>
                내 정보 및 취향 관리
              </Text>
              <ProfileSmallRightSvg
                style={{marginTop: 10, marginHorizontal: 5}}
              />
            </Pressable>
          </View>
        </View>
        <CompleteButton
          onPress={handlePresentModal}
          title={'팝업 제보하기'}
          widthRatio={'100%'}
        />
        <View style={styles.rowBodyContainer}>
          <View style={styles.colMidContainer}>
            <Text style={globalStyles.labelSub}>후기 작성하기</Text>
            <View style={styles.infoRow}>
              <Pressable onPress={() => navigation.navigate('ReviewWrite')}>
                <FeedBackSvg style={styles.iconPadding} />
              </Pressable>
              <Text style={globalStyles.bodyLargePrimaryBlue}>
                {reviewCount}
              </Text>
            </View>
          </View>
          <DividerSvg style={styles.dividerPadding} />
          <View style={styles.colMidContainer}>
            <Text style={globalStyles.labelSub}>작성 완료한 후기</Text>
            <View style={styles.infoRow}>
              <CompleteSvg style={styles.iconPadding} />
              <Text style={globalStyles.bodyLargePrimaryGray}>
                {reviewCount}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={globalStyles.title}>최근 본 팝업</Text>
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
              date={'01.01.-02.02'} // 일부에만 날짜 표시
            />
          ))}
        </ScrollView>
        <View style={styles.middleContainer}>
          <Text style={globalStyles.bodyMediumSub}>키워드 알림 설정</Text>
          <RightSvg
            style={styles.svgStyle}
            onPress={() => {
              navigation.navigate('KeywordAlarm');
            }}
          />
        </View>
        <View style={styles.middleContainer}>
          <Text style={globalStyles.bodyMediumSub}>문의하기/FAQ</Text>
          <RightSvg
            style={styles.svgStyle}
            onPress={() => {
              navigation.navigate('FAQ');
            }}
          />
        </View>
        <View style={styles.appVersionContainer}>
          <Text style={globalStyles.bodyMediumSub}>앱 버전</Text>
          <View style={styles.rowHeaderContainer}>
            <Text style={globalStyles.labelSubStroke}>1.16.0</Text>
          </View>
        </View>
        <View style={styles.middleContainer}>
          <Text style={globalStyles.bodyMediumSub}>이용 약관 및 정책</Text>
          <RightSvg
            style={styles.svgStyle}
            onPress={() => {
              navigation.navigate('Policy');
            }}
          />
        </View>
      </SafeAreaView>
      <View style={styles.modalContainer}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text
              style={[
                globalStyles.bodyLargePrimaryBlack,
                {paddingTop: 15, paddingBottom: 40},
              ]}>
              제보하는 사람이 누구인가요?
            </Text>
            <Pressable
              style={styles.optionContainer}
              onPress={() => {
                navigation.navigate('UserRegister'); // 사용자 등록 화면으로 이동
                bottomSheetModalRef.current?.dismiss(); // 바텀시트 닫기
              }}>
              <View style={styles.optionRow}>
                <Text style={globalStyles.bodyLargePrimaryBlue}>
                  팝업 이용자
                </Text>
                <View style={styles.optionRight}>
                  <Text style={globalStyles.labelPrimaryGray}>제보하기</Text>
                  <BigRightSvg />
                </View>
              </View>
              <Text style={[globalStyles.labelPrimary, {paddingTop: 10}]}>
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
                <Text style={globalStyles.bodyLargePrimaryPurple}>
                  팝업 운영자
                </Text>
                <View style={styles.optionRight}>
                  <Text style={globalStyles.labelPrimaryGray}>제보하기</Text>
                  <BigRightSvg />
                </View>
              </View>
              <Text style={[globalStyles.labelPrimary, {paddingTop: 10}]}>
                운영하는 팝업이 POPPIN에 올라와 있지 않다면?
              </Text>
            </Pressable>
          </View>
        </BottomSheetModal>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center', // 세로 중앙 정렬
  },
  // 기존 스타일 유지
  profileInfoContainer: {
    flexDirection: 'row', // 가로로 배열
    alignItems: 'center', // 세로 중앙 정렬
    marginTop: 10, // 필요한 경우 마진 조정
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
    paddingTop: 10, // "내 정보 및 취향 관리"에 상단 패딩 추가
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
  divider: {
    borderBottomColor: primaryColors.font,
    borderBottomWidth: 1,
    marginVertical: 20, // 선을 중심으로 컨텐츠가 서로 떨어져 있도록 마진 추가
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
    backgroundColor: primaryColors.white,
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
    color: primaryColors.stroke2,
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
    color: primaryColors.font,
    fontSize: 14,
    paddingLeft: 10,
  },
  divider: {
    height: 2,
    backgroundColor: primaryColors.warmGray,
    width: '100%',
    marginBottom: 20,
  },
});
export default MyPageScreen;
