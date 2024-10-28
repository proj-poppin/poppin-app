import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {Screen} from '../../../Component/Screen/Screen.component';
import {themeColors} from 'src/Theme/theme';
import {moderateScale} from '../../../Util';
import CommonCompleteButton from '../Landing/common.complete.button';
import {ScreenHeader} from '../../../Component/View';
import styled from 'styled-components/native';
import ImageContainerRow from '../../../Component/ImageContainerRow';
import {Text} from 'react-native';

export const PopupDetailEditScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'PopupDetailEditScreen'>) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [etcInput, setEtcInput] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<{uri: string}[]>([]);

  // Use type narrowing to ensure popup exists
  const popup = 'popup' in route.params ? route.params.popup : undefined;
  const popupName = popup ? popup.name : 'Popup Detail';

  const characterCount = etcInput.length;
  const isOverLimit = characterCount > 100;

  const borderColor = isFocused
    ? themeColors().blue.main
    : isOverLimit
    ? themeColors().red.warning
    : themeColors().grey.mild;

  const handleOptionPress = (index: number) => {
    setSelectedOption(index);
  };

  const handleEditSubmit = async () => {
    if (editing || selectedOption === null) return;
    setEditing(true);
    setEditing(false);
    navigation.goBack();
  };

  const handleEtcInputChange = (text: string) => {
    if (text.length <= 100) {
      setEtcInput(text);
    }
  };

  const handleSelectImages = () => {
    // Implement image selection logic
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
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
          <TextInput
            style={{height: moderateScale(150)}}
            placeholder="수정이 필요한 정보를 작성해 주세요."
            placeholderTextColor={themeColors().grey.main}
            value={etcInput}
            onChangeText={handleEtcInputChange}
            multiline
            borderColor={borderColor}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <ImageContainerRow
            selectedImages={selectedImages}
            handleSelectImages={handleSelectImages}
            handleRemoveImage={handleRemoveImage}
          />
          <Text style={[{marginTop: 10}, {color: themeColors().grey.main}]}>
            *문의사항은 접수 후 수정이 불가합니다.{'\n'}
            *첨부파일은 20MB 이하의 파일만 첨부가능하며, 최대 5개까지
            등록가능합니다.{'\n'}
            *이미지에 개인정보가 보이지않도록 주의 바랍니다.{'\n'}
            *고의로 잘못된 정보를 입력하여 다른 소비자들에게 오해와 혼동을
            일으키고 기업의 이미지를 훼손시킬 경우 민/형사상 책임을 물을 수
            있습니다.{'\n'}
          </Text>
        </ContentContainer>
      }
      BottomButton={
        <CommonCompleteButton
          onPress={handleEditSubmit}
          title={editing ? '요청 중...' : '요청하기'}
          isDisabled={editing || selectedOption === null}
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
  margin-bottom: ${moderateScale(30)}px;
`;

const SectionTitle = styled.Text`
  font-size: ${moderateScale(16)}px;
  font-weight: 600;
`;

const TextInput = styled.TextInput<{borderColor?: string}>`
  border-width: 1px;
  border-color: ${({borderColor}) => borderColor || themeColors().grey.mild};
  border-radius: ${moderateScale(8)}px;
  padding: ${moderateScale(8)}px;
  margin-top: ${moderateScale(12)}px;
  margin-bottom: ${moderateScale(6)}px;
  text-align-vertical: top;
  min-height: ${moderateScale(80)}px;
  color: ${themeColors().grey.black};
  font-size: ${moderateScale(14)}px;
`;

export default PopupDetailEditScreen;
