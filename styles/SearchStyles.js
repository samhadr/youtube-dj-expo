import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  content: {
    flex: 12,
    padding: 10,
  },
  searchForm: {
    flex: 1,
    flexDirection: 'row',
    top: 0,
    backgroundColor: '#777',
    height: 50,
    padding: 10,
  },
  text: {
    color: '#fff',
  },
  textInput: {
    backgroundColor: '#fff',
    flex: 7,
    height: 30,
    color: '#000',
    borderWidth: 1,
    borderColor: '#777',
  },
  button: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 50,
  },
  buttonText: {
    color: '#fff',
  },
  resultsWrapper: {
    flex: 1,
  },
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
