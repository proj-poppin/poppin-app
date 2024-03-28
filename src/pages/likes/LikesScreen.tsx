import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CalendarSvg from '../../assets/icons/calendar.svg';
import globalColors from '../../utils/color/globalColors.ts';
import DownBlackSvg from '../../assets/icons/downBlack.svg';
import OrderSvg from '../../assets/icons/order.svg';
import CustomSelectDropdown from '../../components/CustomDropDown.tsx';
import {useAppDispatch} from '../../redux/stores';
import loadingSlice from '../../redux/slices/loading.ts';
import {SafeAreaView} from 'react-native-safe-area-context';

const popUpTypes = ['오픈 예정인 팝업', '운영 중인 팝업', '운영 종료 팝업'];
const orderTypes = ['오픈일순', '마감일순', '저장순'];

import InterestSampleSvg from '../../assets/images/interestSample.svg';

import DividerLine from '../../components/DividerLine.tsx';
import InterestPopUpCard from '../../components/InterestPopUpCard.tsx';
import LoadingPoppinSvg from '../../assets/icons/loadingPoppin.svg';
import NotLogginBox from '../../components/NotLogginBox.tsx';
import ListIconSvg from '../../assets/icons/listIcon.svg';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Calendar} from 'react-native-calendars';
import Text20B from '../../components/texts/title/Text20B.ts';
import Text24B from '../../components/texts/headline/Text24B.ts';
import Text12B from '../../components/texts/label/Text12B.ts';
import Text18B from '../../components/texts/body_large/Text18B.ts';

function LikesScreen() {
  const [isLoading, setLoading] = useState(false);
  // const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const [dates, setDates] = useState('');
  const isLoggedIn = true;

  // BottomSheetModal ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // 바텀 시트를 여는 함수
  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  // 달력에서 날짜 선택 시 처리 함수
  const handleDayPress = day => {
    setSelectedDate({
      [day.dateString]: {selected: true, marked: true},
    });
    handlePresentModalPress(); // 달력에서 날짜 선택 후 바텀 시트 열기
  };

  // 달력 선택 날짜 상태
  const [selectedDate, setSelectedDate] = useState({});
  const [isCalendarView, setIsCalendarView] = useState(false);

  const handleDateSelected = day => {
    const newSelectedDate = {
      [day.dateString]: {
        selected: true,
      },
    };
    setSelectedDate(day.dateString); // Store the selected date
    bottomSheetModalRef.current?.present(); // Present the bottom sheet
  };
  const renderBottomSheetContent = () => (
    <View style={styles.bottomSheetContent}>
      <View style={styles.titleContainer}>
        <Text style={[Text20B.text]}>{selectedDate} Events</Text>
      </View>
      <InterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      {/* Add more cards as needed */}
    </View>
  );

  // Dynamically generate marked dates with the selected date marked in purple
  const getMarkedDates = () => {
    const today = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD

    console.log('today', today);

    let markedDates = {
      ...selectedDate, // Preserve previously selected dates
      [today]: {
        // Configuration for today's date
        selectedDate: true, // Mark today as selected
        textColor: 'black', // Ensuring text color is black for today
        selectedColor: globalColors.purpleLight, // Background color for today
        selected: true,
        dots: [
          {color: globalColors.blue, selectedDotColor: globalColors.blue},
          {color: globalColors.purple, selectedDotColor: globalColors.purple},
          {color: globalColors.white, selectedDotColor: globalColors.white},
        ],
      },
    };
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: globalColors.purple, // Background color for the selected date
      textColor: globalColors.white, // Text color for the selected date
    };

    // Ensure today's date is always marked, even if not selected
    if (!markedDates[today]) {
      markedDates[today] = {
        marked: true,
        primaryColors: globalColors.purple,
        dots: [
          {color: globalColors.blue, selectedDotColor: globalColors.blue},
          {color: globalColors.purple, selectedDotColor: globalColors.purple},
          {color: globalColors.white, selectedDotColor: globalColors.white},
        ],
      };
    }

    return markedDates;
  };

  const toggleView = () => {
    setIsCalendarView(!isCalendarView);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadingSlice.actions.setLoading({isLoading: true}));
    setTimeout(() => {
      dispatch(loadingSlice.actions.setLoading({isLoading: false}));
    }, 2000);
  }, [dispatch]);

  return isLoggedIn ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: globalColors.white,
        paddingHorizontal: 10,
      }}>
      <BottomSheetModalProvider>
        <View style={styles.headerContainer}>
          <Text style={Text24B.text}>관심 팝업</Text>
          <TouchableOpacity
            onPress={toggleView}
            style={styles.calendarViewContainer}>
            {isCalendarView ? (
              <>
                <Text style={styles.labelSmallBlue}>리스트 보기</Text>
                <ListIconSvg />
              </>
            ) : (
              <>
                <Text style={styles.labelSmallBlue}>캘린더 보기</Text>
                <CalendarSvg />
              </>
            )}
          </TouchableOpacity>
        </View>
        {isCalendarView ? (
          <View style={{flex: 1}}>
            <Calendar
              onDayPress={handleDateSelected}
              markedDates={getMarkedDates()}
              markingType="multi-dot"
              theme={{
                textDayHeaderFontWeight: '600',
                textMonthFontWeight: '600',
                todayButtonFontWeight: '600',
                arrowColor: globalColors.black,
                backgroundColor: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: globalColors.purple,
                todayTextColor: globalColors.blue,
                selectedDayTextColor: globalColors.white,
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                textDayFontSize: 16,
                textDayFontWeight: '500',
              }}
            />
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={['25%', '40%', '75%']}
              backgroundStyle={styles.bottomSheetBackground}
              handleStyle={styles.bottomSheetHandle}>
              {renderBottomSheetContent()}
            </BottomSheetModal>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <View style={styles.dropdownContainer}>
              <CustomSelectDropdown
                data={popUpTypes}
                onSelect={(selectedItem, index) =>
                  console.log(selectedItem, index)
                }
                buttonWidth={150}
                iconComponent={<DownBlackSvg style={styles.dropdownIcon} />}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem}
              />
              <View style={{width: 100}} />
              <CustomSelectDropdown
                data={orderTypes}
                onSelect={(selectedItem, index) =>
                  console.log(selectedItem, index)
                }
                buttonWidth={100}
                iconComponent={<OrderSvg style={styles.dropdownIcon} />}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                buttonTextStyle={Text12B.text}
              />
            </View>
            <Text
              style={[
                Text18B.text,
                {color: globalColors.font},
                styles.bodyContainer,
              ]}>
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
          </View>
        )}
        {/*<View styles={styles.dropdownContainer}>*/}
        {/*  <CustomSelectDropdown*/}
        {/*    data={popUpTypes}*/}
        {/*    onSelect={(selectedItem, index) => console.log(selectedItem, index)}*/}
        {/*    buttonWidth={150}*/}
        {/*    iconComponent={<DownBlackSvg styles={styles.dropdownIcon} />}*/}
        {/*    buttonTextAfterSelection={(selectedItem, index) => selectedItem}*/}
        {/*  />*/}
        {/*  <View styles={{width: 100}} />*/}
        {/*  <CustomSelectDropdown*/}
        {/*    data={orderTypes}*/}
        {/*    onSelect={(selectedItem, index) => console.log(selectedItem, index)}*/}
        {/*    buttonWidth={100}*/}
        {/*    iconComponent={<OrderSvg styles={styles.dropdownIcon} />}*/}
        {/*    buttonTextAfterSelection={(selectedItem, index) => selectedItem}*/}
        {/*    buttonTextStyle={globalStyles.labelPrimary}*/}
        {/*  />*/}
        {/*</View>*/}
        {/*<Text styles={[globalStyles.bodyLargePrimaryGray, styles.bodyContainer]}>*/}
        {/*  1월 15일*/}
        {/*</Text>*/}
        {/*/!*FlatList로 관심 팝업 모델객체 만들어서 후에 렌더링*!/*/}
        {/*<DividerLine height={3} />*/}
        {/*<InterestPopUpCard*/}
        {/*  Svg={InterestSampleSvg} // 필요한 경우 다른 SVG로 대체*/}
        {/*  title="팝업 스토어 이름1"*/}
        {/*  date="2024.01.01-2024.02.02"*/}
        {/*  status={'운영 중'}*/}
        {/*/>*/}
        {/*<DividerLine height={3} />*/}
        {/*<InterestPopUpCard*/}
        {/*  Svg={InterestSampleSvg} // 필요한 경우 다른 SVG로 대체*/}
        {/*  title="팝업 스토어 이름1"*/}
        {/*  date="2024.01.01-2024.02.02"*/}
        {/*  status={'운영 중'}*/}
        {/*/>*/}
        {/*<DividerLine height={3} />*/}
        {/*<InterestPopUpCard*/}
        {/*  Svg={InterestSampleSvg} // 필요한 경우 다른 SVG로 대체*/}
        {/*  title="팝업 스토어 이름1"*/}
        {/*  date="2024.01.01-2024.02.02"*/}
        {/*  status={'운영 중'}*/}
        {/*/>*/}
        {/*<DividerLine height={3} />*/}
        {/*<View />*/}
      </BottomSheetModalProvider>
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: globalColors.white,
        paddingHorizontal: 10,
      }}>
      <View style={styles.headerContainer}>
        <Text style={Text24B.text}>관심 팝업</Text>
      </View>
      <View style={styles.center}>
        <LoadingPoppinSvg />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <NotLogginBox
            text1={'로그인하고'}
            text2={'관심 팝업을 저장해보세요!'}
            buttonText={'로그인 하러 가기'}
            onPress={() => console.log('로그인하러 가기')}
            isNeedBox={false}
          />
        </View>
      </View>
      <View />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%', // Ensure the container takes the full width
    paddingHorizontal: 16, // Add some padding
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
  },
  bottomSheetHandle: {},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
  },
  labelSmallBlue: {
    fontFamily: 'Pretandard-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: globalColors.blue,
    marginRight: 10,
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
});

export default LikesScreen;
