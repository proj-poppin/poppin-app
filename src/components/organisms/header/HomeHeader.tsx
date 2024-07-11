import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import PoppinSvg from '../../../assets/icons/poppin.svg';
import AlarmOffSvg from '../../../assets/icons/alarmOff.svg';
import HeaderInfoSvg from '../../../assets/icons/headerInfo.svg';
import InfoSvg from '../../../assets/icons/info.svg';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {EntryScreenNavigationProp} from '../../HomeLoginHeader';
import useIsLoggedIn from '../../../hooks/auth/useIsLoggedIn.tsx';
import useGetAlarmStatus from '../../../hooks/alarm/useGetAlarmStatus.ts';
import TwoSelectConfirmationModal from '../../TwoSelectConfirmationModal.tsx';

const HomeHeader = () => {
  const [showInfo, setShowInfo] = useState(false);
  const isLoggedIn = useIsLoggedIn();
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // 알람 빨간점 불러오기
  const {alarmStatus, fetchAlarmStatus} = useGetAlarmStatus();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfo(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const toggleInfo = () => {
    setShowInfo(prev => !prev);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAlarmStatus().then();
      return () => {
        // Cleanup if needed
      };
    }, [fetchAlarmStatus]),
  );

  const navigation = useNavigation<EntryScreenNavigationProp>();

  const handleAlarmPress = () => {
    if (isLoggedIn) {
      navigation.navigate('Alarm');
    } else {
      setAlertMessage('알람을 보려면 로그인이 필요합니다.');
      setLoginModalVisible(true);
    }
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <PoppinSvg />
      <View style={styles.iconsContainer}>
        <Pressable onPress={toggleInfo} style={styles.infoTouchable}>
          <InfoSvg style={{marginRight: 5}} />
        </Pressable>
        <Pressable style={[styles.alarmTouchable]} onPress={handleAlarmPress}>
          <View>
            <AlarmOffSvg style={styles.alarmStyle} />
            {alarmStatus ? (
              <View
                style={{
                  position: 'absolute',
                  right: -2,
                  top: -2,
                  width: 6,
                  height: 6,
                  borderRadius: 5,
                  backgroundColor: 'red',
                }}
              />
            ) : null}
          </View>
        </Pressable>
        {showInfo && <HeaderInfoSvg style={styles.headerInfoSvg} />}
      </View>
      <TwoSelectConfirmationModal
        isVisible={loginModalVisible}
        onClose={closeLoginModal}
        onConfirm={() => {
          navigation.navigate('Entry');
          closeLoginModal();
        }}
        mainAlertTitle="로그인이 필요합니다"
        subAlertTitle={alertMessage}
        selectFirstText="나중에 할래요"
        selectSecondText="로그인하기"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row', // Arrange icons in a row
    alignItems: 'center',
  },
  infoTouchable: {
    marginRight: 10,
  },
  alarmTouchable: {
    marginRight: 5,
  },
  alarmStyle: {
    // Additional styles for AlarmOffSvg if needed
  },
  headerInfoSvg: {
    position: 'absolute',
    left: -235,
    top: -4,
    zIndex: 1,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
});
export default HomeHeader;
