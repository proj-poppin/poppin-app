/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import globalColors from "../../../styles/color/globalColors.ts";
import DateData from "react-native-calendars";
import { GetInterestPopUpListResponse } from "../../../types/PopUpListData.ts";
import { useNavigation } from "@react-navigation/native";
import { MarkedDates } from "react-native-calendars/src/types";
import FullCalendarComponent from "./FullCalendarComponent.tsx";
import NormalCalendarComponent from "./NormalCalendarComponent.tsx";
import DateTimePicker from "react-native-modal-datetime-picker";
import { addDots, checkIsClosed, createTodayDateData, formatDate, getTodayDate, setCircle } from "./calendarUtils.ts";
import BottomSheetItem from "./BottomSheetItem.tsx";


interface LikeCalendarComponentProps {
  data: GetInterestPopUpListResponse[] | null;
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

  // navigation
  const navigation = useNavigation();

  // useRef
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // useState
  const [snapIndex, setSnapIndex] = useState(0);
  const [selDate, setSelDate] = useState<DateData>(createTodayDateData()); // 캘린더 내부사용 포맷
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [calendarType, setCalendarType] = useState<CalendarType>(CalendarType.NORMAL)

  // useMemo
  const snapPoints = useMemo(() => ['43%', '80%'], []);

  // useCallbacks
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

  // variable
  const filteredData = data?.filter(item => !checkIsClosed(item.open_date, item.close_date, selDate));

  // useEffect
  useEffect(() => {
    bottomSheetModalRef.current?.present(snapIndex);
    setMarkedDates(createMarkedDates());
  }, []);

  function createMarkedDates() {
    const markedDates: MarkedDates = {};
    // 오픈, 마감 날짜 점찍기
    data?.forEach(e=> {
      addDots(markedDates, e);
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
                  renderItem={(props) => <BottomSheetItem item={props.item} navigation={navigation} />}>
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
