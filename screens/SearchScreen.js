import React, { Component } from 'react';

import Modal from 'react-native-modalbox';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  // Modal,
  Dimensions,
  Button,
  ScrollView
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

// import { API } from 'aws-amplify';

import SearchResult from '../components/SearchResult';
// import PlaylistsScreen from './PlaylistsScreen';

import globalStyles from '../styles/GlobalStyles';
import styles from '../styles/SearchStyles';

var screen = Dimensions.get('window');

class Search extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  constructor() {
    super();
    this.state = {
      // text: 'Change Me',
      // searchResults: {},
      // resultsVisible: false,
      // modalVisible: true,
      // playlistsData: {},
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
  }

  // onSearch = () => {
  //   const { text } = this.state;
  //   this.getSearchResults(text);
  //   this.setState({
  //     resultsVisible: true,
  //   });
  // }

  // getSearchResults(keyword) {
  //   fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCip8J4pGR8o9PCfS4ZnbL9glOk13_BNWY&part=snippet&maxResults=25&q=${keyword}`)
  //     .then(response => response.json())
  //     .then((data) => {
  //       this.setState({
  //         searchResults: data,
  //       });
  //     });
  // }

  // addToPlaylist = () => {
  //   // try {
  //   //   const playlistsResp = this.getPlaylists();
  //   //   console.log('playlists = ', playlists);
  //   //   this.setState({
  //   //     playlists: playlistsMock,
  //   //     modalVisible: visible
  //   //   });
  //   // } catch (e) {
  //   //   alert(e);
  //   // }
  //   fetch('https://my.api.mockaroo.com/playlists-basic.json?key=5a2000c0')
  //   .then(response => response.json())
  //   .then((data) => {
  //     this.setState({
  //       playlistsData: data,
  //       modalVisible: true
  //     });
  //   });
  //   console.log('addToPlaylist click');
  //   this.setState({ modalVisible: true });
  // }

  // getPlaylists() {
  //   // return API.get('playlists', '/playlists');
  //   fetch('https://my.api.mockaroo.com/playlists-basic.json?key=5a2000c0')
  //   .then(response => response.json())
  //   .then((data) => {
  //     this.setState({
  //       playlistsData: data,
  //     });
  //   });
  // }

  // renderPlaylist = ({item}) => (
  //   <View key={item.id}>
  //     <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>{item.title}</Text>
  //     <Text style={{ color: 'black' }}>{item.user}</Text>
  //   </View>
  // );

  // showPlaylists = () => {
  //   const { playlistsData: { playlists } } = this.state;
  //   console.log('playlists = ', playlists);
  //   const keyExtractor = (item, index) => item.id;

  //   if (playlists) {
  //     const playlistsView = (
  //       <View style={globalStyles.modalContent}>
  //         <Text style={{ color: '#000' }}>Choose A Playlist</Text>
  //         <FlatList
  //           keyExtractor={keyExtractor}
  //           data={playlists}
  //           renderItem={this.renderPlaylist}
  //         />
  //       </View>
  //     );
  //     return playlistsView;
  //   }
  //   return null;
  // }

  // showModal = () => {
  //   const { modalVisible } = this.state;
  //   const showPlaylists = this.showPlaylists();
  //   console.log('showPlaylists = ', showPlaylists);
  //   if (showPlaylists) {
  //     return (
  //       <View style={{marginTop: 22}}>
  //         <Modal
  //           style={{height: 100, justifyContent: 'center', alignContent: 'center'}}
  //           animationType="slide"
  //           visible
  //           onRequestClose={() => {
  //             alert('Modal has been closed.');
  //           }}>
  //           <View>
  //             {/* <Text>Choose A Playlist</Text> */}
  //             {showPlaylists}
  //             <TouchableOpacity
  //               style={globalStyles.modalClose}
  //               onPress={() => {
  //                 this.setState({ modalVisible: false });
  //               }}>
  //               <Ionicons
  //                 name="md-close"
  //                 size={28}
  //                 style={{ width: 25 }}
  //                 // color={focused ? Colors.activeTintColor : Colors.inactiveTintColor}
  //               />
  //             </TouchableOpacity>
  //           </View>
  //         </Modal>
  //       </View>
  //     )
  //   } 
  // }

  // renderResult = ({item}) => (
  //   <SearchResult
  //     key={item.id.videoId}
  //     videoId={item.id.videoId}
  //     videoImgSrc={item.snippet.thumbnails.default.url}
  //     videoTitle={item.snippet.title}
  //     addToPlaylist={this.addToPlaylist}
  //   />
  // );

  // keyExtractor = (item, index) => item.etag;

  // renderSearchResults = () => {
  //   const { searchResults: { items } } = this.state;

  //   if (items) {
  //     const results = (
  //       <View style={styles.resultsWrapper}>
  //         {/* <Text>Search Results</Text> */}
  //         <FlatList
  //           keyExtractor={this.keyExtractor}
  //           data={items}
  //           renderItem={this.renderResult}
  //         />
  //       </View>
  //     );
  //     return results;
  //   }
  //   return null;
  // }

  renderList() {
    var list = [];

    for (var i=0;i<50;i++) {
      list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
    }

    return list;
  }

  render() {
    // const { resultsVisible, modalVisible } = this.state;
    // const results = resultsVisible ? this.renderSearchResults() : null;
    const list = this.renderList();
    // const modal = modalVisible ? this.showModal() : null;
    const BContent = <Button onPress={() => this.setState({isOpen: false})} style={globalStyles.modalClose} title="close">X</Button>

    return (
      <View style={globalStyles.container}>
        {/* <View style={styles.searchForm}>
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
        {modal} */}
        <Button onPress={() => this.refs.modal6.open()} style={styles.button} title="Position bottom + ScrollView">Position bottom + ScrollView</Button>
        <Modal isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})} ref={"modal6"} style={[styles.modal, styles.modal4]} swipeArea={20} position={"center"} backdropContent={BContent}>
          <Text>Modal with backdrop content</Text>
          <ScrollView>
            <View style={{width: screen.width, paddingLeft: 10}}>
              {list}
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

export default Search;
