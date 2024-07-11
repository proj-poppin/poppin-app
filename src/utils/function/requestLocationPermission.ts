import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export async function requestLocationPermission() {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('whenInUse');
    if (auth === 'granted') {
      return true;
    } else if (auth === 'denied') {
      Alert.alert(
        '위치 권한 요청',
        '팝핀에서 반경 50m 이내 팝업 스토어의 방문하기 인증시 필요한 정확한 위치 확인을 위해서 위치 권한이 필요합니다. 설정에서 위치 권한을 허용해주세요.',
        [
          {text: '다음에 하기', style: 'cancel'},
          {
            text: '설정 열기',
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
        title: '위치 권한',
        message: '앱에서 위치에 접근할 수 있어야 합니다.',
        buttonNeutral: '나중에 묻기',
        buttonNegative: '취소',
        buttonPositive: '확인',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
      return false;
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        '권한 거부됨',
        '위치 권한이 필요합니다. 앱 설정에서 위치 권한을 허용해주세요.',
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
