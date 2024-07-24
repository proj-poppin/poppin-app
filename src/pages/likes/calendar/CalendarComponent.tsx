import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import globalColors from '../../../styles/color/globalColors.ts';
import {GetInterestPopUpListResponse} from '../../../types/PopUpListData.ts';
import {useNavigation} from '@react-navigation/native';
import {MarkedDates} from 'react-native-calendars/src/types';
import FullCalendarComponent from './FullCalendarComponent';
import {
  addDots,
  checkIsClosed,
  createDate,
  createDateData,
  createTodayDateData,
  formatDate,
  setCircle,
} from './calendarUtils.ts';
import BottomSheetItem from './BottomSheetItem';
import NoItemComponent from './NoItemComponent';
import UpButton from '../../../assets/likes/upButtonBlue.svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useReducedMotion} from 'react-native-reanimated';
import {NormalCalendarComponent} from './NormalCalendarComponent.tsx';
import useIsLoggedIn from '../../../hooks/auth/useIsLoggedIn.tsx';

console.log('Imports loaded');

interface LikeCalendarComponentProps {
  data: GetInterestPopUpListResponse[] | null;
  showToast: (message: string) => void;
  onRefresh: () => void;
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
  NORMAL,
}

const CalendarComponent: React.FC<LikeCalendarComponentProps> = ({
  data,
  showToast,
  onRefresh,
}) => {
  const isLoggedIn = useIsLoggedIn();
  console.log('CalendarComponent rendered');
  const navigation = useNavigation();
  const [snapIndex, setSnapIndex] = useState(0);
  const [selDate, setSelDate] = useState<DateData>(createTodayDateData());
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [calendarType, setCalendarType] = useState<CalendarType>(
    CalendarType.NORMAL,
  );
  const reducedMotion = useReducedMotion();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const dateTimePickerYearMonthRef = useRef<string>(null);
  const bottomModalDateRef = useRef<DateData>(selDate);
  const snapPoints = useMemo(() => ['40%', '85%'], []);

  const handlePresentModalPress = useCallback(() => {
    console.log('Present Modal Press');
    bottomSheetModalRef.current?.present();
    bottomSheetModalRef.current?.snapToIndex(0);
    setCalendarType(CalendarType.NORMAL);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('Sheet Changes:', index);
    if (index == -1) {
      setCalendarType(CalendarType.FULL);
    } else {
      setCalendarType(CalendarType.NORMAL);
    }
  }, []);

  const createMarkedDates = useCallback(() => {
    const markedDates: MarkedDates = {};
    setCircle(markedDates, selDate.dateString);
    data?.forEach(e => {
      addDots(markedDates, e);
    });
    console.log('Created Marked Dates:', markedDates);
    return markedDates;
  }, [data, selDate]);

  const filteredData = useMemo(() => {
    return data?.filter(
      item => !checkIsClosed(item.open_date, item.close_date, selDate),
    );
  }, [data, selDate]);

  useEffect(() => {
    bottomModalDateRef.current = selDate;
    bottomSheetModalRef.current?.present(snapIndex);
    setMarkedDates(createMarkedDates());
    console.log('useEffect triggered');
  }, [selDate, snapIndex, createMarkedDates]);

  return (
    <View style={{flex: 1}}>
      {calendarType === CalendarType.NORMAL ? (
        <NormalCalendarComponent
          selDate={selDate}
          setSelDate={setSelDate}
          dateTimePickerYearMonthRef={dateTimePickerYearMonthRef}
          onClickHeaderTitle={dateData => {
            setIsDateTimePickerVisible(true);
          }}
          handlePresentModalPress={handlePresentModalPress}
          markedDates={markedDates}
          setMarkedDates={setMarkedDates}
        />
      ) : (
        <FullCalendarComponent
          selDate={selDate}
          setSelDate={setSelDate}
          dateTimePickerYearMonthRef={dateTimePickerYearMonthRef}
          onClickHeaderTitle={dateData => {
            setIsDateTimePickerVisible(true);
          }}
          popupList={data}
          handlePresentModalPress={handlePresentModalPress}
          markedDates={markedDates}
          setMarkedDates={setMarkedDates}
          onRefresh={onRefresh}
        />
      )}
      <View style={{position: 'absolute', bottom: '50%'}}>
        <DateTimePickerModal
          date={createDate(
            bottomModalDateRef.current.year,
            bottomModalDateRef.current.month - 1,
            bottomModalDateRef.current.day,
          )}
          locale={'ko'}
          customHeaderIOS={props => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.bottomModalTitleText}>
                  {dateTimePickerYearMonthRef.current}
                </Text>
                <UpButton />
              </View>
            );
          }}
          onChange={newDate => {
            bottomModalDateRef.current = createDateData(
              newDate.getFullYear(),
              newDate.getMonth(),
              newDate.getDate() + 1,
            );
          }}
          customCancelButtonIOS={props => {
            return <View />;
          }}
          customConfirmButtonIOS={props => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 14.87,
                }}>
                <TouchableOpacity
                  style={{flex: 1, height: 42}}
                  onPress={() => {
                    setIsDateTimePickerVisible(false);
                  }}>
                  <Text style={styles.bottomModalButtonTextCancel}>취소</Text>
                </TouchableOpacity>

                <View
                  style={{
                    width: 2,
                    height: 20,
                    backgroundColor: globalColors.warmGray2,
                  }}
                />

                <TouchableOpacity
                  style={{flex: 1, height: 42}}
                  onPress={() => {
                    setIsDateTimePickerVisible(false);
                    setSelDate(bottomModalDateRef.current);
                    setMarkedDates(createMarkedDates());
                  }}>
                  <Text style={styles.bottomModalButtonTextConfirm}>확인</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          onConfirm={() => {}}
          onCancel={() => {}}
          display={'spinner'}
          mode={'date'}
          isVisible={isDateTimePickerVisible}
        />
      </View>

      <View style={styles.bottomSheetStyle}>
        <BottomSheetModal
          animateOnMount={reducedMotion}
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleStyle={{
            borderTopWidth: 1,
            borderTopColor: globalColors.warmGray,
          }}
          handleIndicatorStyle={{
            backgroundColor: globalColors.font,
            width: 56,
          }}>
          <BottomSheetView>
            <View style={{flexDirection: 'column', marginBottom: 160}}>
              <Text
                style={{
                  marginLeft: 16,
                  marginBottom: 12,
                  fontSize: 20,
                  fontWeight: '600',
                }}>
                {formatDate(selDate.dateString)}
              </Text>
              {filteredData?.length == 0 ? (
                <NoItemComponent />
              ) : (
                <FlatList
                  data={filteredData}
                  renderItem={({item, index}) => (
                    <BottomSheetItem
                      key={`${item.id}-${index}`}
                      item={item}
                      navigation={navigation}
                      showToast={showToast}
                      isLoggedIn={isLoggedIn}
                    />
                  )}
                />
              )}
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
    height: 'auto',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  bottomSheetStyle: {
    height: 0,
  },
  bottomModalTitleText: {
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 19.2,
    color: globalColors.blue,
    marginRight: 2,
  },
  bottomModalButtonTextCancel: {
    color: globalColors.font,
    fontSize: 16,
    fontWeight: '600',
    padding: 12,
    textAlign: 'center',
  },
  bottomModalButtonTextConfirm: {
    color: globalColors.blue,
    fontSize: 16,
    fontWeight: '600',
    padding: 12,
    textAlign: 'center',
  },
});

export default CalendarComponent;
