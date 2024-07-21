import React, {useEffect, useState} from 'react';
import {Alert, Pressable, SafeAreaView, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import SearchInput from '../../assets/images/searchInput.svg';
import BackSvg from '../../assets/icons/goBack.svg';
import globalColors from '../../styles/color/globalColors';
import InputCancel from '../../assets/icons/inputCancel.svg';
import DividerLine from '../../components/DividerLine';
import NoKeyword from '../../assets/images/noKeyword.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TkewordRecord = {
  id: number;
  keyword: string;
};

function FindInputScreen({navigation}: any) {
  const [text, setText] = useState('');
  const [keywordsRecord, setKeywordRecord] = useState<TkewordRecord[]>([]);

  const onChangeText = (inputText: string) => {
    setText(inputText);
  };

  const handleSubmit = async () => {
    if (text.trim()) {
      const newKeyword = {id: Date.now(), keyword: text};
      const updatedKeywords = [newKeyword, ...keywordsRecord];
      setKeywordRecord(updatedKeywords);
      await AsyncStorage.setItem('@keywords', JSON.stringify(updatedKeywords));
      setText('');
      navigation.navigate('Find', {searchText: text});
    } else {
      Alert.alert('검색어를 입력해주세요.');
    }
  };

  const handleAllRecordDelete = async () => {
    await AsyncStorage.setItem('@keywords', JSON.stringify([]));
    setKeywordRecord([]);
  };

  const handleClickKeyword = async (kid: number) => {
    const filterKeywors = keywordsRecord.filter(item => item.id !== kid);
    setKeywordRecord(filterKeywors);
    await AsyncStorage.setItem('@keywords', JSON.stringify(filterKeywors));
  };

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const storedKeywords = await AsyncStorage.getItem('@keywords');

        if (storedKeywords !== null) {
          setKeywordRecord(JSON.parse(storedKeywords));
        } else {
          setKeywordRecord([]);
        }
      } catch (e) {
        console.error('Failed to fetch the data from storage', e);
      }
    };

    fetchKeywords();
  }, []);

  const handlekeywordClickSubmit = (text: string) => {
    setText(text);
    navigation.navigate('Find', {searchText: text});
  };

  return (
    <SafeAreaView style={[{flex: 1}, {backgroundColor: globalColors.white}]}>
      <View style={styles.inputWrapper}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backbutton}>
          <BackSvg />
        </Pressable>
        <TextInput
          style={styles.inputstyle}
          onChangeText={onChangeText}
          value={text}
          placeholder="텍스트를 입력하세요."
        />
        <Pressable style={styles.searchIcon} onPress={handleSubmit}>
          <SearchInput />
        </Pressable>
      </View>
      <View style={{width: '100%', paddingLeft: 20, paddingRight: 20}}>
        <DividerLine height={1} style={{marginBottom: 20}} />
        <Text style={{marginBottom: 20, color: globalColors.stroke2}}>
          최근 검색어
        </Text>
        <View style={styles.keywordWrapper}>
          {keywordsRecord.length === 0 ? (
            <View>
              <Text
                style={{
                  color: globalColors.stroke2,
                  marginTop: 10,
                  marginBottom: 20,
                }}>
                최근 검색어가 없어요.
              </Text>
              <NoKeyword />
            </View>
          ) : (
            <>
              {keywordsRecord.map(keyword => (
                <Pressable
                  key={keyword.id} // Add key prop here
                  onPress={() => handlekeywordClickSubmit(keyword.keyword)}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>{keyword.keyword}</Text>
                    <Pressable onPress={() => handleClickKeyword(keyword.id)}>
                      <InputCancel />
                    </Pressable>
                  </View>
                </Pressable>
              ))}
              <Pressable onPress={handleAllRecordDelete}>
                <Text style={{textAlign: 'right', color: globalColors.stroke2}}>
                  전체 삭제하기
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default FindInputScreen;

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    height: 70,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backbutton: {
    padding: 17, // 클릭할 수 있는 범위를 확장합니다.
    width: 'auto', // 버튼의 너비를 자동으로 설정하여 패딩이 적용됩니다.
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputstyle: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 15,
    borderRadius: 30,
    position: 'relative',
    width: '92%',
  },
  searchIcon: {
    position: 'absolute',
    top: 23,
    right: 22,
  },
  keywordWrapper: {
    width: '100%',
    display: 'flex',
    gap: 13,
  },
});
