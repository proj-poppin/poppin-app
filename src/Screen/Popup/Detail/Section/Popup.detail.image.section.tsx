import React, {useRef} from 'react';
import {Dimensions, FlatList, Animated, View} from 'react-native';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import {FastImageContainer} from '../../../../Component/Image/FastImage.component';
import {usePopupDetailContext} from '../Provider/Popup.detail.provider';
import {themeColors} from '../../../../Theme/theme';

const screenWidth = Dimensions.get('window').width;

export const PopupDetailImageSection = () => {
  const {popupDetail} = usePopupDetailContext();
  const scrollX = useRef(new Animated.Value(0)).current;

  if (!popupDetail.imageUrls || popupDetail.imageUrls.length === 0) {
    return null;
  }

  const images = [popupDetail.imageUrls[0], ...popupDetail.imageUrls.slice(1)];

  const renderImage = ({item}: {item: string}) => (
    <ImageWrapper>
      <FastImageContainer
        source={{uri: item}}
        style={{
          width: screenWidth,
          height: moderateScale(400),
        }}
      />
      {/* 팝업 종료 상태일 때 덮는 Wrapper */}
      {popupDetail.operationStatus === 'TERMINATED' && (
        <ClosedWrapper>
          <ClosedText>팝업 종료</ClosedText>
        </ClosedWrapper>
      )}
    </ImageWrapper>
  );

  return (
    <View>
      <FlatList
        data={images}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
      />

      {/* Pagination dots */}
      <ExpandingDot
        data={images}
        scrollX={scrollX}
        inActiveDotOpacity={0.5}
        expandingDotWidth={10}
        dotStyle={{
          width: 10,
          height: 10,
          backgroundColor: themeColors().purple.main,
          borderRadius: 5,
          marginHorizontal: 2,
        }}
        containerStyle={{
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

// Styled components
const ImageWrapper = styled.View`
  position: relative;
`;

const ClosedWrapper = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClosedText = styled.Text`
  color: white;
  font-size: ${moderateScale(24)}px;
  font-weight: bold;
`;
