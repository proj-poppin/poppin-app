import {Pressable, StyleSheet, Text, View} from 'react-native';
import globalColors from '../../utils/color/globalColors.ts';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import LabelAndInputWithCloseSvg from '../../components/LabelAndInputWithCloseSvg.tsx';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import TextInputWithSvgIconInRight from '../../components/TextInputWithSvgIconInRight.tsx';
import CompleteButton from '../../components/CompleteButton.tsx';
import PreferenceOptionButtons from '../../components/PreferenceOptionButtons.tsx';
import ImagePicker from 'react-native-image-crop-picker';
import TwoSelectConfirmationModal from '../../components/TwoSelectConfirmationModal.tsx';
import GoBackSvg from '../../assets/icons/goBack.svg';
import ConfirmationModal from '../../components/ConfirmationModal.tsx';
import ImageContainerRow from '../../components/ImageContainerRow.tsx';
import DownSvg from '../../assets/icons/down.svg';
import Text20B from '../../components/texts/title/Text20B.ts';
import Text18B from '../../components/texts/body_large/Text18B.ts';
import Text12R from '../../components/texts/label/Text12R.ts';

function UserRegisterScreen({navigation}) {
  const [storeName, setStoreName] = useState('');
  const [infoLink, setInfoLink] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);

  // 제보하기 버튼 클릭시 모달 열기
  const openCompleteModal = () => {
    setCompleteModalVisible(true);
  };

  // 제보하기 버튼 클릭후 모달 닫기
  const closeCompleteModal = () => {
    setCompleteModalVisible(false);
  };

  // 뒤로가기 버튼 클릭 모달에서 나가기 클릭시
  const closeModal = () => {
    console.log('aaa');
    navigation.goBack(); // 모달을 닫고 이전 화면으로 돌아감
    setIsModalVisible(false);
  };

  // 뒤로가기 버튼 클릭 모달에서 빈 화면 터치시
  const closeOnlyModal = () => {
    setIsModalVisible(false);
  };

  // 뒤로가기 버튼 클릭 모달에서 계속 작성하기 클릭시
  const handleModalConfirm = () => {
    setIsModalVisible(false);
  };

  // useLayoutEffect를 사용하여 스크린의 네비게이션 옵션을 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => setIsModalVisible(true)}
          style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}
          hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
          <GoBackSvg />
        </Pressable>
      ),
    });
  }, [navigation]);

  // handleRemoveImage 함수 추가
  const handleRemoveImage = useCallback(indexToRemove => {
    setSelectedImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  }, []);

  const isSubmitEnabled =
    storeName.trim() !== '' &&
    // selectedCategories.length > 0 &&
    selectedCategory.trim() !== '' &&
    selectedImages.length > 0;

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

  // BottomSheetModal

  // 화면클릭시 모달 내려감
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ['60%'], []);
  // callbacks
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    // handleOpenBottomSheet();
  }, []);

  // const onSelectOption = option => {
  //   console.log('Selected Option: ', option);
  //   setSelectedOptions(prevOptions => {
  //     console.log('Previous Options: ', prevOptions);
  //     console.log('selectedOptions: ', selectedOptions);
  //     // 옵션을 추가하거나 제거하는 로직
  //     if (prevOptions.includes(option)) {
  //       return prevOptions.filter(prevOption => prevOption !== option);
  //     } else {
  //       return [...prevOptions, option];
  //     }
  //   });
  // };

  const removeEmoji = text =>
    text
      .replace(
        /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{E000}-\u{F8FF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F910}-\u{1F96B}\u{1F980}-\u{1F9E0}]/gu,
        '',
      )
      .trim();
  // 단일 선택 모드에서 호출될 함수
  const onSelectSingleOption = option => {
    setSelectedCategory(option);
  };

  // // 복수 선택 모드에서 호출될 함수
  // const onSelectMultipleOption = option => {
  //   setSelectedCategories(prev => {
  //     if (prev.includes(option)) {
  //       return prev.filter(o => o !== option); // 이미 선택되어 있다면 제거
  //     } else {
  //       return [...prev, option]; // 새로 선택된 경우 추가
  //     }
  //   });
  // };

  const handleConfirmSelection = useCallback(() => {
    console.log('Selected Category: ', selectedCategory); // 콘솔에 선택된 카테고리 출력

    bottomSheetModalRef.current?.close(); // 바텀 시트 닫기
    // setSelectedCategory(''); // 선택 상태 초기화
  }, [selectedCategory]);

  return (
    <DismissKeyboardView style={styles.container}>
      <Text style={[Text20B.text, {marginTop: 40, marginBottom: 10}]}>
        {'POPPIN이 모르는 새로운\n'}
        {'팝업을 알려주세요'}
      </Text>
      <View style={{height: 20}} />
      <LabelAndInputWithCloseSvg
        label={'팝업 이름'}
        value={storeName}
        onChangeText={setStoreName}
      />
      <View style={{height: 20}} />
      {/*<CategoryBottomSheetInput*/}
      {/*  label={'카테고리'}*/}
      {/*  value={selectedOptions.join(',')}*/}
      {/*  onIconPress={handlePresentModal}*/}
      {/*/>*/}
      <TextInputWithSvgIconInRight
        label={'카테고리'}
        value={selectedCategory} // 변경됨
        onIconPress={handlePresentModal}
        IconComponent={DownSvg}
      />
      <View style={{height: 20}} />
      <LabelAndInputWithCloseSvg
        label={'정보를 접한 사이트 주소'}
        value={infoLink}
        onChangeText={setInfoLink}
      />
      <View style={{paddingTop: 10}} />
      <Text style={styles.labelText}>{'관련사진'}</Text>
      <View style={styles.modalContainer}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text style={[Text18B.text, {paddingTop: 15, paddingBottom: 40}]}>
              제보할 팝업의 카테고리를 설정해 주세요
            </Text>
            <PreferenceOptionButtons
              step={2}
              onSelectOption={onSelectSingleOption}
              isEmojiRemoved={true}
              isSingleSelect={true}
              selectedCategory={selectedCategory}
            />
            <CompleteButton onPress={handleConfirmSelection} title={'확인'} />
          </View>
        </BottomSheetModal>
      </View>
      <ImageContainerRow
        selectedImages={selectedImages}
        handleSelectImages={handleSelectImages}
        handleRemoveImage={handleRemoveImage}
      />
      <Text style={[Text12R.text, {color: globalColors.font}]}>
        *첨부파일은 20MB 이하의 파일만 첨부 가능하며, 최대 5개까지 등록
        가능합니다.{'\n'}
        *올려주신 사진은 정보 업데이트시 사용될 수 있습니다.{'\n'}
        *사진은 팝업명과 내/외부 사진이 명확하게 나와야 합니다.{'\n'}
        *저품질의 사진은 정보 제공이 불가할 수 있습니다.{'\n'}
      </Text>
      <CompleteButton
        onPress={openCompleteModal}
        title={'제보하기'}
        disabled={!isSubmitEnabled}
      />

      <TwoSelectConfirmationModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onConfirm={handleModalConfirm}
        onBlankSpacePressed={closeOnlyModal}
        mainAlertTitle="뒤로 가시겠습니까?"
        subAlertTitle="변경 사항이 저장되지 않을 수 있습니다."
        selectFirstText="나가기"
        selectSecondText="계속 작성하기"
      />
      <ConfirmationModal
        isVisible={completeModalVisible}
        onClose={closeCompleteModal}
        mainTitle="소중한 제보 감사합니다!"
        subTitle={
          '제보하신 팝업은\nPOPPIN에서 확인 후 업로드 될 예정입니다.\n더 나은 POPPIN이 되겠습니다.'
        }
      />
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: globalColors.black,
    fontSize: 15,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
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

export default UserRegisterScreen;
