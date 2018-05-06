import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import SearchResult from '../components/SearchResult';

import globalStyles from '../styles/GlobalStyles';
import styles from '../styles/SearchStyles';

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
    };
  }

  onPress = () => {
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

  onYouTubeIframeAPIReady = () => {
    var e = document.getElementById("youtube-audio"),
        t = document.createElement("img");
    t.setAttribute("id", "youtube-icon"), t.style.cssText = "cursor:pointer;cursor:hand", e.appendChild(t);
    var a = document.createElement("div");
    a.setAttribute("id", "youtube-player"), e.appendChild(a);
    var o = function (e) {
      var a = e ? "IDzX9gL.png" : "quyUPXN.png";
      t.setAttribute("src", "https://i.imgur.com/" + a)
    };
    e.onclick = function () {
      r.getPlayerState() === YT.PlayerState.PLAYING || r.getPlayerState() === YT.PlayerState.BUFFERING ? (r.pauseVideo(), o(!1)) : (r.playVideo(), o(!0))
    };
    var r = new YT.Player("youtube-player", {
      height: "0",
      width: "0",
      videoId: e.dataset.video,
      playerVars: {
        autoplay: e.dataset.autoplay,
        loop: e.dataset.loop
      },
      events: {
        onReady: function (e) {
          r.setPlaybackQuality("small"), o(r.getPlayerState() !== YT.PlayerState.CUED)
        },
        onStateChange: function (e) {
          e.data === YT.PlayerState.ENDED && o(!1)
        }
      }
    })
  }

  renderResult = ({item}) => (
    <SearchResult
      key={item.id.videoId}
      videoId={item.id.videoId}
      videoImgSrc={item.snippet.thumbnails.default.url}
      videoTitle={item.snippet.title}
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
    const { resultsVisible } = this.state;
    const results = resultsVisible ? this.renderSearchResults() : null;

    return (
      <View style={globalStyles.container}>
        <View style={styles.searchForm}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ text })}
            placeholder={this.state.text}
            onSubmitEditing={this.onPress}
          />
          <TouchableOpacity
            type="submit"
            style={styles.button}
            onPress={this.onPress}
            title="Search"
            accessibilityLabel="Search for videos on YouTube"
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.content}>
          {results}
        </View>
      </View>
    );
  }
}

export default Search;
