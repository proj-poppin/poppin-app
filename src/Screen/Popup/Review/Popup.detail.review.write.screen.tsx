import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {Screen} from '../../../Component/Screen/Screen.component';
import {themeColors} from 'src/Theme/theme';
import {moderateScale} from '../../../Util';
import CommonCompleteButton from '../Landing/common.complete.button';
import {ScreenHeader} from '../../../Component/View';
import styled from 'styled-components/native';
import ImageContainerRow from '../../../Component/ImageContainerRow';
import ReviewWriteTipSvg from 'src/Resource/svg/review-write-tip-mini-icon.svg';
import SvgWithNameBoxLabel from '../../../Component/SvgWithNameBoxLabel';
import OptionSingleButton from '../../../Component/Button/OptionSingleButton';

type VisitTime = '평일 오전' | '평일 오후' | '주말 오전' | '주말 오후';
type Satisfaction = '만족' | '보통' | '불만족';
type Congestion = '여유' | '보통' | '혼잡';

export const PopupDetailReviewWriteScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'PopupDetailEditScreen'>) => {
  const [selectedVisitTime, setSelectedVisitTime] = useState<VisitTime | null>(
    null,
  );
  const [selectedSatisfaction, setSelectedSatisfaction] =
    useState<Satisfaction | null>(null);
  const [selectedCongestion, setSelectedCongestion] =
    useState<Congestion | null>(null);
  const [etcInput, setEtcInput] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<{uri: string}[]>([]);

  const popup = 'popup' in route.params ? route.params.popup : undefined;
  const popupName = popup ? popup.name : 'Popup Detail';

  const selectedOption =
    selectedVisitTime && selectedSatisfaction && selectedCongestion;

  const characterCount = etcInput.length;
  const isOverLimit = characterCount > 100;

  const borderColor = isFocused
    ? themeColors().blue.main
    : isOverLimit
    ? themeColors().red.warning
    : themeColors().grey.mild;

  const handleEditSubmit = async () => {
    // Submit logic here
    navigation.goBack();
  };

  return (
    <Screen
      ScreenHeader={
        <ScreenHeader LeftComponents={'BACK_BUTTON'} title={'방문 후기 작성'} />
      }
      ScreenContent={
        <ContentContainer>
          <HeaderRow>
            <SectionTitle>{popupName}</SectionTitle>
          </HeaderRow>

          {/* Visit Time Section */}
          <View style={styles.sectionContainer}>
            <Text
              style={[styles.sectionLabel, {color: themeColors().purple.main}]}>
              방문 일시
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {(
                [
                  '평일 오전',
                  '평일 오후',
                  '주말 오전',
                  '주말 오후',
                ] as VisitTime[]
              ).map(time => (
                <OptionSingleButton
                  id={time.toString()}
                  key={time}
                  title={time}
                  onPress={() => setSelectedVisitTime(time)}
                  isSelected={selectedVisitTime === time}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.sectionContainer}>
            <Text
              style={[styles.sectionLabel, {color: themeColors().purple.main}]}>
              팝업 만족도
            </Text>
            <View style={styles.buttonsContainer}>
              {(['만족', '보통', '불만족'] as Satisfaction[]).map(
                satisfaction => (
                  <OptionSingleButton
                    id={satisfaction.toString()}
                    key={satisfaction}
                    title={satisfaction}
                    onPress={() => setSelectedSatisfaction(satisfaction)}
                    isSelected={
                      selectedSatisfaction === satisfaction
                    }></OptionSingleButton>
                ),
              )}
            </View>
          </View>

          {/* Congestion Section */}
          <View style={styles.sectionContainer}>
            <Text
              style={[styles.sectionLabel, {color: themeColors().purple.main}]}>
              혼잡도
            </Text>
            <View style={styles.buttonsContainer}>
              {(['여유', '보통', '혼잡'] as Congestion[]).map(congestion => (
                <OptionSingleButton
                  id={congestion.toString()}
                  key={congestion}
                  title={congestion}
                  onPress={() => setSelectedCongestion(congestion)}
                  isSelected={selectedCongestion === congestion}
                />
              ))}
            </View>
          </View>
          <TextInput
            style={{height: moderateScale(150)}}
            placeholder="팝업에 대한 후기를 입력해 주세요."
            placeholderTextColor={themeColors().grey.main}
            value={etcInput}
            onChangeText={setEtcInput}
            multiline
            borderColor={borderColor}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Text
            style={[styles.characterCount, isOverLimit && styles.overLimit]}>
            {characterCount}/200
          </Text>

          {/* Tip Section */}
          <TipContainer>
            <ReviewWriteTipSvg />
            <Text style={styles.tipTitle}>팝핀이 알려주는 후기작성 TIP!</Text>
          </TipContainer>
          <TipContentContainer>
            <TipText>
              •{' '}
              <Text style={{color: themeColors().blue.main}}>
                어떤 프로그램
              </Text>
              이 있었나요
            </TipText>
            <TipText>
              • <Text style={{color: themeColors().blue.main}}>혼잡도</Text>는
              어땠나요
            </TipText>
            <TipText>
              •{' '}
              <Text style={{color: themeColors().blue.main}}>나만의 꿀팁</Text>
              이 있나요
            </TipText>
          </TipContentContainer>

          <ImageContainerRow
            selectedImages={selectedImages}
            handleSelectImages={() => {}}
            handleRemoveImage={(index: number) =>
              setSelectedImages(prev => prev.filter((_, i) => i !== index))
            }
          />
        </ContentContainer>
      }
      BottomButton={
        <CommonCompleteButton
          onPress={handleEditSubmit}
          title="작성 완료"
          isDisabled={selectedOption === null}
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

// Tip Styles
const TipContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${moderateScale(10)}px;
`;

const TipContentContainer = styled.View`
  margin-bottom: ${moderateScale(20)}px;
`;

const TipText = styled.Text`
  color: ${themeColors().grey.main};
  font-size: ${moderateScale(14)}px;
  margin-bottom: ${moderateScale(5)}px;
`;

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  sectionLabel: {
    width: 65,
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  characterCount: {
    textAlign: 'right',
    marginTop: 5,
    fontSize: 14,
    color: themeColors().grey.main,
  },
  overLimit: {
    color: 'red',
  },
  tipTitle: {
    color: themeColors().blue.main,
    marginLeft: moderateScale(10),
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default PopupDetailReviewWriteScreen;
