import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SessionsScreen from '../screens/SessionsScreen';

export default TabNavigator(
  {
    Search: {
      screen: SearchScreen,
    },
    Sessions: {
      screen: SessionsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          // case 'Home':
          //   iconName = Platform.OS === 'ios' ? `ios-home` : 'md-home';
          //   break;
          case 'Search':
            iconName = Platform.OS === 'ios' ? `ios-search` : 'md-search';
            break;
          case 'Sessions':
            iconName =
              Platform.OS === 'ios' ? `ios-options` : 'md-options';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3, width: 25 }}
            color={focused ? Colors.activeTintColor : Colors.inactiveTintColor}
          />
        );
      },
    }),
    tabBarOptions: {
      inactiveBackgroundColor: Colors.red,
      activeBackgroundColor: Colors.darkRed,
      inactiveTintColor: Colors.inactiveTintColor,
      activeTintColor: Colors.activeTintColor,
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
