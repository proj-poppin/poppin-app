import React from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';
import {themeColors} from '../../../Theme/theme';

/**
 * 팝업 상세 페이지 진입 시 popupId 인자만 받아오고
 * 아직 popupDetail 정보를 가져오는 중인 경우 보여주는 로딩 화면입니다.
 * @author 도형
 */
export const PopupDetailLoadingScreen = () => {
  return (
    <Container>
      <ActivityIndicator size={'large'} color={themeColors().purple.main} />
    </Container>
  );
};

const Container = styled.View`
  position: absolute;
  top: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
`;
