import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import { WebBrowser } from 'expo';

import globalStyles from '../styles/GlobalStyles';
import styles from '../styles/HomeStyles';

import LoginScreen from './LoginScreen';
import SessionsScreen from './SessionsScreen';

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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={globalStyles.container}>
        <View style={styles.content}>
          <View style={styles.div}>
            <Text>Welcome to YouTube DJ!</Text>
          </View>
          <View style={styles.div}>
            <Text style={{textAlign: 'center'}}>To host a session, login to your YouTube account and create a new playlist:</Text>
            <Button
              title="Login to YouTube"
              onPress={() => navigate('Login')}
              style={styles.button}
            />
          </View>
          <View style={styles.div}>
            <Text>To make requests, find a session by ID:</Text>
            <Button
              title="Find Session"
              onPress={() => navigate('Sessions')}
              style={styles.button}
            />
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}
