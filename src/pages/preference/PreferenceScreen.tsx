import React, {useLayoutEffect, useState} from 'react';
import {Pressable, ScrollView, View, Text, StyleSheet} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import NextMiddleButton from '../../components/NextMiddleButton';
import BackMiddleButton from '../../components/BackMiddleButton';
import CompleteButton from '../../components/CompleteButton';
import OptionMultipleButton from '../../components/optionMultipleButton.tsx';
import {NavigationProp} from '@react-navigation/native';
import SkipModal from '../../components/SkipModal.tsx';
import Text24B from '../../styles/texts/headline/Text24B.ts';
import Text12R from '../../styles/texts/label/Text12R.ts';

type Step = {
  text1: string;
  text2: string;
};

const steps: Step[] = [
  {text1: 'OO님이', text2: '선호하는 팝업을 알려주세요'},
  {text1: 'OO님의', text2: '관심사가 궁금해요'},
  {text1: 'OO님은', text2: '주로 누구와 팝업에 방문하시나요?'},
];

interface PreferenceScreenProps {
  navigation: NavigationProp<any>;
}

const PreferenceScreen: React.FC<PreferenceScreenProps> = ({navigation}) => {
  const [step, setStep] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSkip = () => {
    setModalVisible(false);
    navigation.navigate('Main');
  };

  // React Navigation의 useLayoutEffect 훅을 사용하여 헤더 버튼 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={{color: globalColors.font, marginRight: 0}}>
            건너뛰기
          </Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const progressBarStyle = {
    width: '100%',
    backgroundColor: globalColors.blue,
    borderRadius: 20,
  };

  const progressBarContainerStyle = {
    height: 5,
    backgroundColor: globalColors.warmGray,
    borderRadius: 20,
    paddingRight: undefined as number | undefined,
    paddingLeft: undefined as number | undefined,
  };

  // Adjust padding based on step
  if (step === 1) {
    progressBarContainerStyle.paddingRight = 220;
  } else if (step === 2) {
    progressBarContainerStyle.paddingLeft = 110;
    progressBarContainerStyle.paddingRight = 110;
  } else if (step === 3) {
    progressBarContainerStyle.paddingLeft = 220;
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderOptionButtons = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.optionsContainer}>
            {[
              '🛍️ 소비형',
              '🖼️ 전시형',
              '🏃 체험형',
              '무료 체험이었으면 좋겠어요',
            ].map((option, index) => (
              <OptionMultipleButton
                key={index}
                id={index.toString()}
                title={option}
                onPress={() => console.log(`${option} 선택됨, id: ${index}`)}
              />
            ))}
          </View>
        );
      case 2:
        return (
          <View style={styles.optionsContainer}>
            {[
              '💄 패션/뷰티',
              '🥰 캐릭터',
              '🍽️ 식품/음료',
              '📚 웹툰/애니메이션',
              '🛋️ 인테리어/소품',
              '🎬 영화/드라마/예능',
              '🎼 뮤지컬/연극',
              '⚽ 스포츠',
              '🎮 게임',
              '💻 IT/테크',
              '🎤 K-POP',
              '🍷 주류',
              '🪴 동물/식물',
            ].map((option, index) => (
              <OptionMultipleButton
                key={index}
                id={index.toString()}
                title={option}
                onPress={() => console.log(`${option} 선택됨, id: ${index}`)}
              />
            ))}
          </View>
        );
      case 3:
        return (
          <View style={styles.optionsContainer}>
            {[
              '나 혼자 방문해요',
              '친구와 방문해요',
              '가족과 방문해요',
              '연인과 방문해요',
            ].map((option, index) => (
              <OptionMultipleButton
                key={index}
                id={index.toString()}
                title={option}
                onPress={() => console.log(`${option} 선택됨, id: ${index}`)}
              />
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 20, backgroundColor: 'white'}}>
        <View style={[progressBarContainerStyle]}>
          <View style={[styles.progressBarFill, progressBarStyle]} />
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={[Text24B.text, {textAlign: 'center'}]}>
            {steps[step - 1].text1}
            {'\n'}
            {steps[step - 1].text2}
          </Text>
          <Text
            style={[
              Text12R.text,
              {color: globalColors.blue, textAlign: 'center', paddingTop: 50},
            ]}>
            *복수 선택 가능
          </Text>
          {renderOptionButtons()}
          <Text
            style={[Text12R.text, {color: globalColors.font, paddingTop: 30}]}>
            마이페이지에서 언제든지 수정할 수 있어요!
          </Text>
          <View style={styles.buttonContainer}>
            {step === 1 && (
              <CompleteButton
                onPress={handleNext}
                title={'다음'}
                buttonWidth={'95%'}
              />
            )}
            {step === 2 && (
              <View style={styles.buttonRow}>
                <BackMiddleButton onPress={handleBack} title={'이전'} />
                <View style={{width: 30}} />
                <NextMiddleButton onPress={handleNext} title={'다음'} />
              </View>
            )}
            {step === 3 && (
              <View style={styles.buttonRow}>
                <BackMiddleButton onPress={handleBack} title={'이전'} />
                <View style={{width: 30}} />
                <NextMiddleButton
                  onPress={() => navigation.navigate('Main')}
                  title={'완료'}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <SkipModal
        isVisible={modalVisible}
        onClose={handleSkip}
        onSetNow={() => setModalVisible(false)}
      />
      {/*<CheckAnimationModal*/}
      {/*  isVisible={modalVisible}*/}
      {/*  onClose={() => setModalVisible(false)}*/}
      {/*  // onSetNow={handleSkip}*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  progressBarFill: {
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  // optionsContainer 및 기타 스타일 유지
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 250,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSkip: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight: 10,
  },
  buttonSetNow: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 10,
  },
  overlayStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 검은색 배경에 50% 불투명도
  },
});

export default PreferenceScreen;
