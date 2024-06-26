import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
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
import {TFilter} from '../../components/findPopup/constants.ts';

const OperatorRegisterScreen = ({navigation}) => {
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const closeCompleteModal = () => {
    setCompleteModalVisible(false);
    navigation.goBack();
  };
  const [step, setStep] = useState<number>(1);
  const {loading, managerReportPopUp} = useManagerReportPopUp();

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
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCategoryValue, setSelectedCategoryValue] =
    useState<string>('');
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('전체'); // Initialize with a valid AgeGroup value
  const [selectedAgeValue, setSelectedAgeValue] = useState<string>(''); // Internal value
  const [selectedPopupType, setSelectedPopupType] = useState<string>('');
  const [operationExcept, setOperationExcept] = useState<string>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [homepageLink, setHomepageLink] = useState<string>('');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetAgeModalRef = useRef<BottomSheetModal>(null);
  const [isPostalSearchModalVisible, setIsPostalSearchModalVisible] =
    useState(false);
  const [address, setAddress] = useState<string>('');
  const reducedMotion = useReducedMotion();
  const {selectedImages, handleSelectImages, handleRemoveImage} =
    useImageSelector();
  const [resvRequired, setResvRequired] = useState<string | null>(null);
  const [entranceFeeRequired, setEntranceFeeRequired] = useState<string | null>(
    null,
  );
  const [parkingAvailability, setParkingAvailability] = useState<string | null>(
    null,
  );
  const [entranceFee, setEntranceFee] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');

  const openCompleteModal = () => {
    setCompleteModalVisible(true);
  };

  const handleOpenAgeSheet = () => {
    bottomSheetAgeModalRef.current?.present();
  };

  const handleReservationRequiredSelect = (value: string) => {
    setResvRequired(value);
  };

  const handleEntranceFeeStatusSelect = (value: string) => {
    setEntranceFeeRequired(value);
  };

  const handleParkingAvailabilitySelect = (value: string) => {
    setParkingAvailability(value);
  };

  const handlePostalCodeSearch = () => {
    setIsPostalSearchModalVisible(true);
  };

  const snapPoints = useMemo(() => ['65%'], []);
  const snapPoints2 = useMemo(() => ['45%'], []);

  const onSelectPopupType = (value: string) => {
    setSelectedPopupType(value);
  };

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    // handleOpenBottomSheet();
  }, []);

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

  const onSelectSingleOption = (option: TFilter) => {
    setSelectedCategory(option.label); // For display
    setSelectedCategoryValue(option.name); // For internal value
  };

  const onSelectAgeOption = (option: TFilter) => {
    setSelectedAge(option.label as AgeGroup); // Cast to AgeGroup to ensure type safety
    setSelectedAgeValue(option.name);
  };

  const handleConfirmSelection = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, [selectedCategory]);

  const handleConfirmAgeSelection = useCallback(() => {
    bottomSheetAgeModalRef.current?.close();
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
        mapAgeGroupToApiValue(selectedAgeValue), // Use internal value here
        parkingAvailability === 'parking',
        resvRequired === 'required',
        selectedDates.start ?? '2000-01-01',
        selectedDates.end ?? '2024-12-31',
        operationTimes.start ?? '00:00',
        operationTimes.end ?? '23:59',
        operationExcept ?? 'test',
        0,
        0,
        selectedPopupType === 'market',
        selectedPopupType === 'display',
        selectedPopupType === 'experience',
        selectedPopupType === 'wantFree',
        selectedCategoryValue.includes('fashionBeauty'),
        selectedCategoryValue.includes('characters'),
        selectedCategoryValue.includes('foodBeverage'),
        selectedCategoryValue.includes('webtoonAni'),
        selectedCategoryValue.includes('interiorThings'),
        selectedCategoryValue.includes('movie'),
        selectedCategoryValue.includes('musical'),
        selectedCategoryValue.includes('sports'),
        selectedCategoryValue.includes('game'),
        selectedCategoryValue.includes('itTech'),
        selectedCategoryValue.includes('kpop'),
        selectedCategoryValue.includes('alcohol'),
        selectedCategoryValue.includes('animalPlant'),
        selectedImages,
      );
      if (response.success) {
        openCompleteModal();
      } else {
        openCompleteModal();
      }
    } catch (error) {
      openCompleteModal();
    }
  };

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
              selectedCategoryValue={selectedCategoryValue}
            />
          )}
          {step === 3 && (
            <StepThree
              handleOpenAgeSheet={handleOpenAgeSheet}
              handleAgePresentModal={handleOpenAgeSheet}
              introduce={introduce}
              setIntroduce={setIntroduce}
              resvRequired={resvRequired}
              handleReservationRequiredSelect={handleReservationRequiredSelect}
              selectedAge={selectedAge}
              entranceFeeRequired={entranceFeeRequired}
              handleEntranceFeeStatusSelect={handleEntranceFeeStatusSelect}
              entranceFee={entranceFee}
              setEntranceFee={setEntranceFee}
              parkingAvailability={parkingAvailability}
              handleParkingAvailabilitySelect={handleParkingAvailabilitySelect}
              bottomSheetAgeModalRef={bottomSheetAgeModalRef}
              snapPoints2={snapPoints2}
              renderBackdrop={renderBackdrop}
              onSelectSingleOption={onSelectAgeOption} // Ensure this function is properly defined and passed
              handleConfirmAgeSelection={handleConfirmAgeSelection}
              selectedCategory={selectedAge} // Ensure selectedCategory is correctly typed and used
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
              <NextMiddleButton onPress={handleNext} title={'다음'} />
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
