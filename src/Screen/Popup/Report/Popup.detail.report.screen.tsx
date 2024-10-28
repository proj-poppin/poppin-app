import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {Screen} from '../../../Component/Screen/Screen.component';
import {themeColors} from 'src/Theme/theme';
import {moderateScale} from '../../../Util';
import PurpleCheckSelectionRow from '../../../Component/Purple.Selection.Component';
import CommonCompleteButton from '../Landing/common.complete.button';
import {PopupReportOptions} from '../../../Constant/popup.constant';
import {ScreenHeader} from '../../../Component/View';
import styled from 'styled-components/native';

export const PopupDetailReportScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'PopupDetailReportScreen'>) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [reporting, setReporting] = useState<boolean>(false);
  const [etcInput, setEtcInput] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

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

  const handleReportSubmit = async () => {
    if (reporting || selectedOption === null) return;
    setReporting(true);
    setReporting(false);
    navigation.goBack();
  };

  const handleEtcInputChange = (text: string) => {
    if (text.length <= 100) {
      setEtcInput(text);
    }
  };

  return (
    <Screen
      ScreenHeader={
        <ScreenHeader LeftComponents={'BACK_BUTTON'} title={'신고하기'} />
      }
      ScreenContent={
        <ContentContainer>
          <HeaderRow>
            <SectionTitle>신고 사유를 알려주세요</SectionTitle>
          </HeaderRow>
          {PopupReportOptions.map((option, index) => (
            <OptionContainer
              key={index}
              noBorder={index === PopupReportOptions.length - 1}>
              <PurpleCheckSelectionRow
                style={{height: moderateScale(40)}}
                isSelected={selectedOption === index}
                label={option}
                onClicked={() => handleOptionPress(index)}
              />
            </OptionContainer>
          ))}
          {selectedOption === PopupReportOptions.length - 1 && (
            <>
              <EtcInput
                placeholder="신고 사유를 알려주세요."
                placeholderTextColor={themeColors().grey.main}
                value={etcInput}
                onChangeText={handleEtcInputChange}
                multiline
                borderColor={borderColor}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <CharacterCount isOverLimit={isOverLimit}>
                {characterCount}/100
              </CharacterCount>
            </>
          )}
          <NoteText>*문의사항은 접수 후 수정이 불가능합니다.</NoteText>
          <NoteText>
            *최대 24시간 이내에 검토 후 조치하도록 하겠습니다.
          </NoteText>
        </ContentContainer>
      }
      BottomButton={
        <CommonCompleteButton
          onPress={handleReportSubmit}
          title={reporting ? '신고 중...' : '신고하기'}
          isDisabled={reporting || selectedOption === null}
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

const OptionContainer = styled.View<{noBorder?: boolean}>`
  border-bottom-width: ${({noBorder}) => (noBorder ? '0' : '2px')};
  border-bottom-color: ${themeColors().grey.component};
  padding-bottom: ${moderateScale(10)}px;
`;

const EtcInput = styled.TextInput<{borderColor?: string}>`
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

const CharacterCount = styled.Text<{isOverLimit: boolean}>`
  text-align: right;
  font-size: ${moderateScale(12)}px;
  color: ${({isOverLimit}) =>
    isOverLimit ? themeColors().red.warning : themeColors().grey.main};
`;

const NoteText = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: ${themeColors().grey.main};
  margin-top: ${moderateScale(4)}px;
`;

export default PopupDetailReportScreen;
