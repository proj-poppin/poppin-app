// import Tab1SvgOn from 'src/Resource/svg/bottom-nav-bar-tab1-active.svg';
// import Tab1Svg from 'src/Resource/svg/bottom-nav-bar-tab1-inactive.svg';
// import Tab2SvgOn from 'src/Resource/svg/bottom-nav-bar-tab2-active.svg';
// import Tab2Svg from 'src/Resource/svg/bottom-nav-bar-tab2-inactive.svg';
// import Tab3SvgOn from 'src/Resource/svg/Tab/bottom-nav-bar-tab3-active.svg';
// import Tab3Svg from 'src/Resource/svg/bottom-nav-bar-tab3-inactive.svg';
// import Tab4SvgOn from 'src/Resource/svg/bottom-nav-bar-tab4-active.svg';
// import Tab4Svg from 'src/Resource/svg/bottom-nav-bar-tab4-inactive.svg';
// import globalColors from '../styles/color/globalColors.ts';
// import Text13R from '../styles/texts/label/Text12R.ts';
// import HomeScreen from '../pages/home/HomeScreen.tsx';
// import FindScreen from '../pages/find/FindScreen.tsx';
// import LikesScreen from '../pages/likes/LikesScreen.tsx';
// import MyPageScreen from '../pages/myPage/MyPageScreen.tsx';
// import React, {ReactElement} from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// const Tab = createBottomTabNavigator();
//
// function MainTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarIcon: ({focused}): React.ReactElement | null => {
//           let IconComponent: (() => ReactElement) | null = null;
//           if (route.name === 'Home') {
//             IconComponent = () => (focused ? <Tab1SvgOn /> : <Tab1Svg />);
//           } else if (route.name === 'Find') {
//             IconComponent = () => (focused ? <Tab2SvgOn /> : <Tab2Svg />);
//           } else if (route.name === 'Likes') {
//             IconComponent = () => (focused ? <Tab3SvgOn /> : <Tab3Svg />);
//           } else if (route.name === 'MyPage') {
//             IconComponent = () => (focused ? <Tab4SvgOn /> : <Tab4Svg />);
//           }
//           return IconComponent ? IconComponent() : null;
//         },
//         tabBarLabel: (() => {
//           switch (route.name) {
//             case 'Home':
//               return '홈';
//             case 'Find':
//               return '팝업 찾기';
//             case 'Likes':
//               return '관심';
//             case 'MyPage':
//               return '마이 페이지';
//             default:
//               return route.name;
//           }
//         })(),
//         tabBarActiveTintColor: globalColors.blue,
//         tabBarInactiveTintColor: globalColors.font,
//         tabBarStyle: {
//           height: 100,
//           paddingTop: 5,
//           borderTopLeftRadius: 25,
//           borderTopRightRadius: 25,
//           position: 'absolute',
//           borderTopColor: 'white',
//           borderTopWidth: 1,
//           shadowOpacity: 0.15,
//           backgroundColor: 'white',
//         },
//         tabBarLabelStyle: Text13R.text,
//       })}>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Find" component={FindScreen} />
//       <Tab.Screen name="Likes" component={LikesScreen} />
//       <Tab.Screen name="MyPage" component={MyPageScreen} />
//     </Tab.Navigator>
//   );
// }
//
// export default MainTabNavigator;
