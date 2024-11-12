import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';

/**
 * default style:
 * ```
 * { flex: 1, backgroundColor: '#ffffff' }
 * ```
 * @author 도형
 */
export function FullViewPage({
  PageContent,
  BottomPart,
  style,
}: {
  PageContent?: JSX.Element;
  BottomPart?: JSX.Element;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {position: 'relative', flex: 1, backgroundColor: '#ffffff'},
        style,
      ]}>
      {PageContent}
      {BottomPart && (
        <View style={{position: 'absolute', bottom: 0}}>{BottomPart}</View>
      )}
    </View>
  );
}
