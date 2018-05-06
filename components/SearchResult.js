import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  Image,
  WebView,
  TouchableOpacity
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

// import searchStyles from '../styles/SearchStyles';
import styles from '../styles/SearchResultStyles';

const SearchResult = ({
  videoId,
  // videoImgSrc,
  videoTitle,
}) => (
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
        onPress={this.onPress}
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

SearchResult.propTypes = {
  videoId: PropTypes.string,
  // videoImgSrc: PropTypes.string.isRequired,
  videoTitle: PropTypes.string.isRequired,
};

export default SearchResult;
