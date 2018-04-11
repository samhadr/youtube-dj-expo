import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  result: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 15,
  },
  resultImg: {
    flex: 1,
    width: '20%',
    height: 90,
    marginRight: 10,
  },
  resultTitle: {
    width: '80%',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
});

export default styles;
