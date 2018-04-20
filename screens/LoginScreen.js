import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import globalStyles from '../styles/GlobalStyles';

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     text: 'Change Me',
  //     searchResults: {},
  //     resultsVisible: false,
  //   };
  // }

  render() {
    const { resultsVisible } = this.state;
    const results = resultsVisible ? this.renderSearchResults() : null;

    return (
      <View style={globalStyles.container}>
        <Text>Login Screen</Text>
      </View>
    );
  }
}

export default Login;
