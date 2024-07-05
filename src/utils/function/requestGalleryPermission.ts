import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
export async function requestGalleryPermissions() {
  if (Platform.OS === 'ios') {
    const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (result === RESULTS.GRANTED) {
      return true;
    } else if (result === RESULTS.DENIED) {
      return false;
    } else if (result === RESULTS.BLOCKED) {
    }
    return false;
  } else if (Platform.OS === 'android') {
    const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (result === RESULTS.GRANTED) {
      return true;
    } else if (result === RESULTS.DENIED) {
      return false;
    } else if (result === RESULTS.BLOCKED) {
      Alert.alert(
        '갤러리 권한 거부됨',
        '갤러리 접근 권한이 필요합니다. 앱 설정에서 갤러리 접근 권한을 허용해주세요.',
        [
          {text: '취소', style: 'cancel'},
          {text: '설정 열기', onPress: () => Linking.openSettings()},
        ],
      );
    }
    return false;
  }
  return false;
}
