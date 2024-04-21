import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import BackMiddleButton from '../../components/atoms/button/BackMiddleButton.tsx';
import NextMiddleButton from '../../components/atoms/button/NextMiddleButton.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import LabelAndInputWithCloseSvg from '../../components/LabelAndInputWithCloseSvg.tsx';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import TextInputWithSvgIconInRight from '../../components/TextInputWithSvgIconInRight.tsx';
import PreferenceOptionButtons from '../../components/PreferenceOptionButtons.tsx';
import PopupTypeOptions from '../../components/PopUpTypeOptions.tsx';
import OperationCalendarBottomSheet from '../../components/OperationCalendarBottomSheet.tsx';
import OperationHoursBottomSheet from '../../components/OperationHoursBottomSheet.tsx';
import Postcode from '@actbase/react-daum-postcode';
import CloseSvg from '../../assets/icons/closeGray.svg';
import ImageContainerRow from '../../components/ImageContainerRow.tsx';
import ImagePicker from 'react-native-image-crop-picker';
import RequiredTextLabel from '../../components/RequiredTextLabel.tsx';
import DownSvg from '../../assets/icons/down.svg';
import SelectButtonsGroup from '../../components/atoms/button/SelectButtonGroup.tsx';
import Text20B from '../../styles/texts/title/Text20B.ts';
import Text12R from '../../styles/texts/label/Text12R.ts';
import Text18B from '../../styles/texts/body_large/Text18B.ts';

function OperatorRegisterScreen({navigation}) {
  const [step, setStep] = useState<number>(1);

  const [companyName, setCompanyName] = useState<string>('');
  const [operatorEmail, setOperatorEmail] = useState<string>('');
  const [selectedDates, setSelectedDates] = useState({});
  const [storeName, setStoreName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedPopupType, setSelectedPopupType] = useState('');
  const [exceptionalOperation, setExceptionalOperation] = useState<string>('');
  const [introduceLine, setIntroduceLine] = useState<string>('');
  const [storeUrl, setStoreUrl] = useState<string>('');

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const bottomSheetAgeModalRef = useRef<BottomSheetModal>(null);

  const [isPostalSearchModalVisible, setIsPostalSearchModalVisible] =
    useState(false);
  const [postalAddress, setPostalAddress] = useState('');

  const [selectedImages, setSelectedImages] = useState([]);

  // Add a state to track the reservation requirement selection
  const [reservationRequired, setReservationRequired] = useState(null); // null, 'notRequired', or 'required'

  const [entranceFeeStatus, setEntranceFeeStatus] = useState(null); // null, 'noFee', or 'fee'

  const [parkingAvailability, setParkingAvailability] = useState(null); // null, 'noParking', or 'parking'

  const [entranceFeeDetails, setEntranceFeeDetails] = useState(''); // 입장료 상세 내용

  // OperatorRegisterScreen 컴포넌트 내
  const [isAgeSheetVisible, setIsAgeSheetVisible] = useState(false); // 바텀 시트 보여짐 상태

  // 이용 가능 연령 바텀 시트를 띄우는 함수
  const handleOpenAgeSheet = () => {
    setIsAgeSheetVisible(true);
  };

  // 예약 필수 여부를 선택하는 함수
  const handleReservationRequiredSelect = value => {
    setReservationRequired(value);
  };

  // 입장료 유무를 선택하는 함수
  const handleEntranceFeeStatusSelect = value => {
    setEntranceFeeStatus(value);
  };

  // 주차 가능 여부를 선택하는 함수
  const handleParkingAvailabilitySelect = value => {
    setParkingAvailability(value);
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

  // 카테고리 바텀시트 높이
  const snapPoints = useMemo(() => ['65%'], []);

  // 카테고리 바텀시트 높이
  const snapPoints2 = useMemo(() => ['45%'], []);

  // Handling popup type selection
  const onSelectPopupType = value => {
    console.log('Selected Popup Type: ', value);
    setSelectedPopupType(value); // This will ensure that only one popup type can be selected at a time
  };

  // ref
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // ref
  const handleAgePresentModal = useCallback(() => {
    bottomSheetAgeModalRef.current?.present();
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

  const handleConfirmAgeSelection = useCallback(() => {
    console.log('Selected Age: ', selectedCategory); // 콘솔에 선택된 카테고리 출력
    setSelectedAge(selectedAge); // 선택된 연령 상태 업데이트
    bottomSheetAgeModalRef.current?.close(); // 바텀 시트 닫기
  }, [selectedAge]);
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

  const progressBarContainerStyle = {
    height: 5,
    backgroundColor: globalColors.warmGray,
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
  const [detailedAddress, setDetailedAddress] = useState(''); // 상세 주소 상태

  return (
    <View style={[styles.container]}>
      <View style={[styles.progressBarContainer, progressBarContainerStyle]}>
        <View style={[styles.progressBarFill]} />
      </View>
      <DismissKeyboardView style={[styles.container, {flex: 1}]}>
        <ScrollView>
          <Text
            style={[
              Text20B.text,
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
                  Text12R.text,
                  {color: globalColors.font},
                  {textAlign: 'center'},
                  {paddingTop: 20},
                ]}>
                *제공해주신 이메일로 정보확인차 연락을 드릴 예정이니,{'\n'}
                이메일 정보가 정확한지 확인하여 주시기 바랍니다.
              </Text>
            </View>
          )}
          {step === 2 && (
            <>
              <View style={styles.purpleInfo}>
                <Text style={[Text18B.text, {color: globalColors.purple}]}>
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
                <OperationCalendarBottomSheet />
                <RequiredTextLabel label={'운영 시간'} isRequired={true} />
                <OperationHoursBottomSheet />
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
                          Text18B.text,
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
                <Text
                  style={[
                    Text12R.text,
                    {color: globalColors.font},
                    {paddingVertical: 10},
                  ]}>
                  *첨부파일은 20MB 이하의 파일만 첨부 가능하며, 최대 5개까지
                  등록 가능합니다.{'\n'}
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
                <Text style={[Text18B.text, {color: globalColors.purple}]}>
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
                <SelectButtonsGroup
                  titles={['필수 아님', '예약 필수']}
                  selected={reservationRequired}
                  onSelect={handleReservationRequiredSelect}
                />
                <TextInputWithSvgIconInRight
                  label={'이용 가능 연령'}
                  value={selectedAge}
                  onIconPress={handleAgePresentModal}
                  IconComponent={<DownSvg />}
                  isRequired={true}
                />
                <BottomSheetModal
                  ref={bottomSheetAgeModalRef}
                  index={0}
                  backdropComponent={renderBackdrop}
                  snapPoints={snapPoints2}
                  onChange={handleOpenAgeSheet}>
                  <View style={styles.contentContainer}>
                    <Text
                      style={[
                        Text18B.text,
                        {paddingTop: 15, paddingBottom: 40},
                      ]}>
                      제보할 팝업의 이용 가능 연령을 선택해 주세요
                    </Text>
                    <PreferenceOptionButtons
                      step={4}
                      onSelectOption={onSelectSingleOption}
                      isEmojiRemoved={true}
                      isSingleSelect={true}
                      selectedCategory={selectedCategory}
                    />
                    <CompleteButton
                      onPress={handleConfirmAgeSelection}
                      title={'확인'}
                      buttonWidth={'90%'}
                    />
                  </View>
                </BottomSheetModal>
                <RequiredTextLabel label={'입장료 유무'} isRequired={true} />
                <SelectButtonsGroup
                  titles={['없음', '있음']}
                  selected={entranceFeeStatus}
                  onSelect={handleEntranceFeeStatusSelect}
                />
                <RequiredTextLabel label={'입장료 유무'} isRequired={false} />
                <TextInput
                  style={styles.introduceInput}
                  value={entranceFeeDetails}
                  onChangeText={setEntranceFeeDetails}
                  placeholder={
                    '입장료가 있다면 작성해 주세요.\nex)성인 16000원, 어린이 7000원'
                  }
                  multiline={true}
                />
                <RequiredTextLabel label={'주차 가능 여부'} isRequired={true} />
                <SelectButtonsGroup
                  titles={['주차 불가', '주차 가능']}
                  selected={parkingAvailability}
                  onSelect={handleParkingAvailabilitySelect}
                />
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
                style={[{width: 300, height: 350}, {color: globalColors.white}]}
                jsOptions={{animation: false, hideMapBtn: false}}
                onSelected={data => {
                  setPostalAddress(data.address); // 선택된 주소를 상태에 저장
                  setIsPostalSearchModalVisible(false); // 모달을 닫습니다.
                }}
                onError={error => console.log(error)}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsPostalSearchModalVisible(false)}>
                <CloseSvg style={{margin: 10}} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.buttonContainer}>
          {step === 1 && (
            <CompleteButton
              onPress={handleNext}
              title={'다음'}
              buttonWidth={'95%'}
              loading={false} // 현재 로딩 상태가 없다고 가정합니다. 필요에 따라 조정 가능
              disabled={companyName === '' || operatorEmail === ''} // 둘 중 하나라도 비어있다면 비활성화
            />
          )}
          {step === 2 && (
            <View style={styles.buttonRow}>
              <BackMiddleButton onPress={handleBack} title={'이전'} />
              <View style={{width: 30}} />
              <NextMiddleButton
                onPress={handleNext}
                title={'다음'}
                disabled={
                  storeName === '' ||
                  selectedCategory === '' ||
                  selectedPopupType === '' ||
                  Object.keys(selectedDates).length === 0 ||
                  postalAddress === '' ||
                  detailedAddress === '' ||
                  selectedImages.length === 0
                }
              />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
  },
  progressBarContainer: {
    height: 5,
    backgroundColor: globalColors.warmGray,
    borderRadius: 20,
    marginHorizontal: 16, // This ensures the progress bar is slightly away from the screen edges
  },
  progressBarFill: {
    width: '100%',
    backgroundColor: globalColors.blue,
    borderRadius: 20,
    height: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    borderColor: globalColors.warmGray,
    borderRadius: 30,
  },
  purpleInfo: {
    backgroundColor: globalColors.purpleLight,
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
    borderColor: globalColors.warmGray,
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
    borderColor: globalColors.warmGray,
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
  },
  addressInput: {
    // 필요한 경우 스타일 추가
  },
  searchButton: {
    flex: 3,
    backgroundColor: globalColors.blue,
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
    borderColor: globalColors.warmGray, // 테두리 색상
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
    borderColor: globalColors.warmGray, // 테두리 색상
    borderRadius: 15, // 모서리 둥글기
    padding: 10, // 내부 패딩
    marginTop: 10, // 레이블과의 간격
    marginBottom: 10, // 힌트 텍스트와의 간격
    backgroundColor: 'white', // 배경색
    textAlignVertical: 'top', // 여러 줄 입력 시 텍스트 상단 정렬
  },
  reviewText: {
    fontSize: 16,
    color: globalColors.black,
    paddingBottom: 5, // 각 정보 항목 간의 간격
  },

  option: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: globalColors.warmGray,
  },
  selectedOption: {
    backgroundColor: globalColors.blue, // 선택된 옵션의 배경색 변경
  },
  text: {
    color: globalColors.font,
  },
  selectedText: {
    color: globalColors.blue, // 선택된 옵션의 텍스트 색상 변경
  },
});

export default OperatorRegisterScreen;
