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

const popUpTypes = ['오픈 예정인 팝업', '운영 중인 팝업', '운영 종료 팝업'];
const orderTypes = ['오픈일순', '마감일순', '저장순'];

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
    <View style={styles.container}>
      <View style={styles.middleContainer}>
        <Text style={globalStyles.headline}>관심 팝업</Text>
        <View style={styles.calendarViewContainer}>
          <Text style={styles.labelSmallBlue}>캘린더 보기</Text>
          <CalendarSvg style={styles.calendarIcon} />
        </View>
      </View>
      <View style={styles.middleContainer}>
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
        />
      </View>
      <Text style={globalStyles.bodyLargePrimaryGray}>1월 15일</Text>
    </View>
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
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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

export default LikesScreen;
