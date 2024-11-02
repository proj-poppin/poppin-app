import {useState, useMemo} from 'react';
import {Alert} from 'react-native';
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

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
