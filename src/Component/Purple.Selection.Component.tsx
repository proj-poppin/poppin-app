import React from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import Check from 'src/Resource/svg/selected-option-white-check.svg';
import {themeColors} from '../Theme/theme';
import {H2, H3} from '../StyledComponents/Text';
import {moderateScale} from '../Util'; // 체크 아이콘

// Define types for the props
interface PurpleCheckSelectionProps {
  isSelected: boolean;
  label: string; // 오른쪽에 표시될 텍스트
  onClicked: () => void; // 클릭 시 호출될 함수
  style?: StyleProp<ViewStyle>;
}

const PurpleCheckSelectionRow: React.FC<PurpleCheckSelectionProps> = ({
  isSelected,
  label,
  onClicked,
  style,
}) => {
  return (
    <Pressable onPress={onClicked}>
      <FilterContainer style={style}>
        <Circle isSelected={isSelected}>{isSelected && <CheckIcon />}</Circle>
        <FilterLabel>{label}</FilterLabel>
      </FilterContainer>
    </Pressable>
  );
};

export default PurpleCheckSelectionRow;

// Styled Components
const FilterContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Circle = styled.View<{isSelected: boolean}>`
  width: ${moderateScale(22)}px;
  height: ${moderateScale(22)}px;
  border-radius: ${moderateScale(11)}px;
  border-width: ${moderateScale(1.2)}px;
  border-color: ${themeColors().purple.main};
  background-color: ${props =>
    props.isSelected ? themeColors().purple.main : themeColors().grey.white};
  justify-content: center;
  align-items: center;
`;

const CheckIcon = styled(Check)`
  position: absolute;
`;

const FilterLabel = styled(H3)`
  margin-left: ${moderateScale(8)}px;
`;
