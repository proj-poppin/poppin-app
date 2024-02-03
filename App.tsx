import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {
  TouchableHighlight,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';

import {useCallback} from 'react';
import Logo from './src/assets/icons/blueDots.svg';

// type RootStackParamList = {
//   Home: undefined;
//   Detail: undefined;
// };

// 아래의 routeName(ex. Details)은 위의 RootStackParamList와 동일하게 작성해야 한다.

type HomeScreenProps = NativeStackScreenProps<ParamListBase, 'Home'>;
type DetailsScreenProps = NativeStackScreenProps<ParamListBase, 'Details'>;

// type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
// type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

function HomeScreen({navigation}: HomeScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center', // Changed to center to align items in the middle
        justifyContent: 'center', // Changed to center to justify content in the middle
        backgroundColor: 'white',
      }}>
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={{alignItems: 'center'}}>
          <Text>Home Screen</Text>
          <Logo width={300} height={300} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

function DetailsScreen({navigation}: DetailsScreenProps) {
  const onClick = useCallback(() => {
    // navigation.goBack();
    navigation.goBack();
  }, [navigation]);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableHighlight onPress={onClick}>
        <Text>Details Screen</Text>
      </TouchableHighlight>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{
            title: '홈화면',
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name={'Details'} component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
