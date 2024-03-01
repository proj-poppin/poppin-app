import {Text, View} from 'react-native';
import React from 'react';
import primaryColors from '../../style/primaryColors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';

function FindScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: primaryColors.white,
        paddingHorizontal: 20,
      }}>
      <Text>FindScreen</Text>
    </SafeAreaView>
  );
}

export default FindScreen;
