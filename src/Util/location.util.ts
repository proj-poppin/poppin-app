import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

// 지구 반지름 상수 (단위: km)
const EARTH_RADIUS_KM = 6371;
const DEGREES_PER_RADIAN = 57.29577951308232;

// 위치 권한 요청 함수
export async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('whenInUse');
    if (auth === 'granted') {
      return true;
    } else if (auth === 'denied') {
      Alert.alert(
        '위치 권한 요청',
        '앱에서 반경 50m 이내의 팝업스토어 방문 인증을 위해 위치 권한이 필요합니다. 설정에서 위치 권한을 허용해주세요.',
        [
          {text: '다음에 하기', style: 'cancel'},
          {text: '설정 열기', onPress: () => Linking.openURL('app-settings:')},
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

// 두 좌표 간의 거리 계산 함수 (단위: m)
export function calculateDistanceInMeters(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
): number {
  const lat1Radians = latitude1 / DEGREES_PER_RADIAN;
  const lon1Radians = longitude1 / DEGREES_PER_RADIAN;
  const lat2Radians = latitude2 / DEGREES_PER_RADIAN;
  const lon2Radians = longitude2 / DEGREES_PER_RADIAN;

  // haversine 공식 계산
  const deltaLatRadians = lat2Radians - lat1Radians;
  const deltaLonRadians = lon1Radians - lon1Radians;
  const a =
    Math.sin(deltaLatRadians / 2) ** 2 +
    Math.cos(lat1Radians) *
      Math.cos(lat2Radians) *
      Math.sin(deltaLonRadians / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInKm = EARTH_RADIUS_KM * c;

  // km를 m로 변환하여 반환
  return distanceInKm * 1000;
}
