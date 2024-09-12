import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import {debounce} from 'lodash';
import Text10B from '../../styles/texts/body_small/Text10B.ts';
import Text12M from '../../styles/texts/label/Text12M.ts';
import NoSavedPopupsComponentZero from './NoSavedPopupComponentZero.tsx';

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
    });
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
    console.log('UseEffect handleRefresh');
    dispatch(refreshSlice.actions.setOnRefresh(handleRefresh));
  }, [handleRefresh, dispatch]);

  const showToast = useMemo(
    () =>
      debounce((message: string) => {
        console.log('Show Toast:', message);
        setToastMessage(message);
        setIsShowToast(true);
      }, 300),
    [],
  );

  const filteredInterestList = useMemo(() => {
    console.log('Filter Interest List');
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
    console.log('Sort Interest List');
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
    console.log('Handle Press');
    navigation.replace('Entry');
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={globalColors.purple} />
      </View>
    );
  }

  if (!isLoggedIn && !loading) {
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
        <NoSavedPopupsComponentZero />
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={[{flex: 1}, {marginBottom: 100}]}>
      <BottomSheetModalProvider>
        <View style={styles.header}>
          <Text style={[Text24B.text]}>관심 팝업</Text>
          <TouchableOpacity style={styles.iconButton} onPress={toggleView}>
            <View style={styles.iconWithText}>
              {isCalendarView ? (
                <>
                  <Text
                    style={[Text12M.text, styles.iconText, {marginRight: 5}]}>
                    리스트 보기
                  </Text>
                  <ListIconSvg
                    width={24}
                    height={24}
                    fill={globalColors.font}
                  />
                </>
              ) : (
                <>
                  <Text
                    style={[Text12M.text, styles.iconText, {marginRight: 5}]}>
                    캘린더 보기
                  </Text>
                  <CalendarSvg
                    width={24}
                    height={24}
                    fill={globalColors.font}
                  />
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {isCalendarView ? (
          <View style={{flex: 1}}>
            <CalendarComponent
              data={interestList}
              showToast={showToast}
              onRefresh={handleRefresh}
            />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
            }>
            <ListView
              isFiltering={true}
              selectedPopUpType={selectedPopUpType}
              popUpTypes={popUpTypes}
              orderTypes={orderTypes}
              setSelectedPopUpType={setSelectedPopUpType}
              setSelectedOrderType={setSelectedOrderType}
              sortedInterestList={sortedInterestList.map(item => ({
                ...item,
                isInterested: true,
              }))}
              onRefresh={handleRefresh}
              showToast={showToast}
            />
          </ScrollView>
        )}
        {isShowToast && (
          <View style={styles.toastContainer}>
            <ToastComponent
              height={45}
              onClose={() => setIsShowToast(false)}
              message={toastMessage}
            />
          </View>
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
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 2,
    color: globalColors.blue,
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
    top: 60,
    width: '100%',
    alignItems: 'center',
    zIndex: 999,
  },
});
export default LikesScreen;
