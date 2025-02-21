import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import CategorySelectButton from 'src/Components/Common/category.select.button';
import {
  preferenceKeysForPopupCategory,
  preferenceKeysForPopupInterest,
  preferenceKeysForPopupMate,
  getPreferenceTitle,
} from 'src/Object/preference.enum';

interface PreferenceCategorySelectionProps {
  currentStep: number;
  nickname: string;
  draftSelectedTags: Record<string, boolean>;
  toggleTag: (key: string) => void;
}

const categories = [
  preferenceKeysForPopupCategory,
  preferenceKeysForPopupInterest,
  preferenceKeysForPopupMate,
];

const PreferenceCategorySelection: React.FC<
  PreferenceCategorySelectionProps
> = ({currentStep, nickname, draftSelectedTags, toggleTag}) => {
  const stepTexts = [
    `${nickname}님이 \n선호하는 팝업을 알려주세요`,
    `${nickname}님의 관심사가 궁금해요`,
    `${nickname}님은\n주로 누구와 팝업에 방문하시나요?`,
  ];

  return (
    <>
      <PreferenceSettingMotivationText>
        {stepTexts[currentStep - 1]}
      </PreferenceSettingMotivationText>
      <CenterCategoryContainer>
        <MultipleChoicePossibleBlueText>
          *복수 선택 가능
        </MultipleChoicePossibleBlueText>
        <CategoryWrapper>
          {categories[currentStep - 1].map(key => (
            <CategorySelectButton
              key={key}
              preferenceKey={key}
              isSelected={draftSelectedTags[key]}
              onPress={() => toggleTag(key)}>
              {getPreferenceTitle(key)}
            </CategorySelectButton>
          ))}
        </CategoryWrapper>
      </CenterCategoryContainer>
      <GreyText>마이페이지에서 언제든지 수정할 수 있어요!</GreyText>
    </>
  );
};

const CenterCategoryContainer = styled.View`
  margin-top: ${moderateScale(100)}px;
  justify-content: center;
  align-items: center;
`;

const PreferenceSettingMotivationText = styled.Text`
  color: ${({theme}) => theme.color.grey.black};
  font-size: ${moderateScale(24)}px;
  font-weight: 600;
  margin-top: ${moderateScale(20)}px;
  text-align: center;
`;

const MultipleChoicePossibleBlueText = styled.Text`
  color: ${({theme}) => theme.color.blue.main};
  font-size: ${moderateScale(12)}px;
  font-weight: 400;
`;

const GreyText = styled.Text`
  color: ${({theme}) => theme.color.grey.main};
  font-size: ${moderateScale(12)}px;
  font-weight: 400;
  text-align: center;
  margin-top: ${moderateScale(10)}px;
`;

const CategoryWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${moderateScale(8)}px;
  margin: ${moderateScale(16)}px 0;
`;

export default PreferenceCategorySelection;
