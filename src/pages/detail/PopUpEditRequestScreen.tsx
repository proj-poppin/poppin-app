import React, {useLayoutEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import globalColors from '../../styles/color/globalColors.ts';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import TwoSelectConfirmationModal from '../../components/TwoSelectConfirmationModal.tsx';
import GoBackSvg from '../../assets/icons/goBack.svg';
import ConfirmationModal from '../../components/ConfirmationModal.tsx';
import ImageContainerRow from '../../components/ImageContainerRow.tsx';
import Text20B from '../../styles/texts/title/Text20B.ts';
import Text12R from '../../styles/texts/label/Text12R.ts';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';
import useModifyPopUpInfo from '../../hooks/modify/useModifyPopUpInfo.tsx';
import {useImageSelector} from '../../hooks/useImageSelector'; // Import the custom hook

type PopUpEditRequestScreenRouteProp = RouteProp<
  AppNavigatorParamList,
  'PopUpEditRequest'
>;

function PopUpEditRequestScreen() {
  const [content, setContent] = useState(''); // 후기 내용
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);

  const route = useRoute<PopUpEditRequestScreenRouteProp>();
  const navigation = useNavigation();
  const {name, id} = route.params;
  const {modifyInfoDetails} = useModifyPopUpInfo();
  const {selectedImages, handleSelectImages, handleRemoveImage} =
    useImageSelector(); // Use the custom hook

  // 제보하기 버튼 클릭후 모달 닫기
  const closeCompleteModal = () => {
    setCompleteModalVisible(false);
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
  const handleSubmit = async () => {
    const response = await modifyInfoDetails(id, content, selectedImages);
    if (response.success) {
      navigation.goBack();
    } else if (response.error) {
      navigation.goBack();
      // console.error('Review submission error:', response.error.message);
    }
    setCompleteModalVisible(true);
  };
  return (
    <DismissKeyboardView style={styles.container}>
      <Text style={[Text20B.text, {marginTop: 40, marginBottom: 10}]}>
        {'POPPIN이 모르는 새로운\n'}
        {'팝업을 알려주세요'}
      </Text>
      <View style={{height: 20}} />
      <Text style={styles.labelText}>{name}</Text>
      <View style={{height: 20}} />
      <TextInput
        style={styles.reviewInput}
        multiline
        placeholder="팝업 정보 수정 요청"
        placeholderTextColor={globalColors.font}
        maxLength={1000}
        value={content}
        onChangeText={setContent}
      />
      <Text style={styles.labelText}>{'관련사진'}</Text>
      <View style={styles.modalContainer} />
      <ImageContainerRow
        selectedImages={selectedImages}
        handleSelectImages={handleSelectImages}
        handleRemoveImage={handleRemoveImage}
      />
      <Text style={[Text12R.text, {color: globalColors.font}]}>
        *문의사항은 접수 후 수정이 불가합니다.{'\n'}
        *첨부파일은 20MB 이하의 파일만 첨부가능하며, 최대 5개까지
        등록가능합니다.{'\n'}
        *이미지에 개인정보가 보이지않도록 주의 바랍니다.{'\n'}
        *고의로 잘못된 정보를 입력하여 다른 소비자들에게 오해와 혼동을 일으키고
        기업의 이미지를 훼손시킬 경우 민/형사상 책임을 물을 수 있습니다.{'\n'}
      </Text>
      <CompleteButton
        onPress={handleSubmit}
        title={'요청하기'}
        // disabled={isSubmitEnabled}
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
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
});

export default PopUpEditRequestScreen;
