import React from 'react';
import styled from 'styled-components/native';
import {getPreferenceTitle} from '../../Object/preference.enum';
import DownArrowGrayIcon from 'src/Resource/svg/down-arrow-gray-icon.svg';
import {moderateScale} from '../../Util';

/**
 * CustomBottomSheet를 호출하는 버튼입니다.
 * ex) Text를 통해서 내부 버튼에 들어갈 텍스트를 입력합니다.
 * onPress 를 통해서 해당 버튼을 눌렀을 시에, 모달창이 띄워지게끔 해줍니다.
 * @author 홍규진
 */
interface CustomBottomSheetButtonProps {
  text: string;
  onPress: () => void;
  selected?: boolean;
  filteringFourteenCategories?: string;
  filteringAge?: string; // 연령 prop 추가
}
const getAgeLabel = (age: string): string => {
  switch (age) {
    case 'G_RATED':
      return '전체';
    case 'PG_7':
      return '7세 이상';
    case 'PG_12':
      return '12세 이상';
    case 'PG_15':
      return '15세 이상';
    case 'PG_18':
      return '성인';
    default:
      return '';
  }
};
const CustomBottomSheetButton: React.FC<CustomBottomSheetButtonProps> = ({
  text = '선택해주세요',
  onPress,
  selected = false,
  filteringFourteenCategories = '',
  filteringAge = '',
}) => {
  const selectedCategories = filteringFourteenCategories
    ? filteringFourteenCategories.split(',').filter(Boolean)
    : [];

  const hasSelections = selectedCategories.length > 0 || !!filteringAge;

  const renderContent = () => {
    if (filteringAge) {
      return (
        <CategoryList>
          <CategoryItem>
            <CategoryText>{getAgeLabel(filteringAge)}</CategoryText>
          </CategoryItem>
        </CategoryList>
      );
    }

    if (selectedCategories.length > 0) {
      return (
        <CategoryList>
          {selectedCategories.map((category, index) => (
            <CategoryItem key={index}>
              <CategoryText>{getPreferenceTitle(category)}</CategoryText>
            </CategoryItem>
          ))}
        </CategoryList>
      );
    }

    return <ButtonText selected={selected}>{text}</ButtonText>;
  };

  return (
    <ButtonContainer onPress={onPress} selected={hasSelections}>
      <ContentContainer>{renderContent()}</ContentContainer>
      <ArrowIconContainer>
        <DownArrowGrayIcon />
      </ArrowIconContainer>
    </ButtonContainer>
  );
};

interface StyledProps {
  selected?: boolean;
}

const ButtonContainer = styled.TouchableOpacity<StyledProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 24px;
  border: 1px solid ${props => props.theme.color.grey.main};
  min-height: ${moderateScale(24)}px;
`;

const ContentContainer = styled.View`
  flex: 1;
  margin-right: 8px;
`;

const ButtonText = styled.Text<StyledProps>`
  font-size: 16px;
  color: ${props => props.theme.color.grey.main};
`;

const ArrowIcon = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.color.grey.white};
`;

const CategoryList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryItem = styled.View`
  border-color: ${props => props.theme.color.grey.mild};
  border-width: 1px;
  padding: 4px 8px;
  border-radius: 12px;
`;

const CategoryText = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.color.grey.black};
`;
const ArrowIconContainer = styled.View`
  justify-content: center;
  width: ${moderateScale(20)}px;
  align-items: center;
`;
export default CustomBottomSheetButton;
