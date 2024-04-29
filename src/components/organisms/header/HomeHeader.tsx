import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PoppinSvg from '../../../assets/icons/poppin.svg';
import AlarmOffSvg from '../../../assets/icons/alarmOff.svg';
import HeaderInfoSvg from '../../../assets/icons/headerInfo.svg';
import InfoSvg from '../../../assets/icons/info.svg';

const HomeHeader = () => {
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Automatically show the HeaderInfoSvg for 5 seconds when the component mounts
    const timer = setTimeout(() => {
      setShowInfo(false);
    }, 6000);

    // Return a cleanup function that clears the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const toggleInfo = () => {
    setShowInfo(prev => !prev); // Toggle the visibility of HeaderInfoSvg
  };

  return (
    <View style={styles.container}>
      <PoppinSvg />
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={toggleInfo} style={styles.iconTouchable}>
          <InfoSvg style={{marginRight: 20}} />
        </TouchableOpacity>
        <AlarmOffSvg style={styles.alarmStyle} />
        {showInfo && <HeaderInfoSvg style={styles.headerInfoSvg} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
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
