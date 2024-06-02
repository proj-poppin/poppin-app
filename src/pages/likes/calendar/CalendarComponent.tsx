/* eslint-disable */
import React, { useCallback, useMemo, useRef, useState } from "react";
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
  const snapPoints = useMemo(() => ['45%', '80%'], []);
  const [selDate, setSelDate] = useState<string>(getTodayDate()); // 캘린더 내부사용 포맷
  const handleSnap = useCallback((index: number) => {
    console.log(`Snapped to index ${index}`);
  }, []);
  const [calendarType, setCalendarType] = useState<CalendarType>(CalendarType.NORMAL)


  const filteredData = data?.filter(item => !checkIsClosed(item.open_date, item.close_date, selDate));

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index == -1) {
      setCalendarType(CalendarType.FULL);
    } else {
      setCalendarType(CalendarType.NORMAL);
    }
  }, []);

  function checkIsClosed(openDate:string, closeDate:string, selDate:string) {
    // openDate, closeDate, selDate를 Date 객체로 변환합니다.
    const open = new Date(openDate);
    const close = new Date(closeDate);
    const selected = new Date(selDate);
    return selected < open || selected > close;
  }

  function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듭니다.
    const day = String(today.getDate()).padStart(2, '0'); // 일도 2자리로 만듭니다.
    return `${year}-${month}-${day}`;
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

  const createMarkedDates = () => {
    const markedDates: MarkedDates = {};

    function addOpenDateDots(e: GetInterestPopUpListResponse) {
      if (!markedDates[e.open_date]) {
        markedDates[e.open_date] = {
          marked: true,
          dots: [
            { color: globalColors.purple, key: e.name},
          ],
        }
      } else {
        const dots: any = markedDates[e.open_date].dots
        if (!dots) {
          markedDates[e.open_date] = {
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
    <View style={{flex:1, backgroundColor:'green'}}>

      {
        calendarType == CalendarType.NORMAL ?
        (<NormalCalendarComponent
            data={data}
            handlePresentModalPress={handlePresentModalPress}/>)
        :
        (<FullCalendarComponent
            popupList={data}
            handlePresentModalPress={handlePresentModalPress}
            markedDates={createMarkedDates()}/>)
      }
        <View style={styles.bottomSheetStyle}>
          <BottomSheetModal

            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}

          >
            <BottomSheetView>
              <View style={{flexDirection:'column'}}>
                {/*<Text style={{marginLeft:16, marginTop:26, fontSize:20, fontWeight:"600"}}>{formatDateToKorean(selDate)}</Text>*/}
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
    backgroundColor: 'grey',
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
