import React, {useState, useCallback, useLayoutEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import LabelAndInputWithCloseSvg from '../../components/LabelAndInputWithCloseSvg.tsx';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import TwoSelectConfirmationModal from '../../components/TwoSelectConfirmationModal.tsx';
import GoBackSvg from '../../assets/icons/goBack.svg';
import ConfirmationModal from '../../components/ConfirmationModal.tsx';
import ImageContainerRow from '../../components/ImageContainerRow.tsx';
import Text20B from '../../styles/texts/title/Text20B.ts';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import Text12R from '../../styles/texts/label/Text12R.ts';
import globalColors from '../../styles/color/globalColors.ts';
import useUserReportPopUp from '../../hooks/mypage/useUserReportPopUp.tsx';
import {useImageSelector} from '../../hooks/useImageSelector'; // Import the custom hook
import {useCategorySelector} from '../../hooks/useCategorySelector'; // Import the custom hook
import TextInputWithSvgIconInRight from '../../components/TextInputWithSvgIconInRight.tsx';
import PreferenceOptionButtons from '../../components/PreferenceOptionButtons.tsx';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import DownSvg from '../../assets/icons/down.svg';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import RequiredTextLabel from '../../components/RequiredTextLabel.tsx';
import {useNavigation} from '@react-navigation/native';

function UserRegisterScreen() {
  const navigation = useNavigation();
  const [storeName, setStoreName] = useState('');
  const [infoLink, setInfoLink] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);

  const {loading, userReportPopUp} = useUserReportPopUp(); // Use the custom hook

  const {selectedImages, handleSelectImages, handleRemoveImage} =
    useImageSelector(); // Use the custom hook

  const {
    selectedCategories,
    bottomSheetModalRef,
    snapPoints,
    handlePresentModal,
    onSelectOption,
    handleConfirmSelection,
  } = useCategorySelector(); // Use the custom hook

  const openCompleteModal = () => {
    setCompleteModalVisible(true);
  };

  const closeCompleteModal = () => {
    setCompleteModalVisible(false);
    navigation.goBack();
  };

  const closeModal = () => {
    navigation.goBack();
    setIsModalVisible(false);
  };

  const closeOnlyModal = () => {
    setIsModalVisible(false);
  };

  const handleModalConfirm = () => {
    setIsModalVisible(false);
  };

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

  const isSubmitEnabled =
    storeName.trim() !== '' &&
    selectedCategories.length > 0 &&
    selectedImages.length > 0;

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleReportSubmit = async () => {
    if (!isSubmitEnabled) {
      console.log('Submit is not enabled');
      return;
    }

    const response = await userReportPopUp(
      storeName,
      infoLink,
      selectedCategories.includes('fashionBeauty'),
      selectedCategories.includes('characters'),
      selectedCategories.includes('foodBeverage'),
      selectedCategories.includes('webtoonAni'),
      selectedCategories.includes('interiorThings'),
      selectedCategories.includes('movie'),
      selectedCategories.includes('musical'),
      selectedCategories.includes('sports'),
      selectedCategories.includes('game'),
      selectedCategories.includes('itTech'),
      selectedCategories.includes('kpop'),
      selectedCategories.includes('alcohol'),
      selectedCategories.includes('animalPlant'),
      selectedCategories.includes('etc'),
      selectedImages,
    );
    if (response.success) {
      openCompleteModal();
    } else {
      console.error(response.error?.message || 'Failed to submit report');
    }
  };
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
        isRequired={true}
      />
      <View style={{height: 20}} />
      <LabelAndInputWithCloseSvg
        label={'정보를 접한 사이트 주소'}
        value={infoLink}
        onChangeText={setInfoLink}
      />
      <View style={{paddingTop: 10}} />
      <TextInputWithSvgIconInRight
        label={'카테고리'}
        value={selectedCategories.join(', ')} // Show selected categories
        onIconPress={handlePresentModal}
        IconComponent={<DownSvg />}
        isRequired={true}
      />
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
            onSelectOption={onSelectOption}
            isEmojiRemoved={true}
            isSingleSelect={false}
            selectedCategories={selectedCategories}
          />
          <CompleteButton onPress={handleConfirmSelection} title={'확인'} />
        </View>
      </BottomSheetModal>
      <View style={{paddingTop: 10}} />
      <RequiredTextLabel label={'관련사진'} isRequired={true} />
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
        onPress={handleReportSubmit} // Use the report submit handler
        title={'제보하기'}
        disabled={!isSubmitEnabled || loading} // Disable button when loading
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
    paddingVertical: 10,
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
    color: 'black',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
});

export default UserRegisterScreen;
