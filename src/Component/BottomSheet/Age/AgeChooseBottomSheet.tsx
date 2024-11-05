import React from 'react';
import styled from 'styled-components/native';
import {View, TouchableWithoutFeedback} from 'react-native';
import {moderateScale} from '../../../Util';

interface AgeGroupModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (selectedAges: string[]) => void;
  selectedAges: string[];
}

const AgeChooseBottomSheet: React.FC<AgeGroupModalProps> = ({
  onClose,
  onApply = console.log(''),
  selectedAges,
}) => {
  const [selected, setSelected] = React.useState<string[]>(selectedAges);

  const ageGroups = [
    {id: 'all', label: '😀 전체'},
    {id: '7up', label: '🐥 7세 이상'},
    {id: '12up', label: '👧🏻 12세 이상'},
    {id: '15up', label: '🏃 15세 이상'},
    {id: 'adult', label: '🍷 성인'},
  ];

  const handleSelect = (ageId: string) => {
    if (ageId === 'all') {
      setSelected(['all']);
    } else {
      const newSelected = selected.includes(ageId)
        ? selected.filter(id => id !== ageId)
        : [...selected.filter(id => id !== 'all'), ageId];
      setSelected(newSelected);
    }
  };

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  return (
    <ModalContainer>
      <ModalOverlay>
        <TouchableWithoutFeedback onPress={onClose}>
          <BackgroundDim />
        </TouchableWithoutFeedback>
        <ModalContent>
          <OptionsContainer>
            {ageGroups.map(age => (
              <AgeOption
                key={age.id}
                onPress={() => handleSelect(age.id)}
                isSelected={selected.includes(age.id)}>
                <AgeOptionText isSelected={selected.includes(age.id)}>
                  {age.label}
                </AgeOptionText>
              </AgeOption>
            ))}
          </OptionsContainer>

          <ApplyButton onPress={handleApply}>
            <ApplyButtonText>확인</ApplyButtonText>
          </ApplyButton>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer>
  );
};
const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const BackgroundDim = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  background-color: white;
  border-top-left-radius: ${moderateScale(20)}px;
  border-top-right-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(30)}px;
`;

const OptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${moderateScale(10)}px;
  margin-bottom: ${moderateScale(20)}px;
`;

interface OptionProps {
  isSelected: boolean;
}

const AgeOption = styled.TouchableOpacity<OptionProps>`
  padding: ${moderateScale(10)}px ${moderateScale(20)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${props => (props.isSelected ? '#E8F3FF' : '#F8F8F8')};
  border: ${moderateScale(1)}px solid
    ${props => (props.isSelected ? '#2D9CDB' : 'transparent')};
`;

const AgeOptionText = styled.Text<OptionProps>`
  color: ${props => (props.isSelected ? '#2D9CDB' : '#666666')};
  font-size: ${moderateScale(14)}px;
`;

const ApplyButton = styled.TouchableOpacity`
  background-color: #2d9cdb;
  padding: ${moderateScale(15)}px;
  border-radius: ${moderateScale(8)}px;
  align-items: center;
`;

const ApplyButtonText = styled.Text`
  color: white;
  font-size: ${moderateScale(16)}px;
  font-weight: 500;
`;

export default AgeChooseBottomSheet;
