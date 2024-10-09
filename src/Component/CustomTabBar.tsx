import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';

function CustomTabBar({state, navigation, handleTabPress, selectedTab}) {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          return (
            <Pressable
              key={route.key}
              style={[
                styles.tabItem,
                {
                  borderBottomWidth: state.index === index ? 3.5 : 0,
                  borderColor: globalColors.blue,
                },
              ]}
              onPress={() => {
                handleTabPress(route.name);
                navigation.navigate(route.name);
              }}>
              <Text
                style={
                  selectedTab === route.name
                    ? styles.activeTab
                    : styles.inactiveTab
                }>
                {route.name === '팝업'
                  ? '팝업'
                  : route.name === '공지 사항'
                  ? '공지사항'
                  : '운영 종료'}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'column',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    elevation: 2,
    paddingLeft: 17,
    paddingRight: 17,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  activeTab: {
    color: 'black',
  },
  inactiveTab: {
    color: 'gray',
  },
});

export default CustomTabBar;
