import React, {useLayoutEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import {useNavigation} from '@react-navigation/native';
import SkipModal from '../../components/SkipModal.tsx';
import ProgressBarLayout from '../../templates/ProgressBarLayout.tsx';
import PreferenceSectionFirst from '../../components/organisms/middle_select_box/PreferenceSectionFirst.tsx';
import PreferenceSectionSecond from '../../components/organisms/middle_select_box/PreferenceSectionSecond.tsx';
import PreferenceSectionThird from '../../components/organisms/middle_select_box/PreferenceSectionThird.tsx';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthNavigatorParamList} from '../../types/AuthNavigatorParamList.ts';

type PreferenceScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigatorParamList,
  'PreferenceSetting'
>;

function PreferenceScreen() {
  const [step, setStep] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<PreferenceScreenNavigationProp>();

  const handleComplete = () => {
    setModalVisible(false);
    navigation.navigate('MainTabNavigator');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <View style={{width: 0, height: 0}} />,
      headerRight: () => (
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={{color: globalColors.font, marginRight: 10}}>
            건너뛰기
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, setModalVisible]);

  const renderSection = () => {
    switch (step) {
      case 1:
        return <PreferenceSectionFirst />;
      case 2:
        return <PreferenceSectionSecond />;
      case 3:
        return <PreferenceSectionThird />;
      default:
        return null;
    }
  };

  return (
    <ProgressBarLayout
      step={step}
      maxStep={3}
      handleBack={() => setStep(step - 1)}
      handleNext={() => setStep(step + 1)}
      onComplete={handleComplete}>
      <ScrollView>{renderSection()}</ScrollView>
      <SkipModal
        isVisible={modalVisible}
        onClose={() => handleComplete()}
        onSetNow={() => setModalVisible(false)}
      />
    </ProgressBarLayout>
  );
}

export default PreferenceScreen;
