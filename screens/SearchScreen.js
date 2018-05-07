import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';

import { API } from 'aws-amplify';

import SearchResult from '../components/SearchResult';

import globalStyles from '../styles/GlobalStyles';
import styles from '../styles/SearchStyles';

const playlistsMock = [{
  "playlists": [
    {
      "title": "eget",
      "user": "Byrann"
    },
    {
      "title": "ac",
      "user": "Maurene"
    },
    {
      "title": "molestie",
      "user": "Herman"
    }
  ]
}];

class Search extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  constructor(props) {
    super(props);
    this.state = {
      text: 'Change Me',
      searchResults: {},
      resultsVisible: false,
      modalVisible: false,
      playlists: {},
    };
  }

  onSearch = () => {
    const { text } = this.state;
    this.getSearchResults(text);
    // this.renderSearchResults();
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

  addToPlaylist = () => {
    // try {
    //   const playlistsResp = this.getPlaylists();
    //   console.log('playlists = ', playlists);
    //   this.setState({
    //     playlists: playlistsMock,
    //     modalVisible: visible
    //   });
    // } catch (e) {
    //   alert(e);
    // }
    console.log('addToPlaylist click');
    this.setState({ modalVisible: true });
  }

  getPlaylists() {
    return API.get('playlists', '/playlists');
  }

  showModal = () => {
    const { modalVisible } = this.state.modalVisible;
    return (
      <View style={{marginTop: 22}}>
        <Modal
          style={{height: 100, justifyContent: 'center', alignContent: 'center'}}
          animationType="slide"
          transparent={false}
          visible
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>This is a modal</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
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

  keyExtractor = (item, index) => item.etag;

  renderSearchResults = () => {
    const { searchResults: { items } } = this.state;

    if (items) {
      const results = (
        <View style={styles.resultsWrapper}>
          {/* <Text>Search Results</Text> */}
          <FlatList
            keyExtractor={this.keyExtractor}
            data={items}
            renderItem={this.renderResult}
          />
        </View>
      );
      return results;
    }
    return null;
  }

  render() {
    const { resultsVisible, modalVisible } = this.state;
    const results = resultsVisible ? this.renderSearchResults() : null;
    const modal = modalVisible ? this.showModal() : null;

    return (
      <View style={globalStyles.container}>
        <View style={styles.searchForm}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ text })}
            placeholder={this.state.text}
            onSubmitEditing={this.onSearch}
          />
          <TouchableOpacity
            type="submit"
            style={styles.button}
            onPress={this.onSearch}
            title="Search"
            accessibilityLabel="Search for videos on YouTube"
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.content}>
          {results}
        </View>
        {modal}
      </View>
    );
  }
}

export default Search;
