import React, {useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import TipOrderHeader from '../../components/organisms/header/TipHeader.tsx';
import TipProgressBarLayout from './TipProgressBarLayout.tsx';
import Tip1Png from '../../assets/png/tip1.png';
import Tip2Png from '../../assets/png/tip2.png';
import Tip3Png from '../../assets/png/tip3.png';
import Tip4Png from '../../assets/png/tip4.png';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
function BeginnerTipsScreen() {
  const navigation = useNavigation();

  const [step, setStep] = useState<number>(1);
  const {width} = Dimensions.get('window');

  const handleIndexChanged = (index: number) => {
    setStep(index + 1);
  };

  const renderSection = (imageSource: any, heightMultiplier: number) => (
    <FastImage
      source={imageSource}
      style={{
        width: width,
        height: width * heightMultiplier,
        // resizeMode: 'contain',
        alignSelf: 'center',
      }}
    />
  );

  return (
    <TipProgressBarLayout
      isTabNeed={false}
      step={step}
      maxStep={4}
      handleBack={() =>
        setStep(prevStep => (prevStep > 1 ? prevStep - 1 : prevStep))
      }
      handleNext={() =>
        setStep(prevStep => (prevStep < 4 ? prevStep + 1 : prevStep))
      }
      onComplete={() => navigation.goBack()}
      isNextDisabled={false}
      isCompleteDisabled={false}>
      <TipOrderHeader
        currentStep={
          `TipIndex${step}` as
            | 'TipIndex1'
            | 'TipIndex2'
            | 'TipIndex3'
            | 'TipIndex4'
        }
      />
      <Swiper
        scrollEnabled={false}
        loop={false}
        index={step - 1}
        onIndexChanged={handleIndexChanged}
        showsPagination={false}>
        <View style={styles.slide}>{renderSection(Tip1Png, 1.4)}</View>
        <View style={styles.slide}>{renderSection(Tip2Png, 1.2)}</View>
        <View style={styles.slide}>{renderSection(Tip3Png, 1.4)}</View>
        <View style={styles.slide}>{renderSection(Tip4Png, 1.4)}</View>
      </Swiper>
    </TipProgressBarLayout>
  );
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});

export default BeginnerTipsScreen;
