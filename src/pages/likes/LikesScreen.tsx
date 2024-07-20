import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useAppDispatch} from '../../redux/stores';
import loadingSlice from '../../redux/slices/loading';
import CalendarSvg from '../../assets/icons/calendar.svg';
import globalColors from '../../styles/color/globalColors';
import ListIconSvg from '../../assets/icons/listIcon.svg';
import useGetInterestList from '../../hooks/popUpList/useGetInterestList';
import Text24B from '../../styles/texts/headline/Text24B';
import ListView from './ListView';
import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn.tsx';
import ForLoginBox from '../../components/ForLoginBox.tsx';
import CalendarComponent from './calendar/CalendarComponent.tsx';
import NoSavedPopupsComponent from './NoSavedPopupComponent.tsx';
import refreshSlice from '../../redux/slices/refreshSlice';
import ToastComponent from '../../components/atoms/toast/ToastComponent.tsx';

const popUpTypes = ['오픈 예정인 팝업', '운영 중인 팝업', '운영 종료 팝업'];
const orderTypes = ['오픈일순', '마감일순', '저장순'];
type PopupType = '오픈 예정인 팝업' | '운영 중인 팝업' | '운영 종료 팝업';

function LikesScreen({navigation}) {
  const [selectedPopUpType, setSelectedPopUpType] =
    useState<PopupType>('운영 중인 팝업');
  const [selectedOrderType, setSelectedOrderType] =
    useState<string>('오픈일순');
  const [isCalendarView, setIsCalendarView] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isShowToast, setIsShowToast] = useState(false);

  const {data: interestList = [], refetch, loading} = useGetInterestList();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadingSlice.actions.setLoading({isLoading: true}));
    setTimeout(() => {
      dispatch(loadingSlice.actions.setLoading({isLoading: false}));
    }, 2000);
  }, [dispatch]);

  const toggleView = () => {
    setIsCalendarView(!isCalendarView);
  };

  const isLoggedIn = useIsLoggedIn();

  const handleRefresh = useCallback(() => {
    setSelectedPopUpType('운영 중인 팝업');
    refetch();
  }, [refetch]);

  useEffect(() => {
    dispatch(refreshSlice.actions.setOnRefresh(handleRefresh));
  }, [handleRefresh, dispatch]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsShowToast(true);
  };

  const filteredInterestList = useMemo(() => {
    if (!interestList) {
      return [];
    }

    switch (selectedPopUpType) {
      case '오픈 예정인 팝업':
        return interestList.filter(item => item.status === 'NOTYET');
      case '운영 중인 팝업':
        return interestList.filter(item => item.status === 'OPERATING');
      case '운영 종료 팝업':
        return interestList.filter(item => item.status === 'TERMINATED');
      default:
        return interestList;
    }
  }, [selectedPopUpType, interestList]);

  const sortedInterestList = useMemo(() => {
    let list = [...(filteredInterestList || [])];

    // Always sort by open_date first
    list.sort((a, b) => new Date(a.open_date) - new Date(b.open_date));

    switch (selectedOrderType) {
      case '마감일순':
        return list.sort(
          (a, b) => new Date(a.close_date) - new Date(b.close_date),
        );
      case '저장순':
        return list.sort((a, b) => b.saved_count - a.saved_count);
      default:
        return list;
    }
  }, [selectedOrderType, filteredInterestList]);

  const handlePress = () => {
    navigation.replace('Entry');
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={globalColors.purple} />
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ForLoginBox
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
      <ScrollView
        contentContainerStyle={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }>
        <NoSavedPopupsComponent />
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={[{flex: 1}, {marginBottom: 100}]}>
      <BottomSheetModalProvider>
        <View style={styles.header}>
          <Text style={[Text24B.text]}>팝업 목록</Text>
          <TouchableOpacity style={styles.iconButton} onPress={toggleView}>
            {isCalendarView ? (
              <ListIconSvg width={24} height={24} fill={globalColors.font} />
            ) : (
              <CalendarSvg width={24} height={24} fill={globalColors.font} />
            )}
          </TouchableOpacity>
        </View>
        {isCalendarView ? (
          <View style={{flex: 1}}>
            <CalendarComponent data={interestList} />
          </View>
        ) : (
          <>
            {isShowToast && (
              <View style={styles.toastContainer}>
                <ToastComponent
                  height={45}
                  onClose={() => setIsShowToast(false)}
                  message={toastMessage}
                />
              </View>
            )}
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={handleRefresh}
                />
              }>
              <ListView
                selectedPopUpType={selectedPopUpType}
                popUpTypes={popUpTypes}
                orderTypes={orderTypes}
                setSelectedPopUpType={setSelectedPopUpType}
                setSelectedOrderType={setSelectedOrderType}
                sortedInterestList={sortedInterestList.map(item => ({
                  ...item,
                  isInterested: true, // Ensure all items from the interest list are marked as interested
                }))}
                onRefresh={handleRefresh}
                showToast={showToast} // Pass showToast prop
              />
            </ScrollView>
          </>
        )}
      </BottomSheetModalProvider>
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
  toastContainer: {
    position: 'absolute',
    top: 60, // Adjust the position as needed
    width: '100%',
    alignItems: 'center',
    zIndex: 999, // Ensure the toast is on top of other elements
  },
});
export default LikesScreen;
