// ImageContainerRow.tsx
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking,
} from 'react-native';
import PlusSvg from '../assets/icons/plus.svg';
import ImageDeleteSvg from '../assets/icons/imageDelete.svg';
import globalColors from '../styles/color/globalColors.ts';
import {requestGalleryPermissions} from '../utils/function/requestGalleryPermission.ts';

const ImageContainerRow = ({
  selectedImages,
  handleSelectImages,
  handleRemoveImage,
}) => {
  const checkGalleryPermissions = async () => {
    const hasPermission = await requestGalleryPermissions();
    if (!hasPermission) {
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
    handleSelectImages();
  };

  return (
    <View style={styles.imagesContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={selectedImages.length >= 2}
        contentContainerStyle={styles.imagesContainer}>
        {selectedImages.length < 5 && (
          <Pressable
            style={styles.addImageButton}
            onPress={checkGalleryPermissions}>
            <PlusSvg />
            <Text style={styles.addImageText}>
              {'사진 추가하기\n(최대 5장)'}
            </Text>
          </Pressable>
        )}
        {selectedImages.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{uri: image.uri}} style={styles.selectedImage} />
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => handleRemoveImage(index)}>
              <ImageDeleteSvg />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addImageButton: {
    borderColor: globalColors.component,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    marginRight: 10,
  },
  selectedImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  addImageText: {
    color: globalColors.font,
    paddingTop: 8,
    textAlign: 'center',
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
});

export default ImageContainerRow;
