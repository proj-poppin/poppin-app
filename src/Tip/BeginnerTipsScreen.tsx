import React, {useState} from 'react';
import {StyleSheet, Dimensions, View, SafeAreaView} from 'react-native';
import Tip1Png from 'src/Resource/png/manual-tip-page-1.png';
import Tip2Png from 'src/Resource/png/manual-tip-page-2.png';
import Tip3Png from 'src/Resource/png/manual-tip-page-3.png';
import Tip4Png from 'src/Resource/png/manual-tip-page-4.png';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AppStackProps} from "../Navigator/App.stack.navigator";
import TipOrderHeader from "./TipOrderHeader";
import CommonCompleteButton from "../Screen/Popup/Landing/common.complete.button";
import {ScreenHeader} from "../Component/View";

export type BeginnerTipsScreenProps = {};
const BeginnerTipsScreen = ({route,}:NativeStackScreenProps<AppStackProps, 'BeginnerTipsScreen'>) => {
  const navigation = useNavigation();

  const [step, setStep] = useState<number>(1);
  const {width} = Dimensions.get('window');

  const handleIndexChanged = (index: number) => {
    setStep(index + 1);
  };
  const handleBack = () => setStep(prevStep => (prevStep > 1 ? prevStep - 1 : prevStep));
  const handleNext = () => setStep(prevStep => (prevStep < 4 ? prevStep + 1 : prevStep));
  const onComplete = () => navigation.goBack();
  const renderSection = (imageSource: any, heightMultiplier: number) => (
    <FastImage
      source={imageSource}
      style={{
        width: '100%',
        height: width * heightMultiplier,
        alignSelf: 'center',
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
        <ScreenHeader
            LeftComponents={'BACK_BUTTON'}
            title="팝핀 활용 팁"
        />
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
        {step === 1 && (
            <CommonCompleteButton
                onPress={handleNext}
                title={'다음'}
            />
        )}
        {step > 1 && step < 4 && (
            <View style={styles.buttonRow}>
                <CommonCompleteButton onPress={handleBack} title={'이전'} style={{width:'45%'}} isPreviousButton/>
                <View style={{width: 30}} />
                <CommonCompleteButton
                    onPress={handleNext}
                    title={'다음'}
                    style={{width:'45%'}}
                />
            </View>
        )}
        {step === 4 && (
            <View style={styles.buttonRow}>
                <CommonCompleteButton onPress={handleBack} title={'이전'} style={{width:'45%'}} isPreviousButton/>
                <View style={{width: 30}} />
                <CommonCompleteButton
                    onPress={onComplete}
                    title={'완료'}
                    style={{width:'45%'}}
                />
            </View>
        )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 20,
        paddingTop: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-around',
    },
    slideContainer:{
        flex : 1,
        padding: 16,
        justifyContent: 'center',
    },
});

export default BeginnerTipsScreen;
