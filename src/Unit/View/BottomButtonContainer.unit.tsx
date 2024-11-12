import React, {useState, useEffect} from 'react';
import {StyleProp, ViewStyle, View, Keyboard} from 'react-native';
import {moderateScale} from 'src/Util';
/**
 * - 화면 하단 버튼(들)을 감싸는 컨테이너입니다.
 *   - (하단 버튼은 src/Component/BottomButton/BottomButton.component.tsx 에서 export 하는 BottomButton 을 사용합니다.)
 *
 * - 키보드가 나타나는 경우 보이지 않습니다.
 * - 60px 높이를 가집니다.
 *
 * @example
 * ```TypeScript
 * //* e.g.
 * export function SomeScreenBottomButton() {
 *   return (
 *     <BottomButtonContainer>
 *       <BottomButton color='BLUE' priority='PRIMARY'/>
 *     </BottomButtonContainer>
 *   )
 * }
 * ```
 * @author 도형
 */
export function BottomButtonContainer({
  children,
  style,
}: {
  children?: any;
  style?: StyleProp<ViewStyle>;
}) {
  const [keyboardShow, setKeyboardShow] = useState(false);

  const keyboardDidShow = () => {
    setKeyboardShow(true);
  };
  const keyboardDidHide = () => {
    setKeyboardShow(false);
  };
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  if (keyboardShow) {
    return null;
  }

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          width: '100%',
          height: moderateScale(60),
        },
        style,
      ]}>
      {children}
    </View>
  );
}
