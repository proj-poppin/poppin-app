import React from 'react';
import {
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  FlatList,
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
  isFlatList?: boolean; // FlatList를 사용할지 ScrollView를 사용할지 결정하는 flag
  refreshing?: boolean; // 추가: FlatList에서 새로 고침을 사용할 경우
  onRefresh?: () => void; // 추가: 새로 고침 함수
}

/**
 * @deprecated
 * ScrollViewPage.component 혹은 FullViewPage.component 를 사용해주세요
 *
 * 스크린 헤더, 화면 콘텐츠, 하단 버튼, 모달을 인자로 받아
 * 좌우 padding 이나 배경색 등이 규격화된 Screen 을 반환합니다.
 *
 * TODO: BottomButton 인자 이름을 바꿉니다. BottomPart?
 *
 * @param ScreenHeader
 * @param ScreenContent
 * @param BottomButton
 * @param Modal
 * @param fullScreen ScreenContent 가 전체 화면을 차지하여 스크롤 할 수 없도록 설정하고 싶은 경우 true 로 설정합니다.
 * @author 도형
 */
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
  isFlatList = false, // 기본값은 ScrollView
  refreshing = false, // FlatList 새로 고침 관련 추가
  onRefresh, // 새로 고침 함수 추가
}: ScreenProps) => {
  const containerStyle: StyleProp<ViewStyle> = {
    flex: 1,
    backgroundColor: themeColors().grey.white,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={containerStyle}>
      {ScreenHeader}
      {/* TextInput 을 사용하는 화면의 경우, TextInput 바깥을 눌렀을 때 키보드가 사라지도록 설정해줍니다. */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* fullScreen 인 경우 ScrollView 또는 FlatList 대신 View 를 사용합니다. */}
        {fullScreen ? (
          <View style={[containerStyle, contentContainerStyle]}>
            {ScreenContent}
          </View>
        ) : isFlatList ? (
          <FlatList
            ref={scrollViewRef as React.RefObject<FlatList<any>>} // FlatList로 타입을 변환
            data={[]} // 실제 데이터는 외부에서 처리
            renderItem={() => <>{ScreenContent}</>} // ScreenContent를 렌더링
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            contentContainerStyle={contentContainerStyle}
            refreshing={refreshing} // 새로 고침 상태
            onRefresh={onRefresh} // 새로 고침 함수
          />
        ) : (
          <ScrollView
            ref={scrollViewRef as React.RefObject<ScrollView>} // ScrollView로 타입을 변환
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            style={[containerStyle]}
            contentContainerStyle={contentContainerStyle}>
            {ScreenContent}
          </ScrollView>
        )}
      </TouchableWithoutFeedback>
      {BottomButton}
      {Modal}
    </KeyboardAvoidingView>
  );
};
