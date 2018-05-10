import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 15,
  },
  content: {
    flex: 12,
    padding: 10,
  },
  heading: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  error: {
    marginBottom: 15,
    color: 'red',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 20,
    right: 20,
  }
});

export default globalStyles;
