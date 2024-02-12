import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner.tsx';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import appleAuth from '@invertase/react-native-apple-authentication';

// Provider 바깥에서는 useSelector 사용불가(따로 빼서 거기에 +)
function App() {
  // SplashScreen.hide();
  useEffect(() => {
    SplashScreen.hide(); // 앱 시작 시 SplashScreen 숨기기
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
    });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
