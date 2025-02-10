import {Linking, PermissionsAndroid, Platform, Rationale} from 'react-native';

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
        title: '팝핀에서 카메라/갤러리에 접근할 수 있도록 허용해주세요',
        message: '권한을 허용하고 팝업스토어를 더 풍성하게 찾아보아요!',
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
 * @author 도형
 */
export const getGalleryImages = async (param?: {
  sectionLimit?: number;
  requestRationale?: Rationale;
}) => {
  try {
    //* 먼저 권한을 확인합니다.
    const permission = requestGalleryPermissions();

    // if (Platform.OS === 'android') {
    //   if (
    //     //* 이미 권한이 허용되어 있거나, 권한 요청에 성공했다면
    //     (await PermissionsAndroid.check('android.permission.CAMERA')) ||
    //     (await requestCameraPermissionFromAndroid({
    //       requestRationale: param?.requestRationale,
    //     }))
    //   ) {
    //     permission = true;
    //   }
    // }

    if (!permission) {
      Alert.alert(
          '갤러리 권한 필요',
          '팝핀에서 제보하기 기능 사용시 필요한 사진 첨부 기능 사용을 위해 사진 라이브러리 접근 권한 동의가 필요합니다. 설정에서 이를 변경할 수 있습니다.',
          [
            {text: '다음에 하기', style: 'cancel'},
            {text: '설정 열기', onPress: () => Linking.openSettings()},
          ],
      );
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

import {useState, useMemo} from 'react';
import {Alert} from 'react-native';
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {requestGalleryPermissions} from "./temp.gallery.util";

interface UseImagePickerProps {
  maxImages?: number;
  maxWidth?: number;
  maxHeight?: number;
}

interface UseImagePickerReturn {
  images: Asset[] | undefined;
  handleAddImages: () => Promise<void>;
  handleDeleteImage: (index: number) => void;
  resetImages: () => void;
}

export const useImagePicker = ({
  maxImages = 5,
  maxWidth = 512,
  maxHeight = 512,
}: UseImagePickerProps = {}): UseImagePickerReturn => {
  const [images, setImages] = useState<Asset[]>();

  const options: ImageLibraryOptions = useMemo(
    () => ({
      selectionLimit: Math.max(0, maxImages - (images?.length || 0)),
      mediaType: 'photo',
      maxWidth,
      maxHeight,
      includeBase64: false,
    }),
    [images?.length, maxImages, maxWidth, maxHeight],
  );

  const handleImagePickerResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets) {
      const currentImages = images || [];
      const newImages = response.assets;
      const totalImages = currentImages.length + newImages.length;

      if (totalImages > maxImages) {
        Alert.alert(
          '알림',
          `이미지는 최대 ${maxImages}개까지만 선택 가능합니다.`,
        );
        const remainingSlots = maxImages - currentImages.length;
        const limitedNewImages = newImages.slice(0, remainingSlots);
        setImages([...currentImages, ...limitedNewImages]);
      } else {
        setImages([...currentImages, ...newImages]);
      }
    }
  };

  const handleAddImages = async () => {
    const result = await launchImageLibrary(options);
    handleImagePickerResponse(result);
  };

  const handleDeleteImage = (index: number) => {
    if (images) {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    }
  };

  const resetImages = () => {
    setImages(undefined);
  };

  return {
    images,
    handleAddImages,
    handleDeleteImage,
    resetImages,
  };
};
