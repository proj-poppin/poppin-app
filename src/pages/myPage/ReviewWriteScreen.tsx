import React, {useCallback, useState} from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import globalColors from '../../utils/color/globalColors.ts';
import SearchSvg from '../../assets/icons/searchGray.svg';
import OptionSingleButton from '../../components/OptionSingleButton.tsx';
import PlusSvg from '../../assets/icons/plus.svg';
import ImageDeleteSvg from '../../assets/icons/imageDelete.svg';
import ImagePicker from 'react-native-image-crop-picker';
import CompleteButton from '../../components/CompleteButton.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import Text14R from '../../components/texts/body_medium/Text14R.ts';
import Text13R from '../../components/texts/label/Text12R.ts';

function ReviewWriteScreen() {
  const [keyword, setKeyword] = useState('');
  const [selectedVisitTime, setSelectedVisitTime] = useState(null);
  const [selectedSatisfaction, setSelectedSatisfaction] = useState(null);
  const [selectedCongestion, setSelectedCongestion] = useState(null);
  const [review, setReview] = useState(''); // 후기 내용을 저장할 상태
  const [selectedImages, setSelectedImages] = useState([]);

  // handleRemoveImage 함수 추가
  const handleRemoveImage = useCallback(indexToRemove => {
    setSelectedImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  }, []);

  const handleSelectImages = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      maxFiles: 5 - selectedImages.length, // 최대 5개까지 선택 가능
    })
      .then(images => {
        // 선택된 이미지들을 상태에 추가
        const newImages = images.map(image => ({
          uri: image.path,
          width: image.width,
          height: image.height,
        }));
        setSelectedImages(prevImages => [...prevImages, ...newImages]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const isSubmitEnabled =
    keyword.trim() !== '' &&
    (selectedVisitTime !== null ||
      selectedSatisfaction !== null ||
      selectedCongestion !== null) &&
    review.trim().length >= 10;

  return (
    <DismissKeyboardView style={styles.container}>
      <View style={styles.keywordInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="텍스트를 입력하세요."
          value={keyword}
          onChangeText={setKeyword}
        />
        <Pressable style={styles.registerButton} onPress={() => {}}>
          <SearchSvg />
        </Pressable>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={[Text14R.text, {color: globalColors.purple}, {width: 65}]}>
          방문 일시
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}>
          {['평일 오전', '평일 오후', '주말 오전', '주말 오후'].map(
            (time, index) => (
              <OptionSingleButton
                key={index}
                id={index.toString()}
                title={time}
                onPress={() => setSelectedVisitTime(time)}
                isSelected={selectedVisitTime === time}
              />
            ),
          )}
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={[Text13R.text, {color: globalColors.purple}, {width: 65}]}>
          팝업 만족도
        </Text>
        <View style={styles.buttonsContainer}>
          {['만족', '보통', '불만족'].map((satisfaction, index) => (
            <OptionSingleButton
              key={index}
              id={index.toString()}
              title={satisfaction}
              onPress={() => setSelectedSatisfaction(satisfaction)}
              isSelected={selectedSatisfaction === satisfaction}
            />
          ))}
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text
          style={[
            globalStyles.labelSub,
            {color: globalColors.purple},
            {width: 65},
          ]}>
          혼잡도
        </Text>
        <View style={styles.buttonsContainer}>
          {['여유', '보통', '혼잡'].map((congestion, index) => (
            <OptionSingleButton
              key={index}
              id={index.toString()}
              title={congestion}
              onPress={() => setSelectedCongestion(congestion)}
              isSelected={selectedCongestion === congestion}
            />
          ))}
        </View>
      </View>
      <TextInput
        style={styles.reviewInput}
        multiline // 여러 줄 입력 가능
        placeholder="팝업에 대한 후기를 남겨주세요(선택)"
        placeholderTextColor={globalColors.font} // 힌트 텍스트 색상 조정
        maxLength={1000} // 최대 입력 가능한 문자 수
        value={review}
        onChangeText={setReview} // 입력 값 변경 시 상태 업데이트
      />
      <View style={styles.imagesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={selectedImages.length >= 2} // 2장 이상일 때만 스크롤 활성화
          contentContainerStyle={[styles.imagesContainer]} // 스타일 조정
        >
          {selectedImages.length < 5 && (
            <Pressable
              style={styles.addImageButton}
              onPress={handleSelectImages}>
              <PlusSvg />
              <Text style={styles.addImageText}>
                {'사진 추가하기\n(최대 5장)'}
              </Text>
            </Pressable>
          )}
          {selectedImages.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{uri: image}} style={styles.selectedImage} />
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => handleRemoveImage(index)}>
                <ImageDeleteSvg />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={{paddingBottom: 40}}>
        <CompleteButton
          title="작성 완료"
          onPress={() => {}}
          disabled={!isSubmitEnabled}
        />
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: globalColors.white,
  },
  keywordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: globalColors.warmGray,
    padding: 0,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  registerButton: {
    padding: 10,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  scrollView: {
    marginLeft: 10,
    flexGrow: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    flexGrow: 0,
  },
  reviewInput: {
    width: 340,
    height: 150,
    backgroundColor: 'white',
    borderColor: globalColors.warmGray,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
    color: globalColors.font, // 입력 텍스트 색상
    fontWeight: '200', // 폰트 두께 조절
    fontSize: 13, // 폰트 크기 조절
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10, // 스크롤 뷰와 주변 요소 간 간격 조정
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
    textAlign: 'center', // 텍스트 중앙 정렬
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10, // 쉽게 탭할 수 있도록 패딩 추가
    color: 'black',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
});

export default ReviewWriteScreen;
