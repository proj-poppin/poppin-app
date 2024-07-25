import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  Keyboard,
} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import KeywordAlarmOnSvg from '../../assets/icons/keywordAlarmOn.svg';
import CloseSvg from '../../assets/icons/closeGray.svg';
import TwoSelectConfirmationModal from '../../components/TwoSelectConfirmationModal.tsx';
import Text13R from '../../styles/texts/label/Text12R.ts';

const exampleText =
  '팝업 이름이나 내용에 포함될 수 있는 \n 키워드를 등록해주세요. \n 예) 슬램덩크, 먼작귀, 오뚜기';

function KeywordAlarmScreen() {
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleRegister = () => {
    if (keyword.trim() !== '') {
      setKeyword('');
    }
  };

  const toggleAlarm = () => {
    // 여기서는 상태를 토글하도록 로직을 작성
    // 예를 들어, 아이콘 상태를 변경하거나 API 호출
    console.log('알람 토글');
  };

  const removeKeyword = (index: number | null) => {
    setKeywords(prevKeywords => prevKeywords.filter((_, i) => i !== index));
  };

  const handleBackgroundPress = () => {
    if (isDeleteModalVisible) {
      setIsDeleteModalVisible(false);
      Keyboard.dismiss(); // Optionally dismiss the keyboard if open
    }
  };

  return (
    <Pressable onPress={handleBackgroundPress} style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.keywordInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="텍스트를 입력하세요."
            placeholderTextColor={globalColors.font}
            value={keyword}
            onChangeText={setKeyword}
          />
          <Pressable style={[styles.registerButton]} onPress={handleRegister}>
            <Text
              style={[
                styles.registerButtonText,
                keyword.length > 0
                  ? styles.activeButtonText
                  : styles.inactiveButtonText,
              ]}>
              등록
            </Text>
          </Pressable>
        </View>
        {keywords.length === 0 && (
          <Text style={[styles.exampleText, Text13R.text]}>{exampleText}</Text>
        )}
        {keywords.map((kw, index) => (
          <View style={styles.keywordRow} key={index}>
            <KeywordAlarmOnSvg onPress={toggleAlarm} />
            <Text style={styles.keywordText}>{kw}</Text>
            <Pressable
              onPress={() => {
                setDeleteIndex(index);
                console.log(index);
                setIsDeleteModalVisible(true);
              }}>
              <CloseSvg />
            </Pressable>
          </View>
        ))}

        <TwoSelectConfirmationModal
          isVisible={isDeleteModalVisible}
          onClose={() => setIsDeleteModalVisible(false)}
          onConfirm={() => {
            console.log(`${deleteIndex} 삭제됨`);
            removeKeyword(deleteIndex);
            setIsDeleteModalVisible(false);
          }}
          onBlankSpacePressed={() => setIsDeleteModalVisible(false)}
          mainAlertTitle="삭제하시겠습니까?"
          subAlertTitle="키워드 알림을 삭제합니다."
          selectFirstText="취소하기"
          selectSecondText="삭제하기"
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: 20,
  },
  keywordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: globalColors.component,
    marginBottom: 20,
    padding: 0,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  registerButton: {
    marginLeft: 10,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  registerButtonText: {
    fontSize: 16,
  },
  activeInput: {
    borderColor: globalColors.blue,
  },
  inactiveInput: {
    borderColor: globalColors.font,
  },
  activeButtonText: {
    color: globalColors.blue,
  },
  inactiveButtonText: {
    color: globalColors.font,
  },
  subLabel: {
    color: globalColors.font,
    marginBottom: 10,
    marginTop: 20,
  },
  keywordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  keywordText: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  exampleText: {
    color: globalColors.font,
    marginBottom: 10,
    marginTop: 70,
    textAlign: 'center',
  },
});

export default KeywordAlarmScreen;
