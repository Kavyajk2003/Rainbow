import * as Clipboard from 'expo-clipboard';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

const ColorCard = ({ hex, timestamp }) => {
  const handleLongPress = async () => {
    try {
      await Clipboard.setStringAsync(hex);
      Alert.alert('Copied!', `Color ${hex} copied to clipboard`);
    } catch (error) {
      console.warn('Failed to copy to clipboard:', error);
      Alert.alert('Error', 'Failed to copy color to clipboard');
    }
  };

  return (
    <Pressable
      style={[styles.card, { backgroundColor: hex }]}
      onLongPress={handleLongPress}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
    >
      <View style={styles.innerCard}>
        <Text style={styles.hexText}>{hex}</Text>
        <Text style={styles.timeText}>{new Date(timestamp).toLocaleString()}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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

export default ColorCard; 