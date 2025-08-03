import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    padding: 24,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  innerCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  hexText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
});