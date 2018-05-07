import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import globalStyles from '../styles/GlobalStyles';

class Playlists extends Component {
  static navigationOptions = {
    title: 'Playlists',
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
        <Text>Playlists Screen</Text>
      </View>
    );
  }
}

export default Playlists;
