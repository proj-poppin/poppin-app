// components/StepTwo.tsx
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import {HHMMFormatTime, moderateScale, YYYYHHMMFormatDate} from '../../../Util';
import CustomBottomSheet from '../../BottomSheet/CustomBottomSheet';
import Postcode from '@actbase/react-daum-postcode';
import CalendarPicker from '../../CalendarPicker';
import TimePicker from '../../TimePicker';
import PopupCategoryModal from '../../PopupCategoryModal';
import CloseIcon from '../../../Resource/svg/close-icon.svg';
import {useImagePicker} from '../../../hooks/useImagePicker';
import {useReportStore} from '../../../Screen/MyPage/Report/Operator/Mypage.report.operator.zustand';
import {StepProps} from './ReportStepOne';
import CustomBottomSheetButton from '../../BottomSheet/CustomBottomSheetButton';
const ReportStepTwo: React.FC<StepProps> = ({onNext, onBackPress}) => {
  const {
    // State
    modalVisible,
    postcodeVisible,
    storeName,
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
    setStoreAddress,
    setStoreDetailAddress,
    setStoreUrl,
    setOpenDate,
    setCloseDate,
    setOpenTime,
    setCloseTime,
    setOperationException,
    setImages,
    setLatitude,
    setLongitude,
    setCategories,
  } = useReportStore();

  const {
    images,
    handleAddImages: openGallery,
    handleDeleteImage,
  } = useImagePicker({
    maxImages: 5,
    maxWidth: 512,
    maxHeight: 512,
  });

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
    // 카카오 우편번호 API에서 위도/경도 정보도 받아와서 설정
    setLatitude(data.latitude);
    setLongitude(data.longitude);
    setPostcodeVisible(false);
  };

  const handleCategorySelect = (selectedCategories: string) => {
    setCategories(selectedCategories);
    setModalVisible(false);
  };

  const secondReportHandler = () => {
    setImages(images);
    onNext();
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
          />

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
                '운영 시간 외 예외사항이 있다면 작성해 주세요.\nex) 마지막 날에는 5시에 조기 마감'
              }
              numberOfLines={2}
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
            />
            <SearchButton onPress={() => setPostcodeVisible(true)}>
              <SearchButtonText>우편 번호 검색</SearchButtonText>
            </SearchButton>
          </AddressContainer>
          <InputContainer>
            <StyledInput
              placeholder="상세 주소를 입력해주세요"
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
          height={'70%'}>
          <PopupCategoryModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onApply={handleCategorySelect}
            onReset={() => {}}
            buttonName={'카테고리 설정'}
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

        {postcodeVisible && (
          <PostcodeModal>
            <CloseIconContainer onPress={() => setPostcodeVisible(false)}>
              <CloseIcon />
            </CloseIconContainer>
            <Postcode
              style={{width: '100%', height: '50%', position: 'relative'}}
              jsOptions={{animation: false}}
              onSelected={handlePostcode}
              onError={(error: any) => console.log(error)}
            />
          </PostcodeModal>
        )}

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
  font-size: ${moderateScale(24)}px;
  font-weight: bold;
  margin-bottom: ${moderateScale(32)}px;
  line-height: ${moderateScale(34)}px;
`;

export const SubTitleContainer = styled.View`
  background-color: ${theme => theme.theme.color.purple.mild};
  align-items: center;
  padding: ${moderateScale(10)}px;
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

const PostcodeModal = styled.View`
  position: absolute;
  padding: ${moderateScale(24)}px;
  background-color: ${props => props.theme.color.grey.white};
  top: ${moderateScale(70)}px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;
const CloseIconContainer = styled.TouchableOpacity`
  position: absolute;
  top: ${moderateScale(20)}px;
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

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.color.grey.main};
  width: 49%;
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(8)}px;
  align-items: center;
`;

export const SubmitButtonText = styled.Text`
  color: white;
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
