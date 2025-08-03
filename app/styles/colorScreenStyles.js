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
}); 