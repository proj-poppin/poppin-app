import React, {useState} from 'react';
import styled from 'styled-components/native';
import {TextInput, Pressable} from 'react-native';
import {moderateScale} from 'src/Util';

interface SearchBarProps {
  searchKeyword: string;
  setSearchKeyword: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const ReviewSearchBar: React.FC<SearchBarProps> = ({
  searchKeyword,
  setSearchKeyword,
  onFocus,
  onBlur,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <SearchInputContainer isFocused={isFocused}>
      <StyledTextInput
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        placeholder="팝업을 검색해보세요"
        placeholderTextColor="#666"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {searchKeyword.length > 0 && (
        <ClearButton onPress={() => setSearchKeyword('')}>
          <ClearButtonText>×</ClearButtonText>
        </ClearButton>
      )}
    </SearchInputContainer>
  );
};

const SearchInputContainer = styled.View<{isFocused: boolean}>`
  flex-direction: row;
  align-items: center;
  border: 1px solid
    ${props =>
      props.isFocused
        ? props.theme.color.blue.main
        : props.theme.color.grey.mild};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(8)}px;
  ${moderateScale(16)}px;
  background-color: white;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  font-size: ${moderateScale(16)}px;
  padding: 0;
  color: ${props => props.theme.color.grey.black};
`;

const ClearButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px;
`;

const ClearButtonText = styled.Text`
  font-size: ${moderateScale(20)}px;
  color: ${props => props.theme.color.grey.main};
`;
