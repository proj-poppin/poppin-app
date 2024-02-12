import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import primaryColors from '../../style/primaryColors.ts';
import {globalStyles} from '../../style/textStyles.ts';
import ProfileSvg from '../../assets/images/profile.svg';
import NextButton from '../../components/NextButton.tsx';
import CompleteButton from '../../components/CompleteButton.tsx';
import FeedBackSvg from '../../assets/icons/feedback.svg';
import CompleteSvg from '../../assets/icons/complete.svg';
import DividerLine from '../../components/DividerLine.tsx';

function MyPageScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.middleContainer}>
        <Text style={globalStyles.title}>마이 페이지</Text>
      </View>
      <View style={styles.rowCloseContainer}>
        <ProfileSvg />
        <View style={styles.colCloseContainer}>
          <Text style={[globalStyles.title, styles.profileTitle]}>팝핀퀸</Text>
          <Text style={[globalStyles.labelPrimaryGray, styles.profileLabel]}>
            내 정보 및 취향 관리
          </Text>
        </View>
      </View>
      <CompleteButton
        onPress={() => {}}
        title={'팝업 제보하기'}
        widthRatio={'100%'}
      />
      <View style={styles.rowCloseContainer}>
        <View style={styles.colMidContainer}>
          <Text>후기 작성하기</Text>
          <FeedBackSvg style={styles.iconPadding} />
        </View>
        <View style={styles.divider} />
        <View style={styles.colMidContainer}>
          <Text>작성 완료한 후기</Text>
          <CompleteSvg style={styles.iconPadding} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  profileTitle: {
    // 필요한 스타일 추가
  },
  profileLabel: {
    paddingTop: 10, // "내 정보 및 취향 관리"에 상단 패딩 추가
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
  rowCloseContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  iconPadding: {
    paddingTop: 5, // SVG 아이콘과 텍스트 사이의 간격 조정
  },
  divider: {
    borderBottomColor: primaryColors.font,
    borderBottomWidth: 1,
    marginVertical: 20, // 선을 중심으로 컨텐츠가 서로 떨어져 있도록 마진 추가
  },

  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
export default MyPageScreen;
