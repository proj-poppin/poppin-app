import React from 'react';
import {
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
} from 'react-native';
import {StyleProp, ViewStyle} from 'react-native';
import {themeColors} from 'src/Theme/theme';

interface ScreenProps {
  scrollViewRef?: React.RefObject<ScrollView | FlatList<any>>;
  ScreenHeader?: JSX.Element;
  ScreenContent?: JSX.Element;
  BottomButton?: JSX.Element;
  Modal?: JSX.Element;
  fullScreen?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  isFlatList?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const Screen = ({
  scrollViewRef,
  ScreenHeader,
  ScreenContent,
  BottomButton,
  Modal,
  fullScreen = false,
  style,
  contentContainerStyle,
  keyboardShouldPersistTaps,
  isFlatList = false,
  refreshing = false,
  onRefresh,
}: ScreenProps) => {
  const containerStyle: StyleProp<ViewStyle> = {
    flex: 1,
    backgroundColor: themeColors().grey.white,
  };

  return (
    <View style={containerStyle}>
      {ScreenHeader}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {fullScreen ? (
            <View style={[containerStyle, contentContainerStyle]}>
              {ScreenContent}
            </View>
          ) : isFlatList ? (
            <FlatList
              ref={scrollViewRef as React.RefObject<FlatList<any>>}
              data={[]}
              renderItem={() => <>{ScreenContent}</>}
              keyboardShouldPersistTaps={keyboardShouldPersistTaps}
              contentContainerStyle={contentContainerStyle}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          ) : (
            <ScrollView
              ref={scrollViewRef as React.RefObject<ScrollView>}
              keyboardShouldPersistTaps={keyboardShouldPersistTaps}
              style={[containerStyle]}
              contentContainerStyle={contentContainerStyle}>
              {ScreenContent}
            </ScrollView>
          )}
        </TouchableWithoutFeedback>
        {Modal}
      </KeyboardAvoidingView>
      {BottomButton && (
        <View style={styles.bottomButtonContainer}>{BottomButton}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: themeColors().grey.white,
  },
});
