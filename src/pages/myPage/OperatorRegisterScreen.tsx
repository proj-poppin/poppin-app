import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable} from 'react-native';
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
import GoBackSvg from '../../assets/icons/goBack.svg';
import TwoSelectConfirmationModal from '../../components/TwoSelectConfirmationModal.tsx';

const getFormattedDate = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getTodayDate = () => {
  const today = new Date();
  return getFormattedDate(today);
};

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return getFormattedDate(tomorrow);
};

const OperatorRegisterScreen = ({navigation}) => {
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);
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
  }>({
    start: getTodayDate(),
    end: getTomorrowDate(),
  });

  useEffect(() => {}, [selectedPopupType, operationTimes, selectedDates]);
  const [operationTimes, setOperationTimes] = useState<{
    start: string;
    end: string;
  }>({start: '', end: ''});
  const [name, setName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCategoryValue, setSelectedCategoryValue] =
    useState<string>('');
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('전체'); // Initialize with a valid AgeGroup value
  const [selectedAgeValue, setSelectedAgeValue] = useState<String>(''); // Internal value
  const [selectedPopupType, setSelectedPopupType] = useState<string[]>([]);
  const [selectedPopupTypeTags, setSelectedPopupTypeTags] = useState<TFilter[]>(
    [],
  );
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
  const [resvRequired, setResvRequired] = useState<boolean>(false);
  const [entranceRequired, setEntranceRequired] = useState<boolean>(false);
  const [parkingAvailability, setParkingAvailability] =
    useState<boolean>(false);
  const [entranceFee, setEntranceFee] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [isStepThreeValid, setStepThreeValid] = useState(false);
  const openCompleteModal = () => {
    setCompleteModalVisible(true);
  };
  const handleOpenAgeSheet = () => {
    bottomSheetAgeModalRef.current?.present();
  };

  const handleReservationRequiredSelect = (value: boolean) => {
    setResvRequired(value);
  };

  const handleEntranceFeeStatusSelect = (value: boolean) => {
    setEntranceRequired(value);
  };

  const handleParkingAvailabilitySelect = (value: boolean) => {
    setParkingAvailability(value);
  };

  const handlePostalCodeSearch = () => {
    setIsPostalSearchModalVisible(true);
  };

  useEffect(() => {}, [selectedPopupType, selectedPopupTypeTags]);

  const snapPoints = useMemo(() => ['65%'], []);
  const snapPoints2 = useMemo(() => ['45%'], []);

  const onSelectPopupType = (value: string) => {
    setSelectedPopupType(value);
  };

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
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
  }, []);

  const handleConfirmAgeSelection = useCallback(() => {
    bottomSheetAgeModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

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
        entranceRequired,
        entranceFee,
        mapAgeGroupToApiValue(selectedAgeValue), // Use internal value here
        parkingAvailability,
        resvRequired,
        selectedDates.start,
        selectedDates.end,
        operationTimes.start,
        operationTimes.end,
        operationExcept ?? 'test',
        selectedPopupType.includes('market'),
        selectedPopupType.includes('display'),
        selectedPopupType.includes('experience'),
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => setIsExitModalVisible(true)}
          style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}
          hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
          <GoBackSvg />
        </Pressable>
      ),
    });
  }, [navigation]);

  const closeExitModal = () => {
    setIsExitModalVisible(false);
  };

  const handleConfirmExit = () => {
    setIsExitModalVisible(false);
    navigation.goBack();
  };
  const isStepTwoValid = useMemo(() => {
    return (
      name !== '' &&
      selectedCategory !== '' &&
      selectedPopupType.length > 0 &&
      selectedDates.start !== '' &&
      selectedDates.end !== '' &&
      operationTimes.start !== '' &&
      operationTimes.end !== '' &&
      operationTimes.start !== '시작 시간' &&
      operationTimes.end !== '종료 시간' &&
      address !== '' &&
      addressDetail !== '' &&
      homepageLink !== '' &&
      selectedImages.length > 0
    );
  }, [
    name,
    selectedCategory,
    selectedPopupType,
    selectedDates,
    operationTimes,
    address,
    addressDetail,
    homepageLink,
    selectedImages,
  ]);

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
              setSelectedPopupType={setSelectedPopupType}
              selectedPopupTypeTags={selectedPopupTypeTags}
              setSelectedPopupTypeTags={setSelectedPopupTypeTags}
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
              entranceRequired={entranceRequired}
              handleEntranceFeeStatusSelect={handleEntranceFeeStatusSelect}
              entranceFee={entranceFee}
              setEntranceFee={setEntranceFee}
              parkingAvailability={parkingAvailability}
              handleParkingAvailabilitySelect={handleParkingAvailabilitySelect}
              bottomSheetAgeModalRef={bottomSheetAgeModalRef}
              snapPoints2={snapPoints2}
              renderBackdrop={renderBackdrop}
              onSelectSingleOption={onSelectAgeOption}
              handleConfirmAgeSelection={handleConfirmAgeSelection}
              selectedCategory={selectedAge}
              setStepThreeValid={setStepThreeValid}
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
              buttonStyle={{marginTop: 330}}
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
                disabled={!isStepTwoValid}
              />
            </View>
          )}
          {step === 3 && (
            <View style={styles.buttonRow}>
              <BackMiddleButton onPress={handleBack} title={'이전'} />
              <View style={{width: 30}} />
              <NextMiddleButton
                onPress={handleSubmit}
                title={'완료'}
                disabled={!isStepThreeValid}
              />
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
        <TwoSelectConfirmationModal
          isVisible={isExitModalVisible}
          onClose={handleConfirmExit}
          onConfirm={closeExitModal}
          onBlankSpacePressed={closeExitModal}
          mainAlertTitle="정말로 나가실 건가요?"
          subAlertTitle="작성 사항은 저장되지 않습니다"
          selectFirstText="나가기"
          selectSecondText="계속 작성하기"
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
