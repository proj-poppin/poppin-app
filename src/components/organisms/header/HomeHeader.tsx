import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import PoppinSvg from '../../../assets/icons/poppin.svg';
import AlarmOffSvg from '../../../assets/icons/alarmOff.svg';
import HeaderInfoSvg from '../../../assets/icons/headerInfo.svg';
import InfoSvg from '../../../assets/icons/info.svg';
import {useNavigation} from '@react-navigation/native';
import {EntryScreenNavigationProp} from '../../HomeLoginHeader';
import useIsLoggedIn from '../../../hooks/auth/useIsLoggedIn.tsx';

const HomeHeader = () => {
  const [showInfo, setShowInfo] = useState(false);
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfo(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const toggleInfo = () => {
    setShowInfo(prev => !prev);
  };

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
          <InfoSvg style={{marginRight: 20}} />
        </Pressable>
        <AlarmOffSvg style={styles.alarmStyle} onPress={handleAlarmPress} />
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
    marginRight: -10, // Adjust negative margin to reduce space between icons if needed
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
