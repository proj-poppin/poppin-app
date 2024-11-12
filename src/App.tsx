import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import {MenuProvider} from 'react-native-popup-menu';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AppStackNavigator} from './Navigator/App.stack.navigator';
import {themeColors} from 'src/Theme/theme';
import {themeSizes} from 'src/Theme/size.theme';

const queryClient = new QueryClient();

/**
 * 앱 최상위 컴포넌트입니다.
 *
 * 앱이 처음 시작될 때 아래의 기능들을 수행합니다:
 *   - iOS 푸시알림 권한 요청
 * @author 도형
 */
export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        //? styled-components의 ThemeProvider를 이용하여 theme을 배포합니다.
        //? useLightMode가 참이라면 theme.color의 값은 lightThemeColors가 되고,
        //? 그렇지 않다면 darkThemeColor가 됩니다.
        theme={{color: themeColors(), size: themeSizes}}>
        <MenuProvider>
          {/*<BottomSheetModalProvider>*/}
          <Container>
            <AppStackNavigator />
          </Container>
          {/*</BottomSheetModalProvider>*/}
        </MenuProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.color.grey.white};
`;
