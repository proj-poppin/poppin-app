import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import primaryColors from '../../style/primaryColors.ts';
import {globalStyles} from '../../style/textStyles.ts';
import ProfileSvg from '../../assets/images/profile.svg';
import NextButton from '../../components/NextButton.tsx';
import CompleteButton from '../../components/CompleteButton.tsx';
import FeedBackSvg from '../../assets/icons/feedback.svg';
import CompleteSvg from '../../assets/icons/complete.svg';
import DividerSvg from '../../assets/images/divider.svg';
import PopUpCard from '../../components/PopUpCard.tsx';
import RightSvg from '../../assets/icons/bigRight.svg';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import ProfileSmallRightSvg from '../../assets/icons/profileSmallRight.svg';

function MyPageScreen({navigation}) {
  const navigateToProfileEdit = () => {
    navigation.navigate('ProfileEdit');
  };

  const reviewCount = 10;

  return (
    <DismissKeyboardView style={styles.container}>
      <View style={styles.container}>
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
          onPress={() => {
            navigation.navigate('UserRegister');
          }}
          title={'팝업 제보하기'}
          widthRatio={'100%'}
        />
        <View style={styles.rowBodyContainer}>
          <View style={styles.colMidContainer}>
            <Text style={globalStyles.labelSub}>후기 작성하기</Text>
            <View style={styles.infoRow}>
              <FeedBackSvg style={styles.iconPadding} />
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
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 40,
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
});
export default MyPageScreen;
