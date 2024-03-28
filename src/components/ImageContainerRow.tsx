import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PlusSvg from '../assets/icons/plus.svg'; // 경로에 주의하세요
import ImageDeleteSvg from '../assets/icons/imageDelete.svg'; // 경로에 주의하세요
import globalColors from '../utils/color/globalColors.ts';

const ImageContainerRow = ({
  selectedImages,
  handleSelectImages,
  handleRemoveImage,
}) => {
  return (
    <View style={styles.imagesContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={selectedImages.length >= 2}
        contentContainerStyle={styles.imagesContainer}>
        {selectedImages.length < 5 && (
          <Pressable style={styles.addImageButton} onPress={handleSelectImages}>
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
