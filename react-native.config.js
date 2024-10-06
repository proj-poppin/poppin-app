/**
 * React Native CLI가 ios 디렉토리의 Podfile만 참조하도록 합니다.
 * @author 도형
 */
module.exports = {
  project: {
    ios: {
      sourceDir: './ios',
    },
  },
};
