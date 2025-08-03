import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    display: "flex",
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: "space-between"
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#222',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  syncingText: {
    color: 'black',
    paddingTop: 3,
    textAlign: 'center',
  },
  body: {
    flex: 1
  },
  online: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 6,
    borderRadius: 4,
    gap: 4,
  },
  connectionStatus: {
    fontWeight: '600',
  }
}); 