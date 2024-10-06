/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig} = require('metro-config');

//TODO: #SETTING(svg) iOS에서 svg 사용할 수 있도록 하려면 ios 폴더에서 'pod install' 해줘야 함
/**
 * #SETTING(svg) svg 파일을 import 할 수 있도록 설정
 * @see https://velog.io/@ricale/React-Native-%EC%97%90-SVG-Icon-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9E%91%EC%84%B1
 * @see https://bestofreactjs.com/repo/magicismight-react-native-svg-react-react-native-awesome-components
 * @author 현웅
 */
module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [
        ...sourceExts,
        'svg',
        'jsx',
        'js',
        'ts',
        'tsx',
        'cjs',
        'json',
      ],
    },
  };
})();

//? <default setups>
// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
// };
