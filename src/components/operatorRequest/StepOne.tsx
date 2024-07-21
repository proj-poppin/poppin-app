import React, {useState} from 'react';
import {View, Text} from 'react-native';
import LabelAndInputWithCloseSvg from '../LabelAndInputWithCloseSvg.tsx';
import globalColors from '../../styles/color/globalColors.ts';
import Text12R from '../../styles/texts/label/Text12R.ts';

interface StepOneProps {
  affiliation: string;
  setAffiliation: (text: string) => void;
  informerEmail: string;
  setInformerEmail: (text: string) => void;
}

const StepOne: React.FC<StepOneProps> = ({
  affiliation,
  setAffiliation,
  informerEmail,
  setInformerEmail,
}) => {
  const [affiliationLength, setAffiliationLength] = useState(0);
  const [informerEmailLength, setInformerEmailLength] = useState(0);

  return (
    <View style={{paddingHorizontal: 10}}>
      <View style={{marginTop: 0}}>
        <LabelAndInputWithCloseSvg
          label={'소속(업체명)'}
          value={affiliation}
          onChangeText={text => {
            setAffiliation(text);
            setAffiliationLength(text.length);
          }}
          isRequired={true}
          maxLength={30}
        />
        <Text style={{alignSelf: 'flex-end', color: globalColors.font}}>
          {affiliationLength}/30
        </Text>
      </View>

      <View style={{marginTop: 10}}>
        <LabelAndInputWithCloseSvg
          label={'담당자 이메일'}
          value={informerEmail}
          onChangeText={text => {
            setInformerEmail(text);
            setInformerEmailLength(text.length);
          }}
          isRequired={true}
          maxLength={50}
        />
        <Text style={{alignSelf: 'flex-end', color: globalColors.font}}>
          {informerEmailLength}/50
        </Text>
      </View>

      <Text
        style={[
          Text12R.text,
          {color: globalColors.font, textAlign: 'center', paddingTop: 10},
        ]}>
        *제공해주신 이메일로 정보확인차 연락을 드릴 예정이니,{'\n'}
        이메일 정보가 정확한지 확인하여 주시기 바랍니다.
      </Text>
    </View>
  );
};

export default StepOne;
