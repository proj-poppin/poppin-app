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

const HomeHeader = () => {
  const [showInfo, setShowInfo] = useState(false);
  const isLoggedIn = useIsLoggedIn();
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
      navigation.navigate('Entry');
    }
  };

  return (
    <View style={styles.container}>
      <PoppinSvg />
      <View style={styles.iconsContainer}>
        <Pressable onPress={toggleInfo} style={styles.iconTouchable}>
          <InfoSvg style={{marginRight: 5}} />
        </Pressable>
        <Pressable style={[styles.iconTouchable]} onPress={handleAlarmPress}>
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
  iconTouchable: {
    marginRight: 5, // Adjust negative margin to reduce space between icons if needed
  },
  alarmStyle: {
    // Additional styles for AlarmOffSvg if needed
  },
  headerInfoSvg: {
    position: 'absolute',
    left: -230, // Adjust as needed
    top: 0,
    zIndex: 1, // Ensure it appears above other components
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    // Elevation for Android
    elevation: 3,
  },
});

export default HomeHeader;
