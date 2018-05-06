import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import globalStyles from '../styles/GlobalStyles';

class Sessions extends Component {
  static navigationOptions = {
    title: 'Sessions',
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

    return (
      <View style={globalStyles.container}>
        <Text>Sessions Screen</Text>
      </View>
    );
  }
}

export default Sessions;
