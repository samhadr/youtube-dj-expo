import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  Image,
  WebView,
  TouchableOpacity,
  Modal
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { API } from 'aws-amplify';

import styles from '../styles/SearchResultStyles';

class SearchResult extends Component {
  static propTypes = {
    videoId: PropTypes.string,
    videoTitle: PropTypes.string.isRequired,
    addToPlaylist: PropTypes.func
  }

  constructor(props) {
    super(props);
    // this.state = {
    //   modalVisible: false,
    //   playlists: {},
    // }
  }

  render() {
    const { videoId, videoTitle, addToPlaylist } = this.props;

    return (
      <View style={styles.result} key={videoId}>
        {/* <Image style={styles.resultImg} source={{ uri: `${videoImgSrc}` }} alt="video thumbnail" /> */}
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
          style={styles.resultImg}
        />
        <View style={styles.resultInfo}>
          <Text style={styles.resultTitle}>{videoTitle}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={addToPlaylist}
            title="Add to Playlist"
            accessibilityLabel="Add to Playlist"
          >
            <Ionicons
              name="md-add"
              size={14}
              style={styles.addButtonIcon}
            />
            <Text style={styles.addButtonText}>Add to Playlist</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SearchResult;
