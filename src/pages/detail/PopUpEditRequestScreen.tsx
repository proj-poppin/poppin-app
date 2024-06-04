import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';
import useModifyPopUpInfo from '../../hooks/modify/useModifyPopUpInfo.tsx';

type PopUpEditRequestScreenRouteProp = RouteProp<
  AppNavigatorParamList,
  'PopUpEditRequest'
>;

function PopUpEditRequestScreen() {
  const route = useRoute<PopUpEditRequestScreenRouteProp>();
  const navigation = useNavigation();
  const {id, name} = route.params;
  const {modifyInfoDetails, loading, error, success} = useModifyPopUpInfo();

  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<
    Array<{uri: string; width: number; height: number}>
  >([]);

  const handleSelectImages = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      maxFiles: 5 - selectedImages.length,
    })
      .then(images => {
        const resizePromises = images.map(image =>
          ImageResizer.createResizedImage(
            image.path,
            600,
            600,
            image.mime.includes('jpeg') ? 'JPEG' : 'PNG',
            100,
            0,
          ),
        );
        Promise.all(resizePromises)
          .then(resizedImages => {
            const newImages = resizedImages.map(image => ({
              uri: image.uri,
              width: image.width,
              height: image.height,
            }));
            setSelectedImages(prevImages => [...prevImages, ...newImages]);
          })
          .catch(error => {
            console.log('Image resizing error:', error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRemoveImage = useCallback((indexToRemove: number) => {
    setSelectedImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  }, []);

  const handleSubmit = async () => {
    await modifyInfoDetails(
      id,
      content,
      selectedImages.map(image => image.uri),
    );
    if (success) {
      navigation.goBack();
    } else if (error) {
      console.error('Modify info error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>팝업 정보 수정</Text>
      <TextInput
        style={styles.input}
        placeholder="내용을 입력하세요"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <ScrollView horizontal style={styles.imageScroll}>
        {selectedImages.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{uri: image.uri}} style={styles.selectedImage} />
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => handleRemoveImage(index)}>
              <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Button title="사진 선택" onPress={handleSelectImages} />
      </ScrollView>
      <Button
        title="요청하기"
        onPress={handleSubmit}
        disabled={loading || !content.trim() || selectedImages.length === 0}
      />
      {loading && <Text>요청 중...</Text>}
      {error && <Text>에러: {error.message}</Text>}
      {success && <Text>수정 요청이 성공적으로 완료되었습니다!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  imageScroll: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 5,
  },
  deleteText: {
    color: 'white',
    fontSize: 12,
  },
});

export default PopUpEditRequestScreen;
