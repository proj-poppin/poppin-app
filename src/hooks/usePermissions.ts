import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

function usePermissions() {
  useEffect(() => {
    const checkAndRequestLocationPermission = async () => {
      try {
        const locationPermission =
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            : PERMISSIONS.IOS.LOCATION_ALWAYS;

        const result = await check(locationPermission);
        console.log('check location', result);

        if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
          Alert.alert(
            '위치 권한 필요',
            '팝핀 위치 확인을 위해서 위치 권한이 필요합니다. 설정에서 위치 권한을 허용해주세요.',
            [
              {
                text: '예',
                onPress: () => Linking.openSettings(),
              },
              {
                text: '아니요',
                onPress: () => console.log('아니요 버튼 누름'),
                style: 'cancel',
              },
            ],
          );
        } else if (result === RESULTS.UNAVAILABLE) {
          console.error('위치 권한을 사용할 수 없습니다.');
        } else if (result === RESULTS.LIMITED) {
          await request(locationPermission);
        }
      } catch (error) {
        console.error('위치 권한 확인 중 오류 발생:', error);
      }
    };

    const checkAndRequestGalleryPermission = async () => {
      try {
        const galleryPermission =
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
            : PERMISSIONS.IOS.PHOTO_LIBRARY;

        const result = await check(galleryPermission);
        console.log('check gallery', result);

        if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
          Alert.alert(
            '갤러리 권한 필요',
            '팝핀 갤러리 접근을 위해서 갤러리 권한이 필요합니다. 설정에서 갤러리 권한을 허용해주세요.',
            [
              {
                text: '예',
                onPress: () => Linking.openSettings(),
              },
              {
                text: '아니요',
                onPress: () => console.log('아니요 버튼 누름'),
                style: 'cancel',
              },
            ],
          );
        } else if (result === RESULTS.UNAVAILABLE) {
          console.error('갤러리 권한을 사용할 수 없습니다.');
        } else if (result === RESULTS.LIMITED || result === RESULTS.GRANTED) {
          await request(galleryPermission);
        }
      } catch (error) {
        console.error('갤러리 권한 확인 중 오류 발생:', error);
      }
    };

    checkAndRequestLocationPermission();
    checkAndRequestGalleryPermission();
  }, []);
}

export default usePermissions;
