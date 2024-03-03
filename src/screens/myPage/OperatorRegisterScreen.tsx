import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import primaryColors from '../../style/primaryColors.ts';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import CompleteButton from '../../components/CompleteButton.tsx';
import BackMiddleButton from '../../components/BackMiddleButton.tsx';
import NextMiddleButton from '../../components/NextMiddleButton.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import {globalStyles} from '../../style/textStyles.ts';
import LabelAndInputWithCloseSvg from '../../components/LabelAndInputWithCloseSvg.tsx';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import TextInputWithSvgIconInRight from '../../components/TextInputWithSvgIconInRight.tsx';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PreferenceOptionButtons from '../../components/PreferenceOptionButtons.tsx';
import PopupTypeOptions from '../../components/PopUpTypeOptions.tsx';
import OperationPeriodInput from '../../components/OperationPeriodInput.tsx';
import OperationTimerInput from '../../components/OperationTimerInput.tsx';
import Postcode from '@actbase/react-daum-postcode';
import CloseSvg from '../../assets/icons/closeGray.svg';
import ImageContainerRow from '../../components/ImageContainerRow.tsx';
import ImagePicker from 'react-native-image-crop-picker';
import RequiredTextLabel from '../../components/RequiredTextLabel.tsx';
import DownSvg from '../../assets/icons/down.svg';
import SelectButton from '../../components/SelectButton.tsx';

function OperatorRegisterScreen({navigation}) {
  const [step, setStep] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState(false);

  const [companyName, setCompanyName] = useState<string>('');
  const [operatorEmail, setOperatorEmail] = useState<string>('');

  const [storeName, setStoreName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedPopupType, setSelectedPopupType] = useState('');
  const [exceptionalOperation, setExceptionalOperation] = useState<string>('');
  const [introduceLine, setIntroduceLine] = useState<string>('');
  const [storeUrl, setStoreUrl] = useState<string>('');

  const [selectedDates, setSelectedDates] = useState({});
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [isPostalSearchModalVisible, setIsPostalSearchModalVisible] =
    useState(false);
  const [postalAddress, setPostalAddress] = useState('');

  const [selectedImages, setSelectedImages] = useState([]);

  // Add a state to track the reservation requirement selection
  const [reservationRequired, setReservationRequired] = useState(null); // null, 'notRequired', or 'required'

  // Handle selecting "필수 아님"
  const handleSelectNotRequired = () => {
    setReservationRequired(
      reservationRequired === 'notRequired' ? null : 'notRequired',
    );
  };

  // Handle selecting "예약 필수"
  const handleSelectRequired = () => {
    setReservationRequired(
      reservationRequired === 'required' ? null : 'required',
    );
  };

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

  const handleRemoveImage = useCallback(indexToRemove => {
    setSelectedImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  }, []);

  const handlePostalCodeSearch = () => {
    console.log('우편번호 검색 버튼 클릭');
    setIsPostalSearchModalVisible(true); // 우편번호 검색 모달을 띄웁니다.
  };

  // 선택된 주소를 처리하는 함수
  const handleAddressSelect = data => {
    console.log(data.address); // 선택된 주소 로깅
    setIsPostalSearchModalVisible(false); // 모달 닫기
    // 추가적인 주소 처리 로직
  };

  const onDateSelected = date => {
    setSelectedDates(date);
    bottomSheetModalRef.current?.dismiss(); // Close the bottom sheet
    // Process selected dates for open and close date fields
  };

  // 카테고리 바텀시트 높이
  const snapPoints = useMemo(() => ['70%'], []);

  // Handling popup type selection
  const onSelectPopupType = value => {
    console.log('Selected Popup Type: ', value);
    setSelectedPopupType(value); // This will ensure that only one popup type can be selected at a time
  };

  // ref
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    // handleOpenBottomSheet();
  }, []);

  // render backdrop
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

  const onSelectSingleOption = option => {
    setSelectedCategory(option);
  };

  const handleConfirmSelection = useCallback(() => {
    console.log('Selected Category: ', selectedCategory); // 콘솔에 선택된 카테고리 출력

    bottomSheetModalRef.current?.close(); // 바텀 시트 닫기
    // setSelectedCategory(''); // 선택 상태 초기화
  }, [selectedCategory]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progressBarStyle = {
    width: '100%',
    backgroundColor: primaryColors.blue,
    borderRadius: 20,
  };

  const progressBarContainerStyle = {
    height: 5,
    backgroundColor: primaryColors.warmGray,
    borderRadius: 20,
    paddingRight: undefined as number | undefined,
    paddingLeft: undefined as number | undefined,
  };

  // Adjust padding based on step
  if (step === 1) {
    progressBarContainerStyle.paddingRight = 220;
  } else if (step === 2) {
    progressBarContainerStyle.paddingLeft = 110;
    progressBarContainerStyle.paddingRight = 110;
  } else if (step === 3) {
    progressBarContainerStyle.paddingLeft = 220;
  }
  const [postalCode, setPostalCode] = useState(''); // 우편번호 상태
  const [detailedAddress, setDetailedAddress] = useState(''); // 상세 주소 상태

  return (
    <DismissKeyboardView style={[styles.container, {flex: 1}]}>
      <View style={[progressBarContainerStyle]}>
        <View style={[styles.progressBarFill, progressBarStyle]} />
      </View>
      <ScrollView>
        <Text
          style={[
            globalStyles.title,
            {textAlign: 'left', paddingVertical: 30, paddingHorizontal: 10},
          ]}>
          {'POPPIN에 등록하기 위한\n정보가 필요해요!'}
        </Text>
        {step === 1 && (
          <View style={{paddingHorizontal: 10}}>
            <LabelAndInputWithCloseSvg
              label={'소속(업체명)'}
              value={companyName}
              onChangeText={setCompanyName}
              isRequired={true}
            />
            <View style={{height: 20}} />
            <LabelAndInputWithCloseSvg
              label={'담당자 이메일'}
              value={operatorEmail}
              onChangeText={setOperatorEmail}
              isRequired={true}
            />
            <Text
              style={[
                globalStyles.labelSubGray,
                {textAlign: 'center'},
                {paddingTop: 20},
              ]}>
              *제공해주신 이메일로 정보확인차 연락을 드릴 예정이니,{'\n'}
              이메일 정보가 정확한지 확인하여 주시기 바랍니다.
            </Text>
          </View>
        )}
        {/* Step 2에서 보여줄 내용 */}
        {step === 2 && (
          <>
            <View style={styles.purpleInfo}>
              <Text
                style={[
                  globalStyles.bodyLargePrimaryBlack,
                  {color: primaryColors.purple},
                ]}>
                📝팝업의 기본 정보를 알려주세요
              </Text>
            </View>
            <View style={[{paddingHorizontal: 10}, {paddingVertical: 10}]}>
              <LabelAndInputWithCloseSvg
                label={'팝업이름'}
                value={storeName}
                onChangeText={setStoreName}
                isRequired={true}
              />
              <TextInputWithSvgIconInRight
                label={'카테고리'}
                value={selectedCategory} // 변경됨
                onIconPress={handlePresentModal}
                IconComponent={<DownSvg />}
                isRequired={true}
              />
              <RequiredTextLabel label={'팝업유형'} isRequired={true} />
              <PopupTypeOptions
                onSelectOption={onSelectPopupType}
                selectedPopUpType={selectedPopupType}
              />
              <RequiredTextLabel label={'운영 기간'} isRequired={true} />
              <OperationPeriodInput
                onPeriodSelected={dates => {
                  console.log('Selected dates:', dates);
                  // Update your state or logic here based on selected dates
                }}
              />
              <RequiredTextLabel label={'운영 시간'} isRequired={true} />
              <OperationTimerInput
                onTimesSelected={timers => {
                  console.log('Selected times:', timers);
                  // Update your state or logic here based on selected times
                }}
              />
              <RequiredTextLabel
                label={'운영시간 외 예외사항'}
                isRequired={false}
              />
              <TextInput
                style={styles.exceptionalInput}
                value={exceptionalOperation}
                onChangeText={setExceptionalOperation}
                placeholder={
                  '운영 시간 외 예외사항이 있다면 작성해 주세요.\nex) 마지막 날에는 5시에 조기 마감'
                }
                multiline={true}
              />
              <RequiredTextLabel label={'주소'} isRequired={true} />
              <View style={styles.addressContainer}>
                <View
                  style={[
                    styles.addressInputContainer,
                    {flex: 7, marginRight: 10},
                  ]}>
                  <TextInput
                    style={styles.input}
                    value={postalAddress} // 우편번호 검색을 통해 선택된 주소를 표시
                    placeholder="주소"
                    editable={false} // 우편번호는 사용자가 직접 수정할 수 없도록 설정
                  />
                </View>
                <TouchableOpacity
                  style={[styles.searchButton, {flex: 3}]}
                  onPress={handlePostalCodeSearch}>
                  <Text style={styles.searchButtonText}>우편번호 검색</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.inputContainer]}>
                <TextInput
                  style={styles.input}
                  value={detailedAddress}
                  onChangeText={setDetailedAddress}
                  placeholder="상세주소 입력"
                />
              </View>
              <View style={styles.modalContainer}>
                <BottomSheetModal
                  ref={bottomSheetModalRef}
                  index={0}
                  backdropComponent={renderBackdrop}
                  snapPoints={snapPoints}
                  onChange={handleSheetChanges}>
                  <View style={styles.contentContainer}>
                    <Text
                      style={[
                        globalStyles.bodyLargePrimaryBlack,
                        {paddingTop: 15, paddingBottom: 40},
                      ]}>
                      제보할 팝업의 카테고리를 설정해 주세요
                    </Text>
                    <PreferenceOptionButtons
                      step={2}
                      onSelectOption={onSelectSingleOption}
                      isEmojiRemoved={true}
                      isSingleSelect={true}
                      selectedCategory={selectedCategory}
                    />
                    <CompleteButton
                      onPress={handleConfirmSelection}
                      title={'확인'}
                      buttonWidth={'90%'}
                    />
                  </View>
                </BottomSheetModal>
              </View>
              <LabelAndInputWithCloseSvg
                label={'공식 사이트 주소'}
                value={storeUrl}
                onChangeText={setStoreUrl}
                isRequired={true}
              />
              <RequiredTextLabel label={'관련사진'} isRequired={true} />
              <ImageContainerRow
                selectedImages={selectedImages}
                handleSelectImages={handleSelectImages}
                handleRemoveImage={handleRemoveImage}
              />
              <Text style={[globalStyles.labelSubGray, {paddingVertical: 10}]}>
                *첨부파일은 20MB 이하의 파일만 첨부 가능하며, 최대 5개까지 등록
                가능합니다.{'\n'}
                *올려주신 사진은 정보 업데이트시 사용될 수 있습니다.{'\n'}
                *사진은 팝업명과 내/외부 사진이 명확하게 나와야 합니다.{'\n'}
                *저품질의 사진은 정보 제공이 불가할 수 있습니다.{'\n'}
              </Text>
            </View>
          </>
        )}
        {step === 3 && (
          <>
            <View style={styles.purpleInfo}>
              <Text
                style={[
                  globalStyles.bodyLargePrimaryBlack,
                  {color: primaryColors.purple},
                ]}>
                📝팝업의 상세 정보를 알려주세요
              </Text>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <RequiredTextLabel label={'소개'} isRequired={true} />
              <TextInput
                style={styles.introduceInput}
                value={introduceLine}
                onChangeText={setIntroduceLine}
                placeholder={'팝업에 대한 내용을 소개해 주세요.'}
                multiline={true}
              />
              <RequiredTextLabel label={'예약 필수 여부'} isRequired={true} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingBottom: 20,
                }}>
                <SelectButton
                  onPress={handleSelectNotRequired}
                  title={'필수 아님'}
                  selected={reservationRequired === 'notRequired'}
                />
                <SelectButton
                  onPress={handleSelectRequired}
                  title={'예약 필수'}
                  selected={reservationRequired === 'required'}
                />
              </View>
              <TextInputWithSvgIconInRight
                label={'이용 가능 연령'}
                value={selectedAge} // 변경됨
                onIconPress={handlePresentModal}
                IconComponent={<DownSvg />}
                isRequired={true}
              />
              <RequiredTextLabel label={'입장료 유무'} isRequired={true} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingBottom: 20,
                }}>
                <SelectButton
                  onPress={handleSelectNotRequired}
                  title={'없음'}
                  selected={reservationRequired === 'notRequired'}
                />
                <SelectButton
                  onPress={handleSelectRequired}
                  title={'있음'}
                  selected={reservationRequired === 'required'}
                />
              </View>
              <RequiredTextLabel label={'입장료 유무'} isRequired={false} />
              <TextInput
                style={styles.introduceInput}
                value={introduceLine}
                onChangeText={setIntroduceLine}
                placeholder={
                  '입장료가 있다면 작성해 주세요.\nex)성인 16000원, 어린이 7000원'
                }
                multiline={true}
              />
              <RequiredTextLabel label={'주차 가능 여부'} isRequired={true} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingBottom: 20,
                }}>
                <SelectButton
                  onPress={handleSelectNotRequired}
                  title={'주차 불가'}
                  selected={reservationRequired === 'notRequired'}
                />
                <SelectButton
                  onPress={handleSelectRequired}
                  title={'주차 가능'}
                  selected={reservationRequired === 'required'}
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPostalSearchModalVisible}
        onRequestClose={() => {
          setIsPostalSearchModalVisible(!isPostalSearchModalVisible);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Postcode
              style={{width: 300, height: 400}}
              jsOptions={{animation: true, hideMapBtn: true}}
              onSelected={data => {
                setPostalAddress(data.address); // 선택된 주소를 상태에 저장
                setIsPostalSearchModalVisible(false); // 모달을 닫습니다.
              }}
              onError={error => console.log(error)}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsPostalSearchModalVisible(false)}>
              <CloseSvg />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.buttonContainer}>
        {step === 1 && <CompleteButton onPress={handleNext} title={'다음'} />}
        {step === 2 && (
          <View style={styles.buttonRow}>
            <BackMiddleButton onPress={handleBack} title={'이전'} />
            <View style={{width: 30}} />
            <NextMiddleButton onPress={handleNext} title={'다음'} />
          </View>
        )}
        {step === 3 && (
          <View style={styles.buttonRow}>
            <BackMiddleButton onPress={handleBack} title={'이전'} />
            <View style={{width: 30}} />
            <NextMiddleButton
              onPress={() => navigation.navigate('Main')}
              title={'완료'}
            />
          </View>
        )}
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColors.white,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  progressBarFill: {
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: primaryColors.warmGray,
    borderRadius: 30,
  },
  purpleInfo: {
    backgroundColor: primaryColors.purpleLight,
    padding: 10,
    borderRadius: 10,
    // 기타 필요한 스타일
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /////

  labelText: {
    paddingVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: primaryColors.warmGray,
    borderRadius: 30,
    padding: 10,
  },
  input2: {
    backgroundColor: 'white',
    padding: 10,
  },
  // 기존 스타일 유지
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressInputContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: primaryColors.warmGray,
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
  },
  addressInput: {
    // 필요한 경우 스타일 추가
  },
  searchButton: {
    flex: 3,
    backgroundColor: primaryColors.blue,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  searchButtonText: {
    color: 'white',
  },
  input: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 뒷배경을 불투명하게 만듭니다
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // 모달의 너비를 조절
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'white',
  },
  exceptionalInput: {
    height: 60, // 입력 필드의 높이
    borderWidth: 1,
    borderColor: primaryColors.warmGray, // 테두리 색상
    borderRadius: 10, // 모서리 둥글기
    padding: 10, // 내부 패딩
    marginTop: 10, // 레이블과의 간격
    marginBottom: 10, // 힌트 텍스트와의 간격
    backgroundColor: 'white', // 배경색
    textAlignVertical: 'top', // 여러 줄 입력 시 텍스트 상단 정렬
  },
  introduceInput: {
    height: 100, // 입력 필드의 높이
    borderWidth: 1,
    borderColor: primaryColors.warmGray, // 테두리 색상
    borderRadius: 15, // 모서리 둥글기
    padding: 10, // 내부 패딩
    marginTop: 10, // 레이블과의 간격
    marginBottom: 10, // 힌트 텍스트와의 간격
    backgroundColor: 'white', // 배경색
    textAlignVertical: 'top', // 여러 줄 입력 시 텍스트 상단 정렬
  },
  reviewText: {
    fontSize: 16,
    color: primaryColors.black,
    paddingBottom: 5, // 각 정보 항목 간의 간격
  },
});

export default OperatorRegisterScreen;
