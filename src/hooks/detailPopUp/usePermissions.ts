import {useState, useEffect} from 'react';
import {PermissionsAndroid, Alert, Platform, Linking} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

async function requestPermissions() {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('whenInUse');
    if (auth === 'granted') {
      return true;
    } else if (auth === 'denied') {
      Alert.alert(
        'Permission Denied',
        'Location permission is required. Please enable it in the app settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open Settings',
            onPress: () => Linking.openURL('app-settings:'),
          },
        ],
      );
    }
    return false;
  } else if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'App needs access to your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
      // User denied permission without checking 'Don't ask again'
      return false;
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      // User denied permission and checked 'Don't ask again'
      Alert.alert(
        'Permission Denied',
        'Location permission is required. Please enable it in the app settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => Linking.openSettings()},
        ],
      );
    }
    return false;
  }
  return false;
}

export default requestPermissions;
