import React, {useRef} from 'react';
import {Dimensions, FlatList, Animated, View} from 'react-native';
import {ExpandingDot} from 'react-native-animated-pagination-dots'; // Importing pagination dots
import {moderateScale} from 'src/Util';
import {FastImageContainer} from '../../../../Component/Image/FastImage.component';
import {usePopupDetailContext} from '../Provider/Popup.detail.provider';
import {themeColors} from '../../../../Theme/theme';

const screenWidth = Dimensions.get('window').width;

export const PopupDetailImageSection = () => {
  const {popupDetail} = usePopupDetailContext(); // Context에서 popupDetail 접근
  const scrollX = useRef(new Animated.Value(0)).current; // Animated value for scroll position

  if (!popupDetail.imageUrls || popupDetail.imageUrls.length === 0) {
    return null; // 이미지가 없는 경우 렌더링하지 않음
  }

  const images = [popupDetail.imageUrls[0], ...popupDetail.imageUrls.slice(1)];

  const renderImage = ({item}: {item: string}) => (
    <FastImageContainer
      source={{uri: item}}
      style={{
        width: screenWidth,
        height: moderateScale(400),
      }}
    />
  );

  return (
    <View>
      <FlatList
        data={images} // Context에서 가져온 imageUrls 사용
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16} // Smooth scrolling event
      />

      {/* Pagination dots placed below the FlatList */}
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
          bottom: 10, // Adjust as needed to place it below the image
          alignSelf: 'center',
        }}
      />
    </View>
  );
};
