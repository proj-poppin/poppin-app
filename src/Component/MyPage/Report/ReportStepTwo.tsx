// components/StepTwo.tsx
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Alert, ScrollView} from 'react-native';
import {
  HHMMFormatTime,
  moderateScale,
  useImagePicker,
  YYYYHHMMFormatDate,
} from '../../../Util';
import CustomBottomSheet from '../../BottomSheet/CustomBottomSheet';
import CalendarPicker from '../../CalendarPicker';
import TimePicker from '../../TimePicker';
import PopupCategoryModal from '../../Modal/Popup.category.modal';
import {useOperatorReportStore} from '../../../Screen/MyPage/Request/Operator/Mypage.report.operator.zustand';
import {StepProps} from './ReportStepOne';
import CustomBottomSheetButton from '../../BottomSheet/CustomBottomSheetButton';
import PostalCodeModal from '../../operatorRequest/PostalCodeModal';
import CategorySelectButton from '../../../Screen/Popup/Landing/category.select.button';
const ReportStepTwo: React.FC<StepProps> = ({onNext, onBackPress}) => {
  const {
    // State
    modalVisible,
    postcodeVisible,
    storeName,

    filteringThreeCategories,
    filteringFourteenCategories,
    storeAddress,
    storeDetailAddress,
    storeUrl,
    openDate,
    closeDate,
    openTime,
    closeTime,
    operationException,

    // Actions
    setModalVisible,
    setPostcodeVisible,
    setStoreName,

    setFilteringThreeCategories,
    setFilteringFourteenCategories,
    setStoreAddress,
    setStoreDetailAddress,
    setStoreUrl,
    setOpenDate,
    setCloseDate,
    setOpenTime,
    setCloseTime,
    setOperationException,
    addImages,
  } = useOperatorReportStore();

  const {
    images,
    handleAddImages: openGallery,
    handleDeleteImage,
  } = useImagePicker({
    maxImages: 5,
    maxWidth: 512,
    maxHeight: 512,
  });

  const validateStep = () => {
    if (!storeName.trim()) {
      Alert.alert('알림', '팝업 이름을 입력해주세요.');
      return false;
    }
    if (!filteringFourteenCategories || filteringThreeCategories.length === 0) {
      Alert.alert('알림', '카테고리를 선택해주세요.');
      return false;
    }
    if (!openDate || !closeDate) {
      Alert.alert('알림', '운영 날짜를 선택해주세요.');
      return false;
    }
    if (!openTime || !closeTime) {
      Alert.alert('알림', '운영 시간을 선택해주세요.');
      return false;
    }
    if (!storeAddress.trim()) {
      Alert.alert('알림', '주소를 입력해주세요.');
      return false;
    }
    if (!storeUrl.trim()) {
      Alert.alert('알림', '공식 사이트 주소를 입력해주세요.');
      return false;
    }
    if (!images || images.length === 0) {
      Alert.alert('알림', '최소 1장의 사진을 업로드해주세요.');
      return false;
    }
    return true;
  };
  const handleDateSelect = (type: 'start' | 'end', date: string) => {
    if (type === 'start') {
      setOpenDate(date);
    } else {
      setCloseDate(date);
    }
  };

  const handleTimeSelect = (type: 'start' | 'end', time: Date) => {
    const timeString = `${String(time.getHours()).padStart(2, '0')}:${String(
      time.getMinutes(),
    ).padStart(2, '0')}`;
    if (type === 'start') {
      setOpenTime(timeString);
    } else {
      setCloseTime(timeString);
    }
  };

  const handlePostcode = (data: any) => {
    setStoreAddress(data.address);
    console.log(data);
    setPostcodeVisible(false);
  };

  const handleCategorySelect = (selectedCategories: {
    selectedPopupTypes: string[];
    selectedCategories: string[];
  }) => {
    setFilteringThreeCategories(selectedCategories.selectedPopupTypes.join(''));
    setFilteringFourteenCategories(
      selectedCategories.selectedCategories.join(''),
    );
    setModalVisible(false);
  };

  const secondReportHandler = () => {
    if (validateStep()) {
      addImages(images);
      onNext();
    }
  };

  const isFormValid = () => {
    return (
      storeName.trim() &&
      filteringThreeCategories?.length > 0 &&
      openDate &&
      closeDate &&
      openTime &&
      closeTime &&
      storeAddress.trim() &&
      storeUrl.trim()
    );
  };

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [isOpenDate, setIsOpenDate] = useState<boolean>(false);
  const [isOpenTime, setIsOpenTime] = useState<boolean>(false);

  return (
    <ContentContainer>
      <ScrollView>
        <InputSection>
          <TitleText>POPPIN이 모르는 새로운{'\n'}팝업을 알려주세요</TitleText>
          <SubTitleContainer>
            <SubTitle>📝 팝업의 상세 정보를 알려주세요</SubTitle>
          </SubTitleContainer>

          <InputLabel>
            팝업 이름<RequiredMark>*</RequiredMark>
          </InputLabel>
          <InputContainer>
            <StyledInput
              placeholder="팝업 이름을 입력해주세요"
              placeholderTextColor={'#9F9F9F'}
              value={storeName}
              onChangeText={setStoreName}
            />
            <ClearButton onPress={() => setStoreName('')}>
              <ClearButtonText>×</ClearButtonText>
            </ClearButton>
          </InputContainer>

          <InputLabel>
            카테고리<RequiredMark>*</RequiredMark>
          </InputLabel>
          <CustomBottomSheetButton
            text={'카테고리를 선택해주세요'}
            onPress={() => setModalVisible(true)}
            filteringFourteenCategories={filteringFourteenCategories} // 선택된 카테고리 표시를 위해 추가
          />
          {/* 여기에 팝업 유형 섹션 추가 */}
          <InputLabel>
            팝업 유형<RequiredMark>*</RequiredMark>
          </InputLabel>
          <SelectionContainer>
            {['market', 'display', 'experience'].map(key => (
              <CategorySelectButton
                key={key}
                preferenceKey={key}
                isSelected={filteringThreeCategories.includes(key)}
                onPress={() => {
                  // 토글 로직
                  const currentCategories = filteringThreeCategories
                    ? filteringThreeCategories.split(',').filter(Boolean)
                    : [];

                  if (currentCategories.includes(key)) {
                    setFilteringThreeCategories(
                      currentCategories.filter(cat => cat !== key).join(','),
                    );
                  } else {
                    setFilteringThreeCategories(
                      [...currentCategories, key].join(','),
                    );
                  }
                }}
              />
            ))}
          </SelectionContainer>

          <InputLabel>
            운영 날짜<RequiredMark>*</RequiredMark>
          </InputLabel>
          <DateContainer>
            <DateButton
              onPress={() => {
                setShowCalendar(true);
                setIsOpenDate(true);
              }}>
              <DateButtonText>{YYYYHHMMFormatDate(openDate)}</DateButtonText>
            </DateButton>
            <DateSeparator>~</DateSeparator>
            <DateButton
              onPress={() => {
                setShowCalendar(true);
                setIsOpenDate(false);
              }}>
              <DateButtonText>{YYYYHHMMFormatDate(closeDate)}</DateButtonText>
            </DateButton>
          </DateContainer>

          <InputLabel>
            운영 시간<RequiredMark>*</RequiredMark>
          </InputLabel>
          <TimeContainer>
            <TimeButton
              onPress={() => {
                setShowTimePicker(true);
                setIsOpenTime(true);
              }}>
              <TimeText>{HHMMFormatTime(openTime)}</TimeText>
            </TimeButton>
            <TimeSeparator>~</TimeSeparator>
            <TimeButton
              onPress={() => {
                setShowTimePicker(true);
                setIsOpenTime(false);
              }}>
              <TimeText>{HHMMFormatTime(closeTime)}</TimeText>
            </TimeButton>
          </TimeContainer>

          <InputLabel>운영 시간외 예외 사항</InputLabel>
          <InputBigContainer>
            <StyledBigInput
              placeholder={
                '운영 시간 외 예외사항이 있다면 작성해 주세요. \nex) 마지막 날에는 5시에 조기 마감'
              }
              placeholderTextColor={'#9F9F9F'}
              multiline={true}
              value={operationException}
              onChangeText={setOperationException}
              textAlignVertical="top"
            />
            <ClearButton onPress={() => setOperationException('')}>
              <ClearButtonText>×</ClearButtonText>
            </ClearButton>
          </InputBigContainer>

          <InputLabel>
            주소<RequiredMark>*</RequiredMark>
          </InputLabel>
          <AddressContainer>
            <AddressInput
              value={storeAddress}
              editable={false}
              placeholder="주소를 검색해주세요"
              placeholderTextColor={'#9F9F9F'}
            />
            <SearchButton onPress={() => setPostcodeVisible(true)}>
              <SearchButtonText>우편 번호 검색</SearchButtonText>
            </SearchButton>
          </AddressContainer>
          <InputContainer>
            <StyledInput
              placeholder="상세 주소를 입력해주세요"
              placeholderTextColor={'#9F9F9F'}
              value={storeDetailAddress}
              onChangeText={setStoreDetailAddress}
            />
          </InputContainer>

          <InputLabel>
            공식 사이트 주소<RequiredMark>*</RequiredMark>
          </InputLabel>
          <InputContainer>
            <StyledInput
              placeholder="URL을 입력해주세요"
              placeholderTextColor={'#9F9F9F'}
              value={storeUrl}
              onChangeText={setStoreUrl}
            />
            <ClearButton onPress={() => setStoreUrl('')}>
              <ClearButtonText>×</ClearButtonText>
            </ClearButton>
          </InputContainer>

          <InputLabel>
            관련사진<RequiredMark>*</RequiredMark>
          </InputLabel>
          <ImageUploadSection>
            {images?.map((image, index) => (
              <ImageContainer key={index}>
                <UploadedImage source={image} />
                <DeleteButton onPress={() => handleDeleteImage(index)}>
                  <DeleteButtonText>×</DeleteButtonText>
                </DeleteButton>
              </ImageContainer>
            ))}
            {(!images || images.length < 5) && (
              <ImageUploadButton onPress={openGallery}>
                <PlusIcon>+</PlusIcon>
                <UploadText>
                  사진 추가하기{'\n'}
                  (최대 5장)
                </UploadText>
              </ImageUploadButton>
            )}
          </ImageUploadSection>
          <HelperText>
            *첨부파일은 20MB 이하의 파일만 업로드 가능하며, 최대 5장까지 등록
            가능합니다.
          </HelperText>
          <HelperText>
            *올려주신 사진은 정보 업데이트 시 사용될 수 있습니다.
          </HelperText>
          <HelperText>
            *사진은 팝업명과 내/외부 사진이 명확하게 나와야 합니다.
          </HelperText>
          <HelperText>
            *저품질의 사진은 정보 제공이 불가할 수 있습니다.
          </HelperText>
        </InputSection>

        <CustomBottomSheet
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={'제보하려는 팝업의 카테고리를 설정해주세요'}
          height={'65%'}>
          <PopupCategoryModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onApply={handleCategorySelect}
            onReset={() => {
              setFilteringFourteenCategories(''); // reset 함수 추가
            }}
            buttonName={'카테고리 설정'}
            validationMode={'both'}
            isPopupRequestModal={true}
            initialSelectedCategories={filteringFourteenCategories} // 초기값 전달
          />
        </CustomBottomSheet>

        <CustomBottomSheet
          isVisible={showCalendar}
          onClose={() => setShowCalendar(false)}
          height={'70%'}
          title={'날짜 설정'}>
          <CalendarPicker
            openDate={openDate}
            closeDate={closeDate}
            onSelectDate={handleDateSelect}
            onClose={() => setShowCalendar(false)}
            type={isOpenDate ? 'start' : 'end'}
          />
        </CustomBottomSheet>

        <CustomBottomSheet
          isVisible={showTimePicker}
          onClose={() => setShowTimePicker(false)}
          height={'40%'}
          title={'시간 설정'}>
          <TimePicker
            initialStartTime={new Date()}
            initialEndTime={new Date()}
            onTimeSelect={handleTimeSelect}
            onClose={() => setShowTimePicker(false)}
            type={isOpenTime ? 'start' : 'end'}
          />
        </CustomBottomSheet>

        <PostalCodeModal
          isVisible={postcodeVisible}
          onClose={() => setPostcodeVisible(false)}
          onSelected={handlePostcode}
        />

        <RowButtonContainer>
          <SubmitButton onPress={onBackPress}>
            <SubmitButtonText>돌아가기</SubmitButtonText>
          </SubmitButton>
          <SubmitButton onPress={secondReportHandler}>
            <SubmitButtonText>다음</SubmitButtonText>
          </SubmitButton>
        </RowButtonContainer>
      </ScrollView>
    </ContentContainer>
  );
};

// Styled Components
const ContentContainer = styled.View`
  padding: ${moderateScale(10)}px;
  margin-bottom: ${moderateScale(40)}px;
`;

const InputSection = styled.View`
  margin-bottom: ${moderateScale(32)}px;
`;

const TitleText = styled.Text`
  font-size: ${moderateScale(20)}px;
  font-weight: 600;
  margin-bottom: ${moderateScale(32)}px;
  line-height: ${moderateScale(24)}px;
`;

export const SubTitleContainer = styled.View`
  background-color: ${theme => theme.theme.color.purple.mild};
  text-align: start;
  padding: ${moderateScale(6)}px;
`;
export const SubTitle = styled.Text`
  font-size: 18px;
  color: ${theme => theme.theme.color.purple.main};
  font-weight: bold;
`;

const InputLabel = styled.Text`
  font-size: ${moderateScale(14)}px;
  font-weight: 500;
  margin-bottom: ${moderateScale(8)}px;
  margin-top: ${moderateScale(20)}px;
`;

export const RequiredMark = styled.Text`
  color: red;
`;

const SelectionContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(16)}px;
`;
const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${props => props.theme.color.grey.main};
  border-radius: ${moderateScale(20)}px;
  margin-bottom: ${moderateScale(16)}px;
`;

const InputBigContainer = styled.View`
  flex-direction: row;
  border: 1px solid ${props => props.theme.color.grey.main};
  height: ${moderateScale(80)}px;
  border-radius: ${moderateScale(20)}px;
  margin-bottom: ${moderateScale(16)}px;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  padding: ${moderateScale(12)}px;
  font-size: ${moderateScale(16)}px;
`;

const StyledBigInput = styled.TextInput`
  flex: 1;
  padding: ${moderateScale(12)}px;
  text-align-vertical: top;
  min-height: ${moderateScale(80)}px;
  height: ${moderateScale(40)}px;
  font-size: ${moderateScale(14)}px;
`;

const ClearButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
  margin-right: ${moderateScale(8)}px;
`;
const ClearButtonText = styled.Text`
  font-size: ${moderateScale(20)}px;
  color: ${props => props.theme.color.grey.main};
`;
const AddressContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(8)}px;
`;

const AddressInput = styled.TextInput`
  flex: 1;
  padding: ${moderateScale(12)}px;
  border: 1px solid ${props => props.theme.color.grey.main};
  border-radius: ${moderateScale(20)}px;
  font-size: ${moderateScale(16)}px;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.color.blue.main};
  padding: ${moderateScale(12)}px ${moderateScale(16)}px;
  border-radius: ${moderateScale(20)}px;
`;

const SearchButtonText = styled.Text`
  color: white;
  font-size: ${moderateScale(14)}px;
`;

const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${moderateScale(16)}px;
`;

const DateButton = styled.TouchableOpacity`
  flex: 1;
  padding: ${moderateScale(12)}px;
  border: 1px solid ${props => props.theme.color.grey.main};
  border-radius: ${moderateScale(20)}px;
  align-items: center;
`;

const DateButtonText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${props => props.theme.color.grey.main};
`;

const DateSeparator = styled.Text`
  margin: 0 ${moderateScale(8)}px;
  font-size: ${moderateScale(16)}px;
  color: ${props => props.theme.color.grey.main};
`;

const TimeContainer = styled(DateContainer)`
  /* DateContainer와 동일한 스타일 재사용 */
`;

const TimeButton = styled(DateButton)`
  /* DateButton과 동일한 스타일 재사용 */
`;

const TimeText = styled(DateButtonText)`
  /* DateButtonText와 동일한 스타일 재사용 */
`;

const TimeSeparator = styled(DateSeparator)`
  /* DateSeparator와 동일한 스타일 재사용 */
`;

export const HelperText = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: ${props => props.theme.color.grey.main};
  margin-bottom: ${moderateScale(4)}px;
`;
export const SubmitButton = styled.TouchableOpacity<{disabled?: boolean}>`
  background-color: ${props =>
    props.disabled ? props.theme.color.grey.mild : props.theme.color.blue.main};
  width: 49%;
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(8)}px;
  align-items: center;
`;

export const SubmitButtonText = styled.Text`
  color: ${props =>
    props.disabled
      ? props.theme.color.grey.black
      : props.theme.color.grey.white};

  font-size: ${moderateScale(16)}px;
  font-weight: 600;
`;

export const ImageUploadSection = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(8)}px;
`;

export const ImageContainer = styled.View`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(100)}px;
  border-radius: ${moderateScale(8)}px;
  overflow: hidden;
  position: relative;
`;

const UploadedImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: ${moderateScale(4)}px;
  right: ${moderateScale(4)}px;
  width: ${moderateScale(20)}px;
  height: ${moderateScale(20)}px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: ${moderateScale(10)}px;
  justify-content: center;
  align-items: center;
`;

const DeleteButtonText = styled.Text`
  color: white;
  font-size: ${moderateScale(14)}px;
`;

export const ImageUploadButton = styled.TouchableOpacity`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(100)}px;
  border: 1px dashed ${props => props.theme.color.grey.main};
  border-radius: ${moderateScale(8)}px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${moderateScale(8)}px;
`;

const PlusIcon = styled.Text`
  font-size: ${moderateScale(24)}px;
  color: ${props => props.theme.color.grey.main};
  margin-bottom: ${moderateScale(4)}px;
`;

const UploadText = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: ${props => props.theme.color.grey.main};
  text-align: center;
`;

export const RowButtonContainer = styled.View`
  flex-direction: row;
  margin-top: ${moderateScale(12)}px;
  justify-content: space-between; // 또는 space-evenly, space-around
`;
export default ReportStepTwo;
