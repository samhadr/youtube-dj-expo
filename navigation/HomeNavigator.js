import React from 'react';
import { StackNavigator } from 'react-navigation';

const HomeNavigator = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Sessions: {
      screen: SessionsScreen,
    },
  },
  {
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: Colors.red,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
);