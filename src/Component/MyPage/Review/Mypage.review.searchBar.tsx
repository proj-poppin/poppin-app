import React, {useState, useMemo} from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import debounce from 'lodash/debounce';

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
  // 로컬 검색어 상태 추가
  const [localSearchKeyword, setLocalSearchKeyword] = useState(searchKeyword);

  // debounce 함수 생성
  const debouncedSetSearchKeyword = useMemo(
    () =>
      debounce((value: string) => {
        setSearchKeyword(value);
      }, 300),
    [setSearchKeyword],
  );

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (text: string) => {
    setLocalSearchKeyword(text);
    debouncedSetSearchKeyword(text);
  };

  // 클리어 버튼 핸들러
  const handleClear = () => {
    setLocalSearchKeyword('');
    setSearchKeyword('');
  };

  return (
    <SearchInputContainer isFocused={isFocused}>
      <StyledTextInput
        value={localSearchKeyword}
        onChangeText={handleSearchChange}
        placeholder="팝업을 검색해보세요"
        placeholderTextColor="#666"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {localSearchKeyword.length > 0 && (
        <ClearButton onPress={handleClear}>
          <ClearButtonText>×</ClearButtonText>
        </ClearButton>
      )}
    </SearchInputContainer>
  );
};

// Styled components는 그대로 유지...

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
