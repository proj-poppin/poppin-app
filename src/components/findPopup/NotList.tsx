import React from 'react';
import {Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors';

import FindPopupNoList from '../../assets/images/findPopupNoList.svg';
import NoListText from '../../assets/images/findPopupText.svg';
import Text20B from '../../styles/texts/title/Text20B.ts';

function NotList() {
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 40,
      }}>
      <Text style={[Text20B.text, {marginBottom: 20}]}>
        조건에 해당하는 팝업 이벤트가 없어요😥
      </Text>
      <FindPopupNoList width="45%" height={200} />
      <NoListText width={250} height={120} />
      <View
        style={{
          width: '95%',
          height: 55,
          backgroundColor: globalColors.blue,
          borderRadius: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[Text20B.text, {color: globalColors.white}]}>
          제보하러 가기
        </Text>
      </View>
    </View>
  );
}

export default NotList;
