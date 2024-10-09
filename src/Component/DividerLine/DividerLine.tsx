import React from 'react';
import styled from 'styled-components/native';
import {ViewStyle} from 'react-native';
import {StyleProp} from 'react-native';
import {themeColors} from '../../Theme/theme';
import {moderateScale} from '../../Util';

interface DividerLineProps {
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const DividerLine: React.FC<DividerLineProps> = ({height = 1, style}) => {
  return <StyledDivider height={height} style={style} />;
};

const StyledDivider = styled.View<{height: number}>`
  background-color: ${themeColors().grey.component};
  height: ${moderateScale(12)}px;
`;

export default DividerLine;
