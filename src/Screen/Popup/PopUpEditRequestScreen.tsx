import React, {useLayoutEffect, useState} from 'react';
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import globalColors from '../../styles/color/globalColors.ts';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import TwoSelectConfirmationModal from '../../components/TwoSelectConfirmationModal.tsx';
import GoBackSvg from 'src/Resource/svg/left-arrow-black-icon.svg';
import ConfirmationModal from '../../components/ConfirmationModal.tsx';
import ImageContainerRow from '../../components/ImageContainerRow.tsx';
import Text20B from '../../styles/texts/title/Text20B.ts';
import Text12R from '../../styles/texts/label/Text12R.ts';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';
import useModifyPopUpInfo from '../../hooks/modify/useModifyPopUpInfo.tsx';
import {useImageSelector} from '../../hooks/useImageSelector';
import {requestGalleryPermissions} from '../../Util/function/requestGalleryPermission.ts';

type PopUpEditRequestScreenRouteProp = RouteProp<
  AppNavigatorParamList,
  'PopUpEditRequest'
>;

function PopUpEditRequestScreen() {
  const [content, setContent] = useState(''); // 후기 내용
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true); // New state to track success or failure
  const [isFocused, setIsFocused] = useState(false);
  const route = useRoute<PopUpEditRequestScreenRouteProp>();
  const navigation = useNavigation();
  const {name, id} = route.params;
  const {modifyInfoDetails} = useModifyPopUpInfo();
  const {selectedImages, handleSelectImages, handleRemoveImage} =
    useImageSelector(); // Use the custom hook

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true);

  const openCompleteModal = () => {
    setCompleteModalVisible(true);
  };

  // 제보하기 버튼 클릭후 모달 닫기
  const closeCompleteModal = () => {
    setCompleteModalVisible(false);
    navigation.goBack();
  };

  // 뒤로가기 버튼 클릭 모달에서 나가기 클릭시
  const closeModal = () => {
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

  const handleSelectImagesWithPermission = async () => {
    const hasPermission = await requestGalleryPermissions();
    if (!hasPermission) {
      Alert.alert(
        '갤러리 접근 권한 요청',
        '팝핀에서 팝업 정보 수정 요청시 필요한 사진 첨부 기능 사용을 위해 사진 라이브러리 접근 권한 동의가 필요합니다. 설정에서 이를 변경할 수 있습니다.',
        [
          {text: '취소', style: 'cancel'},
          {text: '설정 열기', onPress: () => Linking.openSettings()},
        ],
      );
      return;
    }
    handleSelectImages();
  };

  const handleSubmit = async () => {
    const response = await modifyInfoDetails(id, content, selectedImages);
    setIsSubmitEnabled(false);
    if (response.success) {
      setIsSuccess(true);
    } else if (response.error) {
      setIsSuccess(false);
    }
    setIsSubmitEnabled(true);
    openCompleteModal();
  };

  const characterCount = content.length;
  const isOverLimit = characterCount > 300;
  return (
    <DismissKeyboardView style={styles.container}>
      <Text style={[Text20B.text, {marginTop: 40, marginBottom: 10}]}>
        {name}
      </Text>
      <View style={{height: 20}} />
      <TextInput
        style={[
          styles.reviewInput,
          {borderColor: isFocused ? globalColors.blue : globalColors.warmGray},
          isOverLimit && {borderColor: 'red'},
        ]}
        multiline
        placeholder="수정이 필요한 정보를 작성해 주세요."
        placeholderTextColor={globalColors.font}
        maxLength={300}
        value={content}
        onChangeText={setContent}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Text style={[styles.characterCount, isOverLimit && styles.overLimit]}>
        {characterCount}/300
      </Text>
      <View style={styles.modalContainer} />
      <ImageContainerRow
        selectedImages={selectedImages}
        handleSelectImages={handleSelectImagesWithPermission}
        handleRemoveImage={handleRemoveImage}
      />
      <Text style={[{marginTop: 10}, Text12R.text, {color: globalColors.font}]}>
        *문의사항은 접수 후 수정이 불가합니다.{'\n'}
        *첨부파일은 20MB 이하의 파일만 첨부가능하며, 최대 5개까지
        등록가능합니다.{'\n'}
        *이미지에 개인정보가 보이지않도록 주의 바랍니다.{'\n'}
        *고의로 잘못된 정보를 입력하여 다른 소비자들에게 오해와 혼동을 일으키고
        기업의 이미지를 훼손시킬 경우 민/형사상 책임을 물을 수 있습니다.{'\n'}
      </Text>
      <CompleteButton
        onPress={handleSubmit}
        disabled={
          (content.length > 10 && selectedImages.length === 0) ||
          !isSubmitEnabled
        }
        style={styles.buttonRow}
        title={'요청하기'}
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
      {isSuccess ? (
        <ConfirmationModal
          isVisible={completeModalVisible}
          onClose={closeCompleteModal}
          mainTitle="소중한 제보 감사합니다!"
          subTitle={
            '제보하신 팝업은\nPOPPIN에서 확인 후 업로드 될 예정입니다.\n더 나은 POPPIN이 되겠습니다.'
          }
        />
      ) : (
        <ConfirmationModal
          isAlertSvg={true}
          isVisible={completeModalVisible}
          onClose={closeCompleteModal}
          mainTitle="오류"
          subTitle={'잠시 후 다시 시도해 주세요.'}
        />
      )}
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
  reviewInput: {
    borderWidth: 1,
    borderColor: globalColors.warmGray,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    height: 150,
    fontSize: 14,
  },
  characterCount: {
    textAlign: 'right',
    marginTop: 5,
    fontSize: 14,
    color: globalColors.font,
  },
  overLimit: {
    color: 'red',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  buttonRow: {
    position: 'absolute',
    top: 600,
  },
});

export default PopUpEditRequestScreen;
