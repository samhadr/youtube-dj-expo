import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  result: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 7,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  resultImg: {
    width: 160,
    height: 116,
    marginRight: 10,
  },
  resultTitle: {
    width: '50%',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
});

export default styles;
