import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner.tsx';
import {NavigationContainer} from '@react-navigation/native';

// Provider 바깥에서는 useSelector 사용불가(따로 빼서 거기에 +)
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
