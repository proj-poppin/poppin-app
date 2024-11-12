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
        '갤러리 접근 권한 요청',
        '팝핀에서 프로필 사진 설정과 리뷰 작성, 제보하기 기능 사용시 필요한 사진 첨부 기능 사용을 위해 사진 라이브러리 접근 권한 동의가 필요합니다. 설정에서 이를 변경할 수 있습니다.',
        [
          {text: '다음에 하기', style: 'cancel'},
          {text: '설정 열기', onPress: () => Linking.openSettings()},
        ],
      );
    }
    return false;
  }
  return false;
}
