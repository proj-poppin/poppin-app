import {View} from 'react-native';
import {moderateScale} from 'src/Util';

export const ItemSeparatorComponent = () => (
  <View
    style={{
      height: moderateScale(1),
      backgroundColor: '#e7e7e7',
      marginVertical: moderateScale(16),
    }}
  />
);
