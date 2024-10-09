import {PermissionsAndroid, Platform, Rationale} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

/**
 * 안드로이드 핸드폰에 CAMERA Permission을 요청하는 함수입니다.
 * @returns <요청 성공 여부: boolean>
 * @author 도형
 */
export const requestCameraPermissionFromAndroid = async (param?: {
  requestRationale?: Rationale;
}) => {
  try {
    const permissionRequestResult = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: '픽플리에서 카메라/갤러리에 접근할 수 있도록 허용해주세요',
        message: '권한을 허용하고 투표를 더 풍성하게 만들어보세요!',
        buttonPositive: '좋아요',
        buttonNeutral: '나중에 할게요',
        buttonNegative: '아니요',
        ...param?.requestRationale,
      },
    );
    if (permissionRequestResult === PermissionsAndroid.RESULTS.GRANTED) {
      // console.log('Camera permission given');
      return true;
    } else {
      // console.log('Camera permission denied');
      return false;
    }
  } catch (err) {
    // console.warn(err);
    return false;
  }
};

/**
 * 사용자 핸드폰에서 사진을 가져오는 함수입니다.
 *
 * @param param.limit 가져올 사진의 개수를 제한합니다. 값이 존재하지 않는 경우 제한이 없습니다.
 * @param param.requestRationale 권한이 허용되지 않았을 경우 사용자에게 보여줄 권한 요청 창에 표시될 정보
 *
 * @returns Promise<ImagePickerResponse> | undefined
 * @author 원제
 * @author 도형
 */
export const getGalleryImages = async (param?: {
  sectionLimit?: number;
  requestRationale?: Rationale;
}) => {
  try {
    //* 먼저 권한을 확인합니다.
    let permission = false;

    if (Platform.OS === 'android') {
      if (
        //* 이미 권한이 허용되어 있거나, 권한 요청에 성공했다면
        (await PermissionsAndroid.check('android.permission.CAMERA')) ||
        (await requestCameraPermissionFromAndroid({
          requestRationale: param?.requestRationale,
        }))
      ) {
        permission = true;
      }
    }
    if (Platform.OS === 'ios') {
      permission = true;
    }

    if (!permission) {
      return;
    }
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: param?.sectionLimit ?? 1,
      // includeBase64: true,
    });

    if (
      !result.didCancel && // 도중에 취소하지 않았고
      result.assets && // 선택된 사진이 존재한다면
      Boolean(result.assets.length)
    ) {
      return result.assets;
    } // 해당 사진들 반환
  } catch (err) {
    console.warn(err);
    return;
  }
};
