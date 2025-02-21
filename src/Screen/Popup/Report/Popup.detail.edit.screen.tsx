import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {Screen} from '../../../Component/Screen/Screen.component';
import {getGalleryImages, moderateScale} from '../../../Util';
import CommonCompleteButton from 'src/Components/Common/common.complete.button';
import {ScreenHeader} from '../../../Component/View';
import styled from 'styled-components/native';
import {PopupSchema} from "../../../Schema/Popup/popup.schema";
import {HelperText} from "../../../Component/MyPage/Report/ReportStepTwo";
import {Asset} from "react-native-image-picker";
import {useUserStore} from "../../../Zustand/User/user.zustand";
import shallow from "zustand/shallow";

export type PopupDetailEditScreenProps = {
  popup ?: PopupSchema
}

export const PopupDetailEditScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'PopupDetailEditScreen'>) => {
  const [requesting, setRequesting] = useState<boolean>(false);
  const [requestText, setRequestText] = useState<string>('');
  const [requestImages,setRequestImages] = useState<Asset[]>([]);
  const {requestModifyPopup} = useUserStore(
      state => ({
        requestModifyPopup:state.requestModifyPopup,
      }),
      shallow,
  );

  // Use type narrowing to ensure popup exists
  const popup = route.params.popup
  const popupName = popup ? popup.name : 'Popup Detail';

  const handleEditSubmit = async () => {
    if (requesting || requestImages.length === 0) return;
    setRequesting(true);

    const formData = new FormData();
    const contents = {'popupId': popup!.id,'content':requestText};
    formData.append('contents',JSON.stringify(contents));

    requestImages?.forEach((image, index) => {
      if (image.uri) {
        formData.append('images', {
          uri: image.uri,
          type: image.type || 'image/jpeg',
          name: image.fileName || `image${index}.jpg`,
        } as any);
      }
    });

    const result = await requestModifyPopup(formData);

    if(result){
      //TODO 모달 제작
      navigation.goBack();
    }
    setRequesting(false);
  };

  const handleEtcInputChange = (text: string) => {
    if (text.length <= 100) {
      setRequestText(text);
    }
  };

  const handleAddImages = async () => {
    const images = await getGalleryImages({
      sectionLimit: 5 - requestImages.length,
      requestRationale: {
        title: '카메라 권한 필요',
        message: '후기 작성하기를 위해 카메라 권한이 필요합니다.',
        buttonPositive: '확인',
      },
    });
    if (images) {
      setRequestImages([...requestImages, ...images]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = requestImages.filter((_, i) => i !== index);
    setRequestImages(updatedImages);
  };

  return (
    <Screen
      ScreenHeader={
        <ScreenHeader LeftComponents={'BACK_BUTTON'} title={'정보 수정 요청'} />
      }
      ScreenContent={
        <ContentContainer>
          <HeaderRow>
            <SectionTitle>{popupName}</SectionTitle>
          </HeaderRow>
          <MinimumLength isValid={requestText.length >= 10}>
            ✓10자 이상
          </MinimumLength>
          <TextInput
            placeholder="수정이 필요한 정보를 작성해 주세요."
            value={requestText}
            onChangeText={handleEtcInputChange}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <ImageUploadSection>
            {requestImages.map((image, index) => (
                <ImageContainer key={image.uri}>
                  <UploadedImage source={{uri: image.uri}} />
                  <DeleteButton onPress={() => handleDeleteImage(index)}>
                    <DeleteButtonText>×</DeleteButtonText>
                  </DeleteButton>
                </ImageContainer>
            ))}
            {(!requestImages || requestImages.length < 5) && (
                <ImageUploadButton onPress={handleAddImages}>
                  <PlusIcon>+</PlusIcon>
                  <UploadText>
                    사진 추가하기{'\n'}
                    (최대 5장)
                  </UploadText>
                </ImageUploadButton>
            )}
          </ImageUploadSection>
       <HelperText>*문의사항은 접수 후 수정이 불가합니다.</HelperText>
       <HelperText>  *첨부파일은 20MB 이하의 파일만 첨부가능하며, 최대 5개까지
         등록가능합니다.
       </HelperText>
       <HelperText>*이미지에 개인정보가 보이지않도록 주의 바랍니다.</HelperText>
       <HelperText>*고의로 잘못된 정보를 입력하여 다른 소비자들에게 오해와 혼동을
         일으키고 기업의 이미지를 훼손시킬 경우 민/형사상 책임을 물을 수
         있습니다.
       </HelperText>
        </ContentContainer>
      }
      BottomButton={
        <CommonCompleteButton
          onPress={handleEditSubmit}
          title={requesting ? '요청 중...' : '요청하기'}
          isDisabled={requesting || requestText.length < 10}
        />
      }
    />
  );
};

// Styled Components
const ContentContainer = styled.View`
  padding: ${moderateScale(16)}px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${moderateScale(15)}px;
`;

const SectionTitle = styled.Text`
  font-size: ${moderateScale(16)}px;
  font-weight: 600;
`;

const TextInput = styled.TextInput`
  border: 1px solid ${props => props.theme.color.grey.mild};
  border-radius: ${moderateScale(8)}px;
  padding: ${moderateScale(12)}px;
  height: ${moderateScale(150)}px;
  font-size: ${moderateScale(16)}px;
`;

const ImageUploadSection = styled.View`
  margin-top: ${moderateScale(24)}px;

  flex-direction: row;
  flex-wrap: wrap;
  gap: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(8)}px;
`;

const MinimumLength = styled.Text<{isValid: boolean}>`
  color: ${props =>
    props.isValid ? props.theme.color.blue.main : props.theme.color.grey.main};
  font-size: ${moderateScale(14)}px;
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
  color: ${props => props.theme.color.grey.white};
  font-size: ${moderateScale(14)}px;
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




export default PopupDetailEditScreen;
