import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import CalendarSvg from '../../assets/icons/calendar.svg';
import globalColors from '../../styles/color/globalColors.ts';
import DownBlackSvg from '../../assets/icons/downBlack.svg';
import OrderSvg from '../../assets/icons/order.svg';
import CustomSelectDropdown from '../../components/CustomDropDown.tsx';
import {useAppDispatch} from '../../redux/stores';
import loadingSlice from '../../redux/slices/loading.ts';
import {SafeAreaView} from 'react-native-safe-area-context';

const popUpTypes = ['오픈 예정인 팝업', '운영 중인 팝업', '운영 종료 팝업'];
const orderTypes = ['오픈일순', '마감일순', '저장순'];

type MarkedDates = {
  [date: string]: {
    selected: boolean;
    marked?: boolean;
    selectedColor?: string;
    textColor?: string;
    dots?: Array<{color: string; selectedDotColor: string}>;
  };
};
import DividerLine from '../../components/DividerLine.tsx';
import InterestPopUpCard from '../../components/molecules/card/InterestPopUpCard.tsx';
import LoadingPoppinSvg from '../../assets/icons/loadingPoppin.svg';
import NotLogginBox from '../../components/NotLogginBox.tsx';
import ListIconSvg from '../../assets/icons/listIcon.svg';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Calendar} from 'react-native-calendars';
import Text20B from '../../styles/texts/title/Text20B.ts';
import Text24B from '../../styles/texts/headline/Text24B.ts';
import Text12B from '../../styles/texts/label/Text12B.ts';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import useGetInterestList from '../../hooks/useGetInterestList.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';

function LikesScreen() {
  const [isLoading, setLoading] = useState(false);
  // const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const [dates, setDates] = useState('');
  const isLoggedIn = true;

  const [selectedPopUpType, setSelectedPopUpType] = useState('');
  const [selectedOrderType, setSelectedOrderType] = useState('');

  const {
    data: interestList,
    loading: newInterestLoading,
    error: interestPopUpError,
  } = useGetInterestList();

  // 선택된 팝업 타입에 따른 필터링 로직
  const filteredInterestList = useMemo(() => {
    switch (selectedPopUpType) {
      case '오픈 예정인 팝업':
        return interestList?.filter(item => item.status.startsWith('D-'));
      case '운영 중인 팝업':
        return interestList?.filter(item => item.status === 'OPERATING');
      case '운영 종료 팝업':
        return interestList?.filter(item => item.status === 'TERMINATED');
      default:
        return interestList;
    }
  }, [interestList, selectedPopUpType]);

  const sortedInterestList = useMemo(() => {
    switch (selectedOrderType) {
      case '오픈일순':
        return [...filteredInterestList].sort(
          (a, b) => new Date(a.open_date) - new Date(b.open_date),
        );
      case '마감일순':
      case '저장순': // '저장순'이 '마감일순'과 동일하게 처리되어야 한다면 이와 같이 할 수 있습니다.
        return [...filteredInterestList].sort(
          (a, b) => new Date(a.close_date) - new Date(b.close_date),
        );
      default:
        return filteredInterestList;
    }
  }, [filteredInterestList, selectedOrderType]);

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

  if (!isLoggedIn) {
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
    </SafeAreaView>;
  }

  return isLoggedIn ? (
    <DismissKeyboardView>
      <SafeAreaView style={[{flex: 1}, {backgroundColor: globalColors.white}]}>
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
                  onSelect={selectedItem => {
                    setSelectedPopUpType(selectedItem);
                  }}
                  buttonWidth={150}
                  iconComponent={<DownBlackSvg />}
                  buttonTextAfterSelection={selectedItem => selectedItem}
                />
                <View style={{width: 100}} />
                <CustomSelectDropdown
                  buttonTextStyle={undefined}
                  data={orderTypes}
                  onSelect={selectedItem => {
                    setSelectedOrderType(selectedItem);
                  }}
                  buttonWidth={150}
                  iconComponent={<OrderSvg />}
                  buttonTextAfterSelection={selectedItem => selectedItem}
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
              <DividerLine height={1} />
              <View style={styles.listContainer}>
                {sortedInterestList?.length > 0 ? (
                  sortedInterestList?.map(item => (
                    <InterestPopUpCard
                      key={item.id}
                      image_url={item.image_url}
                      name={item.name}
                      close_date={item.close_date}
                      open_date={item.open_date}
                      status={item.status}
                      id={item.id}
                    />
                  ))
                ) : (
                  <Text style={styles.noItemsText}>
                    조건에 맞는 팝업이 없습니다.
                  </Text>
                )}
              </View>
              <DividerLine height={3} />
              <View />
            </View>
          )}
        </BottomSheetModalProvider>
      </SafeAreaView>
    </DismissKeyboardView>
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

  listContainer: {
    flex: 1,
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LikesScreen;
