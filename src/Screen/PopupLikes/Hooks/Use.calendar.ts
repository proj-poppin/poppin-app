import {useState, useRef, useMemo} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Dimensions, Animated, PanResponder} from 'react-native';
import {usePopupLikesLandingScreenStore} from '../Zustand/PopupLikes.landing.zustand';
import {usePopupStore} from '../../../Zustand/Popup/popup.zustand';
import {moderateScale} from 'src/Util';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const useCalendar = () => {
  const {calendarCells, calendarYear, calendarMonth, moveMonth, setYearMonth} =
    usePopupLikesLandingScreenStore();
  const {interestedPopupStores} = usePopupStore();

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  
  useFocusEffect(() => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDate = `${todayYear}-${String(todayMonth).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
    // 현재 상태가 오늘 날짜와 다를 때만 업데이트
    if (
      selectedYear !== todayYear ||
      selectedMonth !== todayMonth ||
      selectedDate !== todayDate
    ) {
      setSelectedYear(todayYear);
      setSelectedMonth(todayMonth);
      setSelectedDate(todayDate);
      setYearMonth(todayYear, todayMonth);
    }
  });

  const navigation = useNavigation<NavigationProp<AppStackProps>>();
  const formattedMonth =
    calendarMonth < 10 ? `0${calendarMonth}` : `${calendarMonth}`;

  // 애니메이션 관련 상태
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT * 0.7)).current;

  const POSITIONS = {
    TOP: SCREEN_HEIGHT * 0.15,
    MIDDLE: SCREEN_HEIGHT * 0.7,
    BOTTOM: SCREEN_HEIGHT * 0.9,
  };

  const cellHeight = translateY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.7, SCREEN_HEIGHT],
    outputRange: [moderateScale(30), moderateScale(50), moderateScale(60)],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, {moveY}) => {
        translateY.setValue(Math.min(SCREEN_HEIGHT, Math.max(0, moveY)));
      },
      onPanResponderRelease: (_, {moveY}) => {
        const topThreshold = SCREEN_HEIGHT * 0.35;
        const bottomThreshold = SCREEN_HEIGHT * 0.8;
        const targetPosition =
          moveY < topThreshold
            ? POSITIONS.TOP
            : moveY > bottomThreshold
            ? POSITIONS.BOTTOM
            : POSITIONS.MIDDLE;

        Animated.spring(translateY, {
          toValue: targetPosition,
          useNativeDriver: false,
          tension: 50,
          friction: 12,
        }).start();
      },
    }),
  ).current;

  const swipeResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onMoveShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderRelease: (_, {dx}) => {
        if (dx < -30) {
          moveMonth('FORWARD');
        } else if (dx > 30) {
          moveMonth('BACKWARD');
        }
      },
    }),
  ).current;

  const filteredPopups = useMemo(() => {
    return (
      selectedDate
        ? interestedPopupStores.map(popup => {
            const openDate = popup.openDate.split('T')[0];
            const closeDate = popup.closeDate.split('T')[0];

            let dDayType: string | null = null;
            if (selectedDate === openDate) dDayType = '오픈 D-day';
            if (selectedDate === closeDate) dDayType = '마감 D-day';

            return {...popup, dDayType};
          })
        : interestedPopupStores || []
    ) as (PopupSchema & {dDayType?: string})[];
  }, [interestedPopupStores, selectedDate]);

  // 날짜 선택 핸들러
  const handleDateClick = (dateString: string) => {
    setSelectedDate(dateString);
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT * 0.7,
      useNativeDriver: false,
    }).start();
  };

  // 날짜 선택 모달 관리
  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  const handleConfirm = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setYearMonth(year, month);
    hideDatePicker();
  };

  const getTodayDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const handlePressCard = (id: string) => {
    navigation.navigate('PopupDetailScreen', {popupId: id});
  };

  return {
    calendarYear,
    calendarMonth,
    calendarCells,
    moveMonth,
    selectedYear,
    selectedMonth,
    selectedDate,
    setSelectedDate,
    swipeResponder,
    filteredPopups,
    handleDateClick,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    isDatePickerVisible,
    translateY,
    panResponder,
    cellHeight,
    getTodayDate,
    handlePressCard,
    formattedMonth,
  };
};
