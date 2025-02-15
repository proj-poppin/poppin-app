import React from 'react';
import {debounce} from 'lodash';
import {useMemo, useState} from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import {LandingScreenHeader} from 'src/Component/View';
import SearchIcon from 'src/Resource/svg/search-icon.svg';
import {TextInput} from 'react-native';

/**
 * 검색바 컴포넌트
 * @param isSearchMode 검색 모드 여부
 * @param onSearchToggle 검색 모드 토글 함수
 * @param onBackPress 검색 모드 취소 함수
 * @param searchKeyword 검색 키워드
 * @param setSearchKeyword 검색 키워드 설정 함수
 */
interface SearchBarProps {
  isSearchMode?: boolean;
  onSearchToggle?: () => void;
  onBackPress: () => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isSearchMode,
  onSearchToggle,
  onBackPress,
  searchKeyword,
  setSearchKeyword,
}) => {
  // 로컬 state 추가
  const [localSearchKeyword, setLocalSearchKeyword] = useState(searchKeyword);

  // debounce 함수 생성
  const debouncedSetSearchKeyword = useMemo(
    () =>
      debounce((value: string) => {
        setSearchKeyword(value);
        console.log('debounce');
      }, 300),

    [setSearchKeyword],
  );

  // 로컬 state 변경 시 debounced 함수 호출
  const handleSearchChange = (text: string) => {
    setLocalSearchKeyword(text);
    debouncedSetSearchKeyword(text);
  };

  const inputStyle = useMemo(
    () => ({
      flex: 1,
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
    }),
    [],
  );

  return isSearchMode ? (
    <SearchContainer>
      <InputWrapper>
        <TextInput
          style={inputStyle}
          onChangeText={handleSearchChange}
          value={localSearchKeyword}
          placeholder="텍스트를 입력하세요."
          placeholderTextColor="#666"
          autoFocus={isSearchMode}
        />
        <Pressable onPress={onBackPress}>
          <CancelButtonText>취소</CancelButtonText>
        </Pressable>
      </InputWrapper>
    </SearchContainer>
  ) : (
    <LandingScreenHeader
      title="팝업 찾기"
      RightComponents={
        <Pressable onPress={onSearchToggle}>
          <SearchIcon />
        </Pressable>
      }
    />
  );
};

const SearchContainer = styled.View`
  padding-horizontal: 20px;
  padding-vertical: 10px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CancelButtonText = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;
