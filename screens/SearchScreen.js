import React, { Component } from 'react';
import Modal from 'react-native-modalbox';

import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import SearchResult from '../components/SearchResult';

import globalStyles from '../styles/GlobalStyles';
import searchStyles from '../styles/SearchStyles';

class ModalBox extends Component {

  constructor() {
    super();
    this.state = {
      text: 'Change Me',
      searchResults: {},
      resultsVisible: false,
      playlistsData: {},
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
  }

  componentDidMount() {
    fetch('https://my.api.mockaroo.com/playlists-basic.json?key=5a2000c0')
    .then(response => response.json())
    .then((data) => {
      this.setState({
        playlistsData: data,
        modalVisible: true
      });
    });
  }

  onSearch = () => {
    const { text } = this.state;
    this.getSearchResults(text);
    this.setState({
      resultsVisible: true,
    });
  }

  getSearchResults(keyword) {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCip8J4pGR8o9PCfS4ZnbL9glOk13_BNWY&part=snippet&maxResults=25&q=${keyword}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          searchResults: data,
        });
      });
  }

  renderResult = ({item}) => (
    <SearchResult
      key={item.id.videoId}
      videoId={item.id.videoId}
      videoImgSrc={item.snippet.thumbnails.default.url}
      videoTitle={item.snippet.title}
      addToPlaylist={this.addToPlaylist}
    />
  );

  renderSearchResults = () => {
    const { searchResults: { items } } = this.state;
    const keyExtractor = (item, index) => item.etag;

    if (items) {
      const results = (
        <View style={searchStyles.resultsWrapper}>
          <FlatList
            keyExtractor={keyExtractor}
            data={items}
            renderItem={this.renderResult}
          />
        </View>
      );
      return results;
    }
    return null;
  }

  renderPlaylist = ({item}) => (
    <View key={item.id} style={globalStyles.modalListItem}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>{item.title}</Text>
      <Text style={{ fontSize: 10 }}>by <Text style={[globalStyles.emphasis, { fontSize: 14 }]}>{item.user}</Text></Text>
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
      console.log('playlistsView = ', playlistsView);
      return playlistsView;
    }
    return null;
  }

  addToPlaylist = () => {
    this.setState({isOpen: true});
  }

  render() {
    const { resultsVisible } = this.state;
    const results = resultsVisible ? this.renderSearchResults() : null;

    return (
      <View style={globalStyles.container}>
      <View style={searchStyles.searchForm}>
          <TextInput
            style={searchStyles.textInput}
            onChangeText={text => this.setState({ text })}
            placeholder={this.state.text}
            onSubmitEditing={this.onSearch}
          />
          <TouchableOpacity
            type="submit"
            style={searchStyles.button}
            onPress={this.onSearch}
            title="Search"
            accessibilityLabel="Search for videos on YouTube"
          >
            <Text style={searchStyles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.content}>
          {results}
        </View>
        <Modal
          isOpen={this.state.isOpen}
          onClosed={() => this.setState({isOpen: false})}
          style={globalStyles.modal}
          position={"center"}
          ref={"playlistsModal"}
          swipeArea={10}
        >
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.heading}>Choose A Playlist</Text>
            <TouchableOpacity
              onPress={() => this.setState({isOpen: false})}
              style={globalStyles.modalClose} title="close"
            >
              <Ionicons
                name="md-close"
                size={24}
              />
            </TouchableOpacity>
            <ScrollView>
              {this.showPlaylists()}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }

}

export default ModalBox;
