import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

type PreferenceSettingScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'SignUpPreferenceSetting'
>;

// Props 타입 정의
// HeaderOptions 컴포넌트
const SignUpPreferenceSettingOptions = ({}: {
  navigation: PreferenceSettingScreenNavigationProp;
}) => ({
  headerLeft: () => {
    return null;
  },
  headerTitle: '취향 설정하기',
});

export default SignUpPreferenceSettingOptions;
