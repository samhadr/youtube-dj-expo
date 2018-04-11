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

  renderSearchResults = () => {
    const { searchResults: { items } } = this.state;

    if (items) {
      const results = (
        <View style={styles.resultsWrapper}>
          <Text style={styles.text}>Search Results</Text>
          <FlatList
            keyExtractor={(item) => item.id.videoId}
            data={items}
            renderItem={({ item }) => (
              <SearchResult
                key={item.id.videoId}
                videoId={item.id.videoId}
                videoImgSrc={item.snippet.thumbnails.default.url}
                videoTitle={item.snippet.title}
              />
            )}
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
