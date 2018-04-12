import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  Image,
  WebView,
} from 'react-native';

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
    <Text style={styles.resultTitle}>{videoTitle}</Text>
  </View>
);

SearchResult.propTypes = {
  videoId: PropTypes.string,
  // videoImgSrc: PropTypes.string.isRequired,
  videoTitle: PropTypes.string.isRequired,
};

export default SearchResult;
