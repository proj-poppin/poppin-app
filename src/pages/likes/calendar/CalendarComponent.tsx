/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import globalColors from "../../../styles/color/globalColors.ts";
import { Calendar, DateData, ExpandableCalendar, CalendarList } from "react-native-calendars";
import { GetInterestPopUpListResponse } from "../../../types/PopUpListData.ts";
import InterestPopUpCard from "../../../components/molecules/card/InterestPopUpCard.tsx";
import DividerLine from "../../../components/DividerLine.tsx";
import { useNavigation } from "@react-navigation/native";
import { NewCalendarList } from "react-native-calendars/src";
import { MarkedDates } from "react-native-calendars/src/types";
import HeaderTitle from "./HeaderTitle.tsx";
import XDate from "xdate";
import FullCalendarComponent from "./FullCalendarComponent.tsx";
import NormalCalendarComponent from "./NormalCalendarComponent.tsx";
import DateTimePicker from "react-native-modal-datetime-picker";


interface LikeCalendarComponentProps {
  data: GetInterestPopUpListResponse[] | null;
  // getMarkedDates: any;
}

type DateData = {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
};

enum CalendarType {
  FULL,
  NORMAL
}

const CalendarComponent:React.FC<LikeCalendarComponentProps>  = ({data}) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation();

  // variables
  const snapPoints = useMemo(() => ['43%', '80%'], []);
  const [selDate, setSelDate] = useState<DateData>(createTodayDateData()); // 캘린더 내부사용 포맷
  const handleSnap = useCallback((index: number) => {
    console.log(`Snapped to index ${index}`);
  }, []);
  const [calendarType, setCalendarType] = useState<CalendarType>(CalendarType.NORMAL)
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [snapIndex, setSnapIndex] = useState(0);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  useEffect(() => {
    bottomSheetModalRef.current?.present(snapIndex);
    setMarkedDates(createMarkedDates());
  }, []);


  const filteredData = data?.filter(item => !checkIsClosed(item.open_date, item.close_date, selDate));

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    bottomSheetModalRef.current?.snapToIndex(0);
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index == -1) {
      setCalendarType(CalendarType.FULL);
    } else {
      setCalendarType(CalendarType.NORMAL);
    }
  }, []);

  function checkIsClosed(openDate:string, closeDate:string, selDate:DateData) {
    // openDate, closeDate, selDate를 Date 객체로 변환합니다.
    const open = new Date(openDate);
    const close = new Date(closeDate);
    const selected = new Date(selDate.dateString);
    return selected < open || selected > close;
  }

  function createTodayDateData(): DateData {
    const today = new Date(); // 현재 날짜 및 시간을 가져옵니다.

    return {
      dateString: today.toISOString().split('T')[0], // ISO 형식의 문자열로 변환하여 날짜 부분만 추출합니다.
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      timestamp: today.getTime(), // 밀리초 단위의 타임스탬프
    };
  }

  function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듭니다.
    const day = String(today.getDate()).padStart(2, '0'); // 일도 2자리로 만듭니다.
    return `${year}-${month}-${day}`;
  }

  function formatDate(dateString: string): string {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateString);
    const dayOfWeek = days[date.getDay()]; // 요일을 가져옵니다.

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 일일 월요일 형식으로 변환하여 반환합니다.
    return `${day}일 ${dayOfWeek}요일`;
  }


  type ItemData = {
    item: GetInterestPopUpListResponse;
  }
  const renderItem = ({item}:ItemData) => {


    return <View style={{flex:1, flexDirection:"column", backgroundColor:"white", borderWidth:0, marginBottom:2}}>

      <TouchableOpacity
        key={item.id}
        onPress={() => navigation.navigate('PopUpDetail', {id: item.id})}>
        <InterestPopUpCard
          key={item.id}
          image_url={item.image_url}
          name={item.name}
          close_date={item.close_date}
          open_date={item.open_date}
          status={item.status}
          id={item.id}
        />
      </TouchableOpacity>

      <DividerLine height={2} />
    </View>
  }

  function createMarkedDates() {

    const markedDates: MarkedDates = {};

    function addOpenDateDots(e: GetInterestPopUpListResponse) {
      if (!markedDates[e.open_date]) {
        markedDates[e.open_date] = {
          marked: true,
          dots: [
            { color: globalColors.purple, key:e.name},
          ],
        }
      } else {
        const dots: any = markedDates[e.open_date].dots
        if (!dots) {
          markedDates[e.open_date] = {
            marked: true,
            dots: [
              { color: globalColors.purple, key:e.name},
            ],
          }
        } else {
          switch (dots.length) {
            case 1:
              dots.push({ color: globalColors.blue, key:e.name })
              break;
            case 2:
              dots.push({ color: globalColors.purpleLight, key:e.name })
              break;
          }
        }
      }
    }

    function addCloseDateDots(e: GetInterestPopUpListResponse) {
      if (!markedDates[e.close_date]) {
        markedDates[e.close_date] = {
          marked: true,
          dots: [
            { color: globalColors.purple, key: e.name},
          ],
        }
      } else {
        const dots: any = markedDates[e.close_date].dots
        if (!dots) {
          markedDates[e.close_date] = {
            marked: true,
            dots: [
              { color: globalColors.purple, key: e.name},
            ],
          }
        } else {
          switch (dots.length) {
            case 1:
              dots.push({ color: globalColors.blue, key: e.name })
              break;
            case 2:
              dots.push({ color: globalColors.purpleLight, key: e.name })
              break;
          }
        }
      }
    }

    function setTodayMarking() {
      markedDates[getTodayDate()] = {
        selected: true,
        selectedColor: globalColors.purpleLight,
        selectedTextColor: globalColors.black,
        today: true
      };
    }

    function setSelectedMarking() {
      markedDates[selDate] = {
        selected: true,
        selectedColor: globalColors.purple,
        selectedTextColor: globalColors.white,
        // marked: true,

      };
    }

    // 오늘 날짜 마킹
    setTodayMarking();

    // 선택 날짜 마킹
    setSelectedMarking();

    // 오픈, 마감 날짜 점찍기
    data?.forEach(e=> {
      addOpenDateDots(e);
      addCloseDateDots(e);
    });

    return markedDates;
  }

  // renders
  return (
    <View style={{flex:1}}>

      {
        calendarType == CalendarType.NORMAL ?
        (<NormalCalendarComponent
            selDate={selDate}
            setSelDate={setSelDate}
            onClickHeaderTitle={(dateData) => {
              setIsDateTimePickerVisible(true);
            }}
            handlePresentModalPress={handlePresentModalPress}
            markedDates={markedDates}
            setMarkedDates={setMarkedDates}/>)
        :
        (<FullCalendarComponent
            selDate={selDate}
            setSelDate={setSelDate}
            onClickHeaderTitle={(dateData) => {
              setIsDateTimePickerVisible(true);
            }}
            popupList={data}
            handlePresentModalPress={handlePresentModalPress}
            markedDates={markedDates}
            setMarkedDates={setMarkedDates}/>)
      }
        <View style={{position:"absolute", bottom:'50%'}}>
          <DateTimePicker
            onConfirm={() => {}}
            onCancel={() => {setIsDateTimePickerVisible(false)}}
            display={"spinner"}
            mode={"date"}
            isVisible={isDateTimePickerVisible}
          />
        </View>

        <View style={styles.bottomSheetStyle}>
          <BottomSheetModal

            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}

          >
            <BottomSheetView>
              <View style={{flexDirection:'column'}}>
                <Text style={{marginLeft:16, marginBottom:12, fontSize:20, fontWeight:"600"}}>{(formatDate(selDate.dateString))}</Text>
                <FlatList
                  data={filteredData}
                  keyExtractor={(index) => index.toString()} // 각 아이템을 고유하게 식별하는 키 제공
                  renderItem={(props) => renderItem(props)}>
                </FlatList>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    height:'auto',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    // height:1000
    // alignItems: 'center',
  },
  bottomSheetStyle: {
    height:0
  }
});

export default CalendarComponent;
