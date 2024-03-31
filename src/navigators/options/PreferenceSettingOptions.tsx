import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthNavigatorParamList} from '../../types/AuthNavigatorParamList.ts';

type PreferenceSettingScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigatorParamList,
  'PreferenceSetting'
>;

// Props 타입 정의
// HeaderOptions 컴포넌트
const PreferenceSettingOptions = ({}: {
  navigation: PreferenceSettingScreenNavigationProp;
}) => ({
  headerLeft: () => {
    return null;
  },
  headerTitle: '취향 설정하기',
});

export default PreferenceSettingOptions;
