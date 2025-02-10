import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
export async function requestGalleryPermissions() {
  if (Platform.OS === 'ios') {
    const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (result === RESULTS.GRANTED) {
      return true;
    }
    // 제한된 사진 접근 권한 시
    else if (result === RESULTS.LIMITED) {
      return true;
    }
    // 사진 권한기능이 없는경우 (simulator)
    else if (result === RESULTS.UNAVAILABLE){
      return true;
    }
    return false;
  } else if (Platform.OS === 'android') {
    const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (result === RESULTS.GRANTED) {
      return true;
    } else if(result === RESULTS.LIMITED){
      return true;
    }
    return false;
  }
  return false;
}
