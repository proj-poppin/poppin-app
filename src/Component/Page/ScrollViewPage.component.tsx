import React, {useState} from 'react';
import {View, ScrollView, StyleProp, ViewStyle} from 'react-native';

/**
 * ScrollView 를 사용하는 페이지에 사용합니다.
 * @author 도형
 */
export function ScrollViewPage({
  UpperPart,
  PageContent,
  BottomPart,
  contentContainerStyle,
  bottomPartStyle,
  keyboardShouldPersistTaps = 'handled',
}: {
  UpperPart?: JSX.Element;
  PageContent?: JSX.Element;
  BottomPart?: JSX.Element;
  contentContainerStyle?: StyleProp<ViewStyle>;
  bottomPartStyle?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
}) {
  const [paddingBottom, setPaddingBottom] = useState<number>(0);

  return (
    <View style={{position: 'relative', flex: 1}}>
      {UpperPart}
      <ScrollView
        style={{backgroundColor: '#ffffff'}}
        contentContainerStyle={[{paddingBottom}, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
        {PageContent}
      </ScrollView>
      {BottomPart && (
        <View
          style={[
            {
              position: 'absolute',
              bottom: 0,
              width: '100%',
              paddingVertical: 16,
            },
            bottomPartStyle,
          ]}
          onLayout={e => setPaddingBottom(e.nativeEvent.layout.height)}>
          {BottomPart}
        </View>
      )}
    </View>
  );
}
