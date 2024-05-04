import * as React from 'react';
import {Provider} from 'react-redux';
import AppInner from './AppInner.tsx';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
// import messaging from '@react-native-firebase/messaging';

import store from './src/redux/stores';
import './localConfig';
import {Alert} from 'react-native';

function App() {
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  // const getToken = async () => {
  //   const token = await messaging().getToken();
  //   console.log('firebase', token);
  //   Alert.alert('hi');
  // };

  // React.useEffect(() => {
  //   requestUserPermission();
  //   getToken();
  // }, []);
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <AppInner />
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
