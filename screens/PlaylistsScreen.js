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

  constructor(props) {
    super(props);
    this.state = {
      playlistsData: {},
    };
  }

  componentDidMount() {
    fetch('https://my.api.mockaroo.com/playlists-basic.json?key=5a2000c0')
    .then(response => response.json())
    .then((data) => {
      this.setState({
        playlistsData: data
      });
    });
  }

  renderPlaylist = ({item}) => (
    <View key={item.id}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>{item.title}</Text>
      <Text style={{ color: 'black' }}>{item.user}</Text>
    </View>
  );

  showPlaylists = () => {
    const { playlistsData: { playlists } } = this.state;
    console.log('playlists = ', playlists);
    const keyExtractor = (item, index) => item.id;

    if (playlists) {
      const playlistsView = (
        <FlatList
          keyExtractor={keyExtractor}
          data={playlists}
          renderItem={this.renderPlaylist}
        />
      );
      return playlistsView;
    }
    return null;
  }

  render() {
    const { playlistsData: { playlists } } = this.state;
    const showPlaylists = playlists ? this.showPlaylists() : null;

    return (
      <View style={globalStyles.container}>
        {showPlaylists}
      </View>
    );
  }
}

export default Playlists;
