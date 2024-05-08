import React, {useState} from 'react';
import {Alert, Pressable, SafeAreaView, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import SearchInput from '../../assets/images/searchInput.svg';
import BackSvg from '../../assets/icons/goBack.svg';
import globalColors from '../../styles/color/globalColors';
import {dummydata} from './dummydata';
import InputCancel from '../../assets/icons/inputCancel.svg';
import DividerLine from '../../components/DividerLine';
import NoKeyword from '../../assets/images/noKeyword.svg';

function FindInputScreen({navigation}: any) {
  const [text, setText] = useState('');
  const [keywordsTrace, setKeywordsTrace] = useState(dummydata);

  const onChangeText = (inputText: string) => {
    setText(inputText);
  };

  const handleSubmit = () => {
    Alert.alert('Submitted Text', text);
  };

  const handleClickKeyword = (kid: number) => {};
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
        <Pressable style={styles.searchIcon}>
          <SearchInput />
        </Pressable>
      </View>
      <View style={{width: '100%', paddingLeft: 20, paddingRight: 20}}>
        <DividerLine height={1} style={{marginBottom: 20}} />
        <Text
          style={{
            marginBottom: 20,
            color: globalColors.stroke2,
          }}>
          최근 검색어
        </Text>
        <View style={styles.keywordWrapper}>
          {keywordsTrace.length < 0 ? (
            <View>
              <Text style={{color: globalColors.stroke2, marginBottom: 20}}>
                최근 검색어가 없어요.
              </Text>
              <NoKeyword />
            </View>
          ) : (
            keywordsTrace.map(keyword => {
              return (
                <>
                  <View
                    key={keyword.id}
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
                  <View>
                    <Text
                      style={{textAlign: 'right', color: globalColors.stroke2}}>
                      전체 삭제하기
                    </Text>
                  </View>
                </>
              );
            })
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

    marginBottom: 40,
  },
  backbutton: {
    padding: 10,
    width: '8%',
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
