import React, { Component } from 'react';
import Modal from 'react-native-modalbox';

import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
  FlatList,
} from 'react-native';

var screen = Dimensions.get('window');

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
        <View style={globalStyles.modalContent}>
          <Text style={{ color: '#000' }}>Choose A Playlist</Text>
          <FlatList
            keyExtractor={keyExtractor}
            data={playlists}
            renderItem={this.renderPlaylist}
          />
        </View>
      );
      console.log('playlistsView = ', playlistsView);
      return playlistsView;
    }
    return null;
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

  addToPlaylist = () => {
    this.refs.playlistsModal.open();
  }

  renderList() {
    var list = [];

    for (var i=0;i<50;i++) {
      list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
    }

    return list;
  }

  render() {
    const { resultsVisible } = this.state;
    const results = resultsVisible ? this.renderSearchResults() : null;
    const BContent = <Button onPress={() => this.setState({isOpen: false})} style={[styles.btn, styles.btnModal]} title="close">X</Button>;

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
        <Button onPress={() => this.setState({isOpen: true})} style={styles.btn} title="Backdrop + backdropContent">Backdrop + backdropContent</Button>
        <Button onPress={() => this.refs.modal6.open()} style={styles.btn} title="Position bottom + ScrollView">Position bottom + ScrollView</Button>

        <Modal
          isOpen={this.state.isOpen}
          onClosed={() => this.setState({isOpen: false})}
          style={[styles.modal, styles.modal4]}
          position={"center"}
          backdropContent={BContent}
          ref={"playlistsModal"}
        >
          <Text style={styles.text}>Modal with backdrop content</Text>
          <ScrollView>
            <View style={{width: screen.width, paddingLeft: 10}}>
              {this.showPlaylists()}
            </View>
          </ScrollView>
        </Modal>

        <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal6"} swipeArea={20}>
          <ScrollView>
            <View style={{width: screen.width, paddingLeft: 10}}>
              {this.renderList()}
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  wrapper: {
    paddingTop: 50,
    flex: 1
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal2: {
    height: 230,
    backgroundColor: "#3B5998"
  },

  modal3: {
    height: 300,
    width: 300
  },

  modal4: {
    height: 300
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    color: "black",
    fontSize: 22
  }

});

export default ModalBox;
