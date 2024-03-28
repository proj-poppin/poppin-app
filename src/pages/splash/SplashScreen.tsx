import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import globalColors from '../../styles/color/globalColors.ts';
import Splash1 from '../../assets/images/splash1.svg';
import Splash2 from '../../assets/images/splash2.svg';
import Splash3 from '../../assets/images/splash3.svg';
import Splash4 from '../../assets/images/splash4.svg';

// 첫 번째 화면은 SVG 자체가 없으므로 null 추가, Splash4를 두 번 사용
const svgs = [null, Splash1, Splash2, Splash3, Splash4, Splash4];

const SplashScreen: React.FC = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % svgs.length);
    }, 800); // 화면 전환 간격을 1초로 변경

    return () => clearInterval(interval);
  }, []);

  const SvgComponent = svgs[imageIndex];

  return (
    <LinearGradient
      colors={[globalColors.blue, globalColors.purple]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <View style={styles.imageContainer}>
        {/* SVG 컴포넌트가 null이 아닐 때만 렌더링 */}
        {SvgComponent && <SvgComponent width="100" height="100" />}
        {/* 마지막 화면에서 'POPPIN' 텍스트 추가 */}
        {imageIndex === svgs.length - 1 && (
          <Text style={styles.popinText}>POPPIN</Text>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 120, // 이미지와 텍스트를 모두 수용할 충분한 높이
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  popinText: {
    position: 'absolute',
    bottom: -20,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
