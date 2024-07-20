import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import CompleteButton from '../components/atoms/button/CompleteButton.tsx';
import BackMiddleButton from '../components/atoms/button/BackMiddleButton.tsx';
import NextMiddleButton from '../components/atoms/button/NextMiddleButton.tsx';
import globalColors from '../styles/color/globalColors.ts';
import ProgressBarComponent from '../components/atoms/image/ProgressBarComponent.tsx';

const ProgressBarLayout = ({
  step,
  maxStep = 3,
  handleBack,
  handleNext,
  onComplete,
  children,
  isNextDisabled,
  isCompleteDisabled,
}) => {
  return (
    <View style={[{flex: 1}]}>
      <ProgressBarComponent step={step} />
      <ScrollView style={styles.contentContainer}>{children}</ScrollView>
      <View style={styles.buttonContainer}>
        {step === 1 && (
          <CompleteButton
            onPress={handleNext}
            title={'다음'}
            buttonWidth={'95%'}
            disabled={isNextDisabled}
          />
        )}
        {step > 1 && step < maxStep && (
          <View style={styles.buttonRow}>
            <BackMiddleButton onPress={handleBack} title={'이전'} />
            <View style={{width: 30}} />
            <NextMiddleButton
              onPress={handleNext}
              title={'다음'}
              disabled={isNextDisabled}
            />
          </View>
        )}
        {step === maxStep && (
          <View style={styles.buttonRow}>
            <BackMiddleButton onPress={handleBack} title={'이전'} />
            <View style={{width: 30}} />
            <NextMiddleButton
              onPress={onComplete}
              title={'완료'}
              disabled={isCompleteDisabled}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 5,
    backgroundColor: globalColors.warmGray,
  },
  progressBar: {
    height: '100%',
    backgroundColor: globalColors.blue,
    borderRadius: 20,
  },
  contentContainer: {
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
});

export default ProgressBarLayout;
