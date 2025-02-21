import React from 'react';
import styled from 'styled-components/native';
import CategorySelectButton from 'src/Components/Common/category.select.button';
import {moderateScale} from 'src/Util';

interface PreferenceCategoryProps {
  title: string;
  keys: string[];
  selectedTags: Record<string, boolean>;
  onToggleTag: (key: string) => void;
}

const PreferenceCategory: React.FC<PreferenceCategoryProps> = ({
  title,
  keys,
  selectedTags,
  onToggleTag,
}) => {
  return (
    <CategoryContainer>
      <CategoryTitleTextRow>
        <CategoryTitleText>{title}</CategoryTitleText>
        <CategorySubTitlePurpleText>
          1개 이상 선택해주세요
        </CategorySubTitlePurpleText>
      </CategoryTitleTextRow>
      <ButtonWrapper>
        {keys.map(key => (
          <CategorySelectButton
            key={key}
            preferenceKey={key}
            isSelected={selectedTags[key]}
            onPress={() => onToggleTag(key)}
          />
        ))}
      </ButtonWrapper>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.View`
  padding: 20px;
`;

const CategoryTitleTextRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CategoryTitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const CategorySubTitlePurpleText = styled.Text`
  font-size: ${moderateScale(12)}px;
  font-weight: 500;
  margin-left: ${moderateScale(5)}px;
  color: ${({theme}) => theme.color.purple.main};
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export default PreferenceCategory;
