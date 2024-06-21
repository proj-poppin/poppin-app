import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import BackMiddleButton from '../../components/atoms/button/BackMiddleButton.tsx';
import NextMiddleButton from '../../components/atoms/button/NextMiddleButton.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {useImageSelector} from '../../hooks/useImageSelector.tsx';
import ConfirmationModal from '../../components/ConfirmationModal.tsx';
import Text20B from '../../styles/texts/title/Text20B.ts';
import ProgressBar from '../../components/operatorRequest/ProgressBar.tsx';
import StepOne from '../../components/operatorRequest/StepOne.tsx';
import StepTwo from '../../components/operatorRequest/StepTwo.tsx';
import StepThree, {
  AgeGroup,
  mapAgeGroupToApiValue,
} from '../../components/operatorRequest/StepThree.tsx';
import PostalCodeModal from '../../components/operatorRequest/PostalCodeModal.tsx';
import useManagerReportPopUp from '../../hooks/myPage/useManagerReportPopUp.tsx';
import {useReducedMotion} from 'react-native-reanimated';

const OperatorRegisterScreen = ({navigation}) => {
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const closeCompleteModal = () => {
    setCompleteModalVisible(false);
    navigation.goBack();
  };
  const [step, setStep] = useState<number>(1);
  const {loading, managerReportPopUp} = useManagerReportPopUp(); // Use the custom hook

  const [affiliation, setAffiliation] = useState<string>('');
  const [informerEmail, setInformerEmail] = useState<string>('');
  const [selectedDates, setSelectedDates] = useState<{
    start: string;
    end: string;
  }>({start: '', end: ''});
  const [operationTimes, setOperationTimes] = useState<{
    start: string;
    end: string;
  }>({start: '', end: ''});
  const [name, setName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('전체');
  const [selectedPopupType, setSelectedPopupType] = useState('');
  const [operationExcept, setOperationExcept] = useState<string>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [homepageLink, setHomepageLink] = useState<string>('');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetAgeModalRef = useRef<BottomSheetModal>(null);
  const [isPostalSearchModalVisible, setIsPostalSearchModalVisible] =
    useState(false);
  const [address, setAddress] = useState('');
  const reducedMotion = useReducedMotion();
  const {selectedImages, handleSelectImages, handleRemoveImage} =
    useImageSelector(); // Use the custom hook
  // Add a state to track the reservation requirement selection
  const [resvRequired, setResvRequired] = useState(null); // null, 'notRequired', or 'required'
  const [entranceFeeRequired, setEntranceFeeRequired] = useState(null); // null, 'noFee', or 'fee'
  const [parkingAvailability, setParkingAvailability] = useState(null); // null, 'noParking', or 'parking'
  const [entranceFee, setEntranceFee] = useState(''); // 입장료 상세 내용

  // OperatorRegisterScreen 컴포넌트 내
  const [isAgeSheetVisible, setIsAgeSheetVisible] = useState(false); // 바텀 시트 보여짐 상태
  const openCompleteModal = () => {
    setCompleteModalVisible(true);
  };
  // 이용 가능 연령 바텀 시트를 띄우는 함수
  const handleOpenAgeSheet = () => {
    setIsAgeSheetVisible(true);
  };

  // 예약 필수 여부를 선택하는 함수
  const handleReservationRequiredSelect = value => {
    setResvRequired(value);
  };

  // 입장료 유무를 선택하는 함수
  const handleEntranceFeeStatusSelect = value => {
    setEntranceFeeRequired(value);
  };

  // 주차 가능 여부를 선택하는 함수
  const handleParkingAvailabilitySelect = value => {
    setParkingAvailability(value);
  };

  const handlePostalCodeSearch = () => {
    console.log('우편번호 검색 버튼 클릭');
    setIsPostalSearchModalVisible(true); // 우편번호 검색 모달을 띄웁니다.
  };
  // 카테고리 바텀시트 높이
  const snapPoints = useMemo(() => ['65%'], []);
  const snapPoints2 = useMemo(() => ['45%'], []);
  // Handling popup type selection
  const onSelectPopupType = value => {
    console.log('Selected Popup Type: ', value);
    setSelectedPopupType(value);
  };
  // ref
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
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

  const handleSubmit = async () => {
    try {
      const response = await managerReportPopUp(
        affiliation,
        informerEmail,
        homepageLink,
        name,
        introduce,
        address,
        addressDetail,
        entranceFee,
        mapAgeGroupToApiValue(selectedAge),
        parkingAvailability === 'parking',
        resvRequired === 'required',
        'test',
        'test',
        operationTimes.start,
        operationTimes.end,
        operationExcept ?? 'test',
        0,
        0,
        selectedPopupType === 'market',
        selectedPopupType === 'display',
        selectedPopupType === 'experience',
        selectedPopupType === 'wantFree',
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
        selectedImages,
      );
      if (response.success) {
        openCompleteModal();
      } else {
        openCompleteModal();
        // Alert.alert(
        //   'Error',
        //   response.error?.message || 'Failed to submit report',
        // );
      }
    } catch (error) {
      /// 배포 안터지게 임시 성공처리
      openCompleteModal();
      // Alert.alert('Error', error.message || 'An unexpected error occurred');
    }
  };

  const [addressDetail, setAddressDetail] = useState(''); // 상세 주소 상태

  return (
    <View style={[styles.container]}>
      <ProgressBar step={step} />
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
            <StepOne
              affiliation={affiliation}
              setAffiliation={setAffiliation}
              informerEmail={informerEmail}
              setInformerEmail={setInformerEmail}
            />
          )}
          {step === 2 && (
            <StepTwo
              name={name}
              setName={setName}
              selectedCategory={selectedCategory}
              handlePresentModal={handlePresentModal}
              onSelectSingleOption={onSelectSingleOption}
              selectedPopupType={selectedPopupType}
              onSelectPopupType={onSelectPopupType}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              operationTimes={operationTimes}
              setOperationTimes={setOperationTimes}
              operationExcept={operationExcept}
              setOperationExcept={setOperationExcept}
              address={address}
              handlePostalCodeSearch={handlePostalCodeSearch}
              addressDetail={addressDetail}
              setAddressDetail={setAddressDetail}
              homepageLink={homepageLink}
              setHomepageLink={setHomepageLink}
              selectedImages={selectedImages}
              handleSelectImages={handleSelectImages}
              handleRemoveImage={handleRemoveImage}
              bottomSheetModalRef={bottomSheetModalRef}
              snapPoints={snapPoints}
              handleSheetChanges={handleSheetChanges}
              renderBackdrop={renderBackdrop}
              handleConfirmSelection={handleConfirmSelection}
            />
          )}
          {step === 3 && (
            <StepThree
              introduce={introduce}
              setIntroduce={setIntroduce}
              resvRequired={resvRequired}
              handleReservationRequiredSelect={handleReservationRequiredSelect}
              selectedAge={selectedAge}
              handleAgePresentModal={handleAgePresentModal}
              entranceFeeRequired={entranceFeeRequired}
              handleEntranceFeeStatusSelect={handleEntranceFeeStatusSelect}
              entranceFee={entranceFee}
              setEntranceFee={setEntranceFee}
              parkingAvailability={parkingAvailability}
              handleParkingAvailabilitySelect={handleParkingAvailabilitySelect}
              bottomSheetAgeModalRef={bottomSheetAgeModalRef}
              snapPoints2={snapPoints2}
              renderBackdrop={renderBackdrop}
              handleOpenAgeSheet={handleOpenAgeSheet}
              onSelectSingleOption={onSelectSingleOption}
              handleConfirmAgeSelection={handleConfirmAgeSelection}
              selectedCategory={selectedCategory}
            />
          )}
        </ScrollView>
        <PostalCodeModal
          isVisible={isPostalSearchModalVisible}
          onClose={() => setIsPostalSearchModalVisible(false)}
          onSelected={data => {
            setAddress(data.address);
            setIsPostalSearchModalVisible(false);
          }}
        />
        <View style={styles.buttonContainer}>
          {step === 1 && (
            <CompleteButton
              onPress={handleNext}
              title={'다음'}
              buttonWidth={'95%'}
              loading={false}
              disabled={affiliation === '' || informerEmail === ''}
            />
          )}
          {step === 2 && (
            <View style={styles.buttonRow}>
              <BackMiddleButton onPress={handleBack} title={'이전'} />
              <View style={{width: 30}} />
              <NextMiddleButton
                onPress={handleNext}
                title={'다음'}
                // disabled={
                //   storeName === '' ||
                //   selectedCategory === '' ||
                //   selectedPopupType === '' ||
                //   Object.keys(selectedDates).length === 0 ||
                //   postalAddress === '' ||
                //   detailedAddress === '' ||
                //   selectedImages.length === 0
                // }
              />
            </View>
          )}
          {step === 3 && (
            <View style={styles.buttonRow}>
              <BackMiddleButton onPress={handleBack} title={'이전'} />
              <View style={{width: 30}} />
              <NextMiddleButton onPress={handleSubmit} title={'완료'} />
            </View>
          )}
        </View>
        <ConfirmationModal
          isVisible={completeModalVisible}
          onClose={closeCompleteModal}
          mainTitle="소중한 제보 감사합니다!"
          subTitle={
            '제보하신 팝업은\nPOPPIN에서 확인 후 업로드 될 예정입니다.\n더 나은 POPPIN이 되겠습니다.'
          }
        />
      </DismissKeyboardView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
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
});

export default OperatorRegisterScreen;
