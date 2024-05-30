import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useAppDispatch} from '../../redux/stores';
import loadingSlice from '../../redux/slices/loading';
import CalendarSvg from '../../assets/icons/calendar.svg';
import globalColors from '../../styles/color/globalColors';
import ListIconSvg from '../../assets/icons/listIcon.svg';
import useGetInterestList from '../../hooks/popUpList/useGetInterestList';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import Text24B from '../../styles/texts/headline/Text24B';
import CalendarView from './CalendarView';
import ListView from './ListView';
import NoLikesSvg from '../../assets/likes/noLikes.svg';
import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn.tsx';
import NotLogginBox from '../../components/NotLogginBox.tsx';
import {useFocusEffect} from '@react-navigation/native';
import LikeCalendarView from './LikeCalendarView.tsx';

const popUpTypes = ['오픈 예정인 팝업', '운영 중인 팝업', '운영 종료 팝업'];
const orderTypes = ['오픈일순', '마감일순', '저장순'];

function LikesScreen({navigation}) {
  const [selectedPopUpType, setSelectedPopUpType] = useState<string>('');
  const [selectedOrderType, setSelectedOrderType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Record<string, any>>({});
  const [isCalendarView, setIsCalendarView] = useState(false);

  const {data: interestList, refetch} = useGetInterestList();

  useFocusEffect(
    useCallback(() => {
      refetch();
      dispatch(loadingSlice.actions.setLoading({isLoading: true}));
      setTimeout(() => {
        dispatch(loadingSlice.actions.setLoading({isLoading: false}));
      }, 2000);
    }, [dispatch, refetch]),
  );

  const dispatch = useAppDispatch();

  const handleDateSelected = (day: any) => {
    setSelectedDate({
      [day.dateString]: {selected: true, marked: true},
    });
  };
  const handleRefetch = () => {
    refetch();
  };

  const renderBottomSheetContent = () => (
    <View style={styles.bottomSheetContent}>
      <View style={styles.titleContainer}>
        <Text style={Text24B.text}>{Object.keys(selectedDate)[0]} Events</Text>
      </View>
      {/* Add more content as needed */}
    </View>
  );

  const getMarkedDates = () => {
    const today = new Date().toISOString().split('T')[0];

    let markedDates = {
      ...selectedDate,
      [today]: {
        selectedDate: true,
        textColor: 'black',
        selectedColor: globalColors.purpleLight,
        // selected: true,
        // dots: [
        //   {color: globalColors.blue, selectedDotColor: globalColors.blue},
        //   {color: globalColors.purple, selectedDotColor: globalColors.purple},
        //   {color: globalColors.white, selectedDotColor: globalColors.white},
        // ],
      },
    };

    markedDates[selectedDate] = {
      selected: true,
      selectedColor: globalColors.purple,
      textColor: globalColors.white,
    };

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
  const isLoggedIn = useIsLoggedIn();
  useEffect(() => {
    dispatch(loadingSlice.actions.setLoading({isLoading: true}));
    setTimeout(() => {
      dispatch(loadingSlice.actions.setLoading({isLoading: false}));
    }, 2000);
  }, [dispatch]);

  const filteredInterestList = useMemo(() => {
    switch (selectedPopUpType) {
      case '오픈 예정인 팝업':
        return interestList?.filter(item => item.status === 'D-N');
      case '운영 중인 팝업':
        return interestList?.filter(item => item.status === 'OPERATING');
      case '운영 종료 팝업':
        return interestList?.filter(item => item.status === 'TERMINATED');
      default:
        return interestList;
    }
  }, [selectedPopUpType, interestList]);

  const sortedInterestList = useMemo(() => {
    switch (selectedOrderType) {
      case '오픈일순':
        return filteredInterestList?.sort(
          (a, b) =>
            new Date(a.open_date).getTime() - new Date(b.open_date).getTime(),
        );
      case '마감일순':
        return filteredInterestList?.sort(
          (a, b) =>
            new Date(a.close_date).getTime() - new Date(b.close_date).getTime(),
        );
      case '저장순':
        return filteredInterestList?.sort(
          (a, b) => b.saved_count - a.saved_count,
        );
      default:
        return filteredInterestList;
    }
  }, [selectedOrderType, filteredInterestList]);

  const handlePress = () => {
    navigation.replace('Entry');
  };

  if (!isLoggedIn) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <NotLogginBox
          text1={'로그인하고'}
          text2={'팝업 추천을 받아보세요!'}
          buttonText={'로그인 하러 가기'}
          onPress={handlePress}
          isNeedBox={false}
          isNeedSvg={true}
        />
      </View>
    );
  }

  if (isLoggedIn && interestList?.length === 0) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={[Text24B.text]}>관심 목록</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <NoLikesSvg />
          <View>
            <Text style={styles.text}>
              {'저장한 팝업이 없어요🫤'} {'\n'}
              {'관심있는 팝업을 저장해 보세요.'}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <DismissKeyboardView>
        <BottomSheetModalProvider>
          <View style={styles.header}>
            <Text style={[Text24B.text]}>관심 목록</Text>
            <TouchableOpacity style={styles.iconButton} onPress={toggleView}>
              {isCalendarView ? (
                <ListIconSvg width={24} height={24} fill={globalColors.font} />
              ) : (
                <CalendarSvg width={24} height={24} fill={globalColors.font} />
              )}
            </TouchableOpacity>
          </View>
          {isCalendarView ? (
            <LikeCalendarView />
            // <CalendarView
            //   selectedDate={selectedDate}
            //   getMarkedDates={getMarkedDates}
            //   handleDateSelected={handleDateSelected}
            //   renderBottomSheetContent={renderBottomSheetContent}
            // />
          ) : (
            <ListView
              popUpTypes={popUpTypes}
              orderTypes={orderTypes}
              setSelectedPopUpType={setSelectedPopUpType}
              setSelectedOrderType={setSelectedOrderType}
              sortedInterestList={sortedInterestList}
            />
          )}
        </BottomSheetModalProvider>
      </DismissKeyboardView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  iconButton: {
    padding: 8,
  },
  bottomSheetContent: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Pretandard-Semibold',
    fontWeight: '600',
    marginBottom: 20,
  },
});

export default LikesScreen;
