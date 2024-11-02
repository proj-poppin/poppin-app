import CustomBottomSheet from '../../../../Component/BottomSheet/CustomBottomSheet';
import styled from 'styled-components/native';
import {moderateScale} from '../../../../Util';
import React, {useState} from 'react';
import {useImagePicker} from '../../../../hooks/useImagePicker';
import Postcode from '@actbase/react-daum-postcode';
import {ScrollView} from 'react-native';
import CalendarPicker from '../../../../Component/CalendarPicker';
import TimePicker from '../../../../Component/TimePicker';
import PopupCategoryModal from '../../../../Component/PopupCategoryModal';
import CloseIcon from '../../../../Resource/svg/close-icon.svg';

export const MyPageReportUserScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [postcodeVisible, setPostcodeVisible] = useState(false);
  const [popupName, setPopupName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateType, setDateType] = useState<'start' | 'end'>('start');
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerType, setTimePickerType] = useState<'start' | 'end'>(
    'start',
  );
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [timeDetail, setTimeDetail] = useState('');

  const formatDate = (dateString?: string) => {
    if (!dateString) return '날짜 선택';
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleDateSelect = (type: 'start' | 'end', date: string) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const handleTimeSelect = (type: 'start' | 'end', time: Date) => {
    if (type === 'start') {
      setStartTime(time);
    } else {
      setEndTime(time);
    }
  };

  const {
    images: imageFileUri,
    handleAddImages: openGallery,
    handleDeleteImage,
  } = useImagePicker({
    maxImages: 5,
    maxWidth: 512,
    maxHeight: 512,
  });

  const handlePostcode = (data: any) => {
    setAddress(data.address);
    setPostcodeVisible(false);
  };

  return (
    <ContentContainer>
      <ScrollView>
        <InputSection>
          <TitleText>POPPIN이 모르는 새로운{'\n'}팝업을 알려주세요</TitleText>
          <InputLabel>
            팝업 이름<RequiredMark>*</RequiredMark>
          </InputLabel>
          <InputContainer>
            <StyledInput
              placeholder="팝업 이름을 입력해주세요"
              value={popupName}
              onChangeText={setPopupName}
            />
            <ClearButton onPress={() => setPopupName('')}>
              <ClearButtonText>×</ClearButtonText>
            </ClearButton>
          </InputContainer>

          {/*카테고리 설정 */}
          <InputLabel>
            카테고리<RequiredMark>*</RequiredMark>
          </InputLabel>
          <CategorySelectButton
            onPress={() => {
              setModalVisible(true);
            }}>
            <CategorySelectText>
              {category || '카테고리를 선택해주세요'}
            </CategorySelectText>
            <DownArrowText>▼</DownArrowText>
          </CategorySelectButton>

          {/* 날짜 선택 버튼 */}
          <InputLabel>
            운영 날짜<RequiredMark>*</RequiredMark>
          </InputLabel>
          <DateContainer>
            <DateButton
              onPress={() => {
                setDateType('start');
                setShowCalendar(true);
              }}>
              <DateButtonText>
                {formatDate(startDate) || '시작일'}
              </DateButtonText>
            </DateButton>
            <DateSeparator>~</DateSeparator>
            <DateButton
              onPress={() => {
                setDateType('end');
                setShowCalendar(true);
              }}>
              <DateButtonText>{formatDate(endDate) || '종료일'}</DateButtonText>
            </DateButton>
          </DateContainer>

          <CustomBottomSheet
            isVisible={showCalendar}
            onClose={() => setShowCalendar(false)}
            height={'70%'}
            title={'날짜 설정'}>
            <CalendarPicker
              type={dateType}
              startDate={startDate}
              endDate={endDate}
              onSelectDate={handleDateSelect}
              onClose={() => setShowCalendar(false)}
            />
          </CustomBottomSheet>

          {/*운영 시간 스크롤로 설정할 수 있게*/}
          <InputLabel>
            운영 시간<RequiredMark>*</RequiredMark>
          </InputLabel>
          <TimeContainer>
            <TimeButton
              onPress={() => {
                setTimePickerType('start');
                setShowTimePicker(true);
              }}>
              <TimeText>{formatTime(startTime)}</TimeText>
            </TimeButton>
            <TimeSeparator>~</TimeSeparator>
            <TimeButton
              onPress={() => {
                setTimePickerType('end');
                setShowTimePicker(true);
              }}>
              <TimeText>{formatTime(endTime)}</TimeText>
            </TimeButton>
          </TimeContainer>

          {/*운영 시간 스크롤로 설정할 수 있게*/}
          <InputLabel>운영 시간외 예외 사항</InputLabel>
          <InputBigContainer>
            <StyledBigInput
              placeholder={
                '운영 시간 외 예외사항이 있다면 작성해 주세요.\nex) 마지막 날에는 5시에 조기 마감'
              }
              numberOfLines={2}
              multiline={true}
              value={timeDetail}
              onChangeText={setTimeDetail}
              textAlignVertical="top"
            />
            <ClearButton onPress={() => setTimeDetail('')}>
              <ClearButtonText>×</ClearButtonText>
            </ClearButton>
          </InputBigContainer>

          <CustomBottomSheet
            isVisible={showTimePicker}
            onClose={() => setShowTimePicker(false)}
            height={'40%'}
            title={'시간 설정'}>
            <TimePicker
              initialStartTime={startTime}
              initialEndTime={endTime}
              type={timePickerType}
              onTimeSelect={handleTimeSelect}
              onClose={() => setShowTimePicker(false)}
            />
          </CustomBottomSheet>
          <InputLabel>
            주소<RequiredMark>*</RequiredMark>
          </InputLabel>
          <AddressContainer>
            <AddressInput
              value={address}
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
              value={detailAddress}
              onChangeText={setDetailAddress}
            />
          </InputContainer>

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

          <InputLabel>
            공식 사이트 주소 <RequiredMark>*</RequiredMark>
          </InputLabel>
          <InputContainer>
            <StyledInput
              placeholder="URL을 입력해주세요"
              value={siteUrl}
              onChangeText={setSiteUrl}
            />
            <ClearButton onPress={() => setSiteUrl('')}>
              <ClearButtonText>×</ClearButtonText>
            </ClearButton>
          </InputContainer>

          <InputLabel>
            관련사진<RequiredMark>*</RequiredMark>
          </InputLabel>
          <ImageUploadSection>
            {imageFileUri?.map((image, index) => (
              <ImageContainer key={image.uri}>
                <UploadedImage source={{uri: image.uri}} />
                <DeleteButton onPress={() => handleDeleteImage(index)}>
                  <DeleteButtonText>×</DeleteButtonText>
                </DeleteButton>
              </ImageContainer>
            ))}
            {(!imageFileUri || imageFileUri.length < 5) && (
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
            //TODO-[규진] 백엔드 회의 후에 수정필요
            onApply={selectedFilters =>
              console.log(
                `카테고리 제보 : ${selectedFilters.selectedCategories} \n 타입 제보 : ${selectedFilters.selectedPopupTypes}`,
              )
            }
            onReset={() => console.log('카테고리 초기화')}
            buttonName={'제보하기'}
          />
        </CustomBottomSheet>

        <SubmitButton>
          <SubmitButtonText>제보하기</SubmitButtonText>
        </SubmitButton>
      </ScrollView>
    </ContentContainer>
  );
};

export const ContentContainer = styled.View`
  padding: ${moderateScale(20)}px ${moderateScale(20)}px;
  margin-bottom: ${moderateScale(40)}px;
`;

const TitleText = styled.Text`
  font-size: ${moderateScale(24)}px;
  font-weight: bold;
  margin-bottom: ${moderateScale(32)}px;
  line-height: ${moderateScale(34)}px;
`;

const InputSection = styled.View`
  margin-bottom: ${moderateScale(32)}px;
`;

export const InputLabel = styled.Text`
  font-size: ${moderateScale(14)}px;
  font-weight: 500;
  margin-bottom: ${moderateScale(8)}px;
  margin-top: ${moderateScale(20)}px;
`;
const RequiredMark = styled.Text`
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
  text-align-vertical: top; // 텍스트를 상단에서 시작하도록 설정

  height: ${moderateScale(40)}px;
  font-size: ${moderateScale(14)}px;
`;
const CloseIconContainer = styled.Pressable`
  position: absolute;
  top: ${moderateScale(10)}px;
  right: ${moderateScale(30)}px;
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  z-index: 999;
`;
const CategorySelectButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${moderateScale(12)}px;
  border: 1px solid ${props => props.theme.color.grey.main};
  border-radius: ${moderateScale(20)}px;
  margin-bottom: ${moderateScale(16)}px;
`;
const DownArrowText = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: ${props => props.theme.color.grey.main};
`;
const CategorySelectText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${props => props.theme.color.grey.main};
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

export default MyPageReportUserScreen;
