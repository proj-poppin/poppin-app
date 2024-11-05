import CustomBottomSheet from '../../../../Component/BottomSheet/CustomBottomSheet';
import styled from 'styled-components/native';
import {moderateScale} from '../../../../Util';
import React, {useState} from 'react';
import {useImagePicker} from '../../../../hooks/useImagePicker';
import PopupCategoryModal from '../../../../Component/PopupCategoryModal';
import {
  HelperText,
  SubmitButton,
} from '../../../../Component/operatorRequest/ReportStepTwo';

export const MyPageReportUserScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [popupName, setPopupName] = useState('');
  const [category, setCategory] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const {
    images: imageFileUri,
    handleAddImages: openGallery,
    handleDeleteImage,
  } = useImagePicker({
    maxImages: 5,
    maxWidth: 512,
    maxHeight: 512,
  });
  return (
    <ContentContainer>
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
          <CustomBottomSheet
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            title={'제보하려는 팝업의 카테고리를 설정해주세요'}
            height={'70%'}>
            <PopupCategoryModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              //TODO-[규진] 백엔드 회의 후에 수정필요
              onApply={selectedFilters => console.log(selectedFilters)} // Apply handler
              onReset={() => console.log('카테고리 초기화')} // Reset handler
              buttonName={'제보하기'}
            />
          </CustomBottomSheet>
        </CategorySelectButton>
        <InputLabel>정보를 접한 사이트 주소</InputLabel>
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
      </InputSection>

      <SubmitButton>
        <SubmitButtonText>제보하기</SubmitButtonText>
      </SubmitButton>
    </ContentContainer>
  );
};

const ContentContainer = styled.View`
  padding: ${moderateScale(10)}px;
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

const InputLabel = styled.Text`
  font-size: ${moderateScale(14)}px;
  font-weight: 500;
  margin-bottom: ${moderateScale(8)}px;
`;

const RequiredMark = styled.Text`
  color: red;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${props => props.theme.color.grey.main};
  border-radius: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(16)}px;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  padding: ${moderateScale(12)}px;
  font-size: ${moderateScale(16)}px;
`;

const ClearButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
  margin-right: ${moderateScale(8)}px;
`;

const ClearButtonText = styled.Text`
  font-size: ${moderateScale(20)}px;
  color: ${props => props.theme.color.grey.main};
`;

const CategorySelectButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${moderateScale(12)}px;
  border: 1px solid ${props => props.theme.color.grey.main};
  border-radius: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(16)}px;
`;

const CategorySelectText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${props => props.theme.color.grey.main};
`;

const DownArrowText = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: ${props => props.theme.color.grey.main};
`;

const ImageUploadButton = styled.TouchableOpacity`
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

const SubmitButtonText = styled.Text`
  color: white;
  font-size: ${moderateScale(16)}px;
  font-weight: 600;
`;
// ImageUploadSection 컴포넌트 추가
const ImageUploadSection = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(8)}px;
`;

const ImageContainer = styled.View`
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

export default MyPageReportUserScreen;
