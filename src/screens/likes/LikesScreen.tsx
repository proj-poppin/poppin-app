import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../style/textStyles.ts';
import CalendarSvg from '../../assets/icons/calendar.svg';
import primaryColors from '../../style/primaryColors.ts'; // Note: Imported 'primaryColors' twice, removed 'Colors'
import DownBlackSvg from '../../assets/icons/downBlack.svg'; // Note: Imported 'DownBlackSvg' from a different location
import OrderSvg from '../../assets/icons/order.svg';
import CustomSelectDropdown from '../../components/CustomDropDown.tsx';
import LoadingScreen from '../splash/LoadingScreen.tsx';
import {useAppDispatch} from '../../store';
import loadingSlice from '../../slices/loading.ts';
import {SafeAreaView} from 'react-native-safe-area-context';

const popUpTypes = ['오픈 예정인 팝업', '운영 중인 팝업', '운영 종료 팝업'];
const orderTypes = ['오픈일순', '마감일순', '저장순'];

import InterestSampleSvg from '../../assets/images/interestSample.svg';

import DividerLine from '../../components/DividerLine.tsx';
import InterestPopUpCard from '../../components/InterestPopUpCard.tsx';

function LikesScreen() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // 로딩 시작
    dispatch(loadingSlice.actions.setLoading({isLoading: true}));
    // 데이터 로딩 로직...
    setTimeout(() => {
      // 로딩 완료 후 2초가 지나면 로딩 상태를 false로 변경
      dispatch(loadingSlice.actions.setLoading({isLoading: false}));
    }, 6000);
  }, [isLoading, dispatch]);

  return isLoading ? (
    <LoadingScreen isLoading={isLoading} />
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: primaryColors.white,
        paddingHorizontal: 10,
      }}>
      <View style={styles.headerContainer}>
        <Text style={globalStyles.headline}>관심 팝업</Text>
        <View style={styles.calendarViewContainer}>
          <Text style={styles.labelSmallBlue}>캘린더 보기</Text>
          <CalendarSvg style={styles.calendarIcon} />
        </View>
      </View>
      <View style={styles.dropdownContainer}>
        <CustomSelectDropdown
          data={popUpTypes}
          onSelect={(selectedItem, index) => console.log(selectedItem, index)}
          buttonWidth={150}
          iconComponent={<DownBlackSvg style={styles.dropdownIcon} />}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
        />
        <View style={{width: 100}} />
        <CustomSelectDropdown
          data={orderTypes}
          onSelect={(selectedItem, index) => console.log(selectedItem, index)}
          buttonWidth={100}
          iconComponent={<OrderSvg style={styles.dropdownIcon} />}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          buttonTextStyle={globalStyles.labelPrimary}
        />
      </View>
      <Text style={[globalStyles.bodyLargePrimaryGray, styles.bodyContainer]}>
        1월 15일
      </Text>
      {/*FlatList로 관심 팝업 모델객체 만들어서 후에 렌더링*/}
      <DividerLine height={3} />
      <InterestPopUpCard
        Svg={InterestSampleSvg} // 필요한 경우 다른 SVG로 대체
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <DividerLine height={3} />
      <InterestPopUpCard
        Svg={InterestSampleSvg} // 필요한 경우 다른 SVG로 대체
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <DividerLine height={3} />
      <InterestPopUpCard
        Svg={InterestSampleSvg} // 필요한 경우 다른 SVG로 대체
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <DividerLine height={3} />
      <View />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  labelSmallBlue: {
    fontFamily: 'Pretandard-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: primaryColors.blue,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
    marginHorizontal: 10,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
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

export default LikesScreen;
