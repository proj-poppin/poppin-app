import React, {useState} from 'react';
import {StyleProp, LayoutChangeEvent, View} from 'react-native';
import FastImage, {
  FastImageProps,
  OnLoadEvent,
  ImageStyle,
} from 'react-native-fast-image';
import {moderateScale} from 'src/Util';

/**
 * react-native-fast-image 를 사용하는 이미지 표시 컴포넌트입니다.
 * @author 도형
 */
export const FastImageContainer = ({
  source,
  fitOnHeight = false,
  onTouchEnd,
  style,
}: {
  source: FastImageProps['source'];
  fitOnHeight?: boolean;
  onTouchEnd?: () => void;
  style?: StyleProp<ImageStyle>;
}) => {
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<
    {width: number; height: number} | undefined
  >(undefined);
  const [imageLayout, setImageLayout] = useState({
    width: moderateScale(0),
    height: moderateScale(0),
  });

  const onLayout = (e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout;
    setLayout({width, height});
  };

  const setImageLayoutOnLoad = (e: OnLoadEvent) => {
    const {width: imgWidth, height: imgHeight} = e.nativeEvent;
    if (!layout) {
      return;
    }
    const widthScaleRatio = layout.width / imgWidth;
    const heightScaleRatio = layout.height / imgHeight;
    fitOnHeight
      ? setImageLayout({
          width: imgWidth * heightScaleRatio,
          height: moderateScale(0),
        })
      : setImageLayout({
          width: moderateScale(0),
          height: imgHeight * widthScaleRatio,
        });
  };

  const onLoadEnd = () => setLoading(false);

  return (
    <FastImage
      onTouchEnd={onTouchEnd}
      source={source}
      style={[
        fitOnHeight
          ? {width: imageLayout.width, height: '100%'}
          : {width: '100%', height: imageLayout.height},
        style,
      ]}
      resizeMode={FastImage.resizeMode.contain}
      onLayout={layout ? undefined : onLayout}
      onLoad={setImageLayoutOnLoad}
      onLoadEnd={onLoadEnd}>
      {loading && (
        <View
          style={[
            fitOnHeight
              ? {width: imageLayout.width, height: '100%'}
              : {width: '100%', height: imageLayout.height},
            {backgroundColor: '#b0b0b0'},
          ]}
        />
      )}
    </FastImage>
  );
};
