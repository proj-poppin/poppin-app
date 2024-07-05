import React, {useState, useCallback, useLayoutEffect, useRef} from 'react';
import {Alert, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
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
import {useImageSelector} from '../../hooks/useImageSelector'; // Import the custom hook
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import DownSvg from '../../assets/icons/down.svg';
import CategorySelectButton from '../../components/findPopup/CategorySelectButton.tsx';
import {POP_UP_TYPES, TFilter} from '../../components/findPopup/constants.ts';
import {useNavigation} from '@react-navigation/native';
import useUserReportPopUp from '../../hooks/myPage/useUserReportPopUp.tsx';
import TextInputWithSvgIconInRight from '../../components/TextInputWithSvgIconInRight.tsx';
import RequiredTextLabel from '../../components/RequiredTextLabel.tsx';
import {useReducedMotion} from 'react-native-reanimated';
import {requestGalleryPermissions} from '../../utils/function/requestGalleryPermission.ts';

function UserRegisterScreen() {
  const [storeName, setStoreName] = useState('');
  const [infoLink, setInfoLink] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const {selectedImages, handleSelectImages, handleRemoveImage} =
    useImageSelector(); // Use the custom hook
  const {loading, userReportPopUp} = useUserReportPopUp(); // Use the custom hook
  const navigation = useNavigation();

  const handleSelectImagesWithPermission = async () => {
    const hasPermission = await requestGalleryPermissions();
    if (!hasPermission) {
      Alert.alert(
        '갤러리 권한 필요',
        '갤러리 접근 권한이 필요합니다. 앱 설정에서 갤러리 접근 권한을 허용해주세요.',
        [
          {text: '취소', style: 'cancel'},
          {text: '설정 열기', onPress: () => Linking.openSettings()},
        ],
      );
      return;
    }
    handleSelectImages();
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

  const handleClick = selectedTag => {
    setSelectedCategory(selectedTag.label);
    setSelectedTags(tags =>
      tags.map(tag =>
        tag.id === selectedTag.id
          ? {...tag, selected: true}
          : {...tag, selected: false},
      ),
    );
  };

  const handleConfirmSelection = () => {
    bottomSheetModalRef.current?.close();
  };

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

  const handleSheetChanges = useCallback((index: number) => {}, []);

  // useReducedMotion()
  const reducedMotion = useReducedMotion();

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const isSubmitEnabled =
    storeName.trim() !== '' &&
    selectedCategory !== '' &&
    selectedImages.length > 0;

  const handleReportSubmit = async () => {
    if (!isSubmitEnabled) {
      return;
    }
    const response = await userReportPopUp(
      storeName,
      infoLink,
      selectedCategory.includes('fashionBeauty'),
      selectedCategory.includes('characters'),
      selectedCategory.includes('foodBeverage'),
      selectedCategory.includes('webtoonAni'),
      selectedCategory.includes('interiorThings'),
      selectedCategory.includes('movie'),
      selectedCategory.includes('musical'),
      selectedCategory.includes('sports'),
      selectedCategory.includes('game'),
      selectedCategory.includes('itTech'),
      selectedCategory.includes('kpop'),
      selectedCategory.includes('alcohol'),
      selectedCategory.includes('animalPlant'),
      selectedCategory.includes('etc'),
      selectedImages,
    );
    if (response.success) {
      openCompleteModal();
    } else {
      console.error(response.error?.message || 'Failed to submit report');
    }
  };

  const [availableTags, setAvailableTags] = useState<TFilter[]>(POP_UP_TYPES);
  const [selectedTags, setSelectedTags] = useState<TFilter[]>(availableTags);

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
        value={selectedCategory}
        onIconPress={handlePresentModal}
        IconComponent={<DownSvg />}
        isRequired={true}
        isClickableTextInput={true}
      />
      <View style={styles.modalContainer}>
        <BottomSheetModal
          animateOnMount={!reducedMotion}
          ref={bottomSheetModalRef}
          index={0}
          backdropComponent={renderBackdrop}
          snapPoints={['65%']}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text style={[Text18B.text, {paddingTop: 15, paddingBottom: 40}]}>
              제보할 팝업의 카테고리를 설정해 주세요
            </Text>
            <View style={styles.popWrapper}>
              {selectedTags.slice(0, 14).map(item => (
                <CategorySelectButton
                  isMultipleSelectionPossible={false}
                  key={item.id}
                  item={item}
                  onClick={handleClick}
                  selectedTag={selectedCategory}
                />
              ))}
            </View>
            <CompleteButton
              onPress={handleConfirmSelection}
              title={'확인'}
              buttonWidth={'90%'}
            />
          </View>
        </BottomSheetModal>
      </View>
      <View style={{paddingTop: 10}} />
      <RequiredTextLabel label={'관련사진'} isRequired={true} />
      <ImageContainerRow
        selectedImages={selectedImages}
        handleSelectImages={handleSelectImagesWithPermission}
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
        onPress={handleReportSubmit}
        title={'제보하기'}
        disabled={!isSubmitEnabled || loading}
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
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: 20,
  },
  popWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    padding: 20,
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default UserRegisterScreen;
