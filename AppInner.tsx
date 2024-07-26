import React, {useEffect} from 'react';
import {AppState} from 'react-native';
import codePush from 'react-native-code-push';
import RootNavigator from './src/navigators/RootNavigator';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const AppInner = () => {
  useEffect(() => {
    const codePushSync = () => {
      codePush.sync({
        updateDialog: {
          title: '새로운 업데이트가 존재합니다.',
          optionalUpdateMessage: '지금 업데이트하시겠습니까?',
          optionalIgnoreButtonLabel: '나중에',
          optionalInstallButtonLabel: '업데이트',
        },
        installMode: codePush.InstallMode.IMMEDIATE,
      });
    };

    codePushSync();

    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        codePushSync();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <RootNavigator />;
};

export default codePush(codePushOptions)(AppInner);
