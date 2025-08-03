import { Text, View } from 'react-native';

import styles from "../styles/colorCardStyles";

const ColorCard = ({ hex, timestamp }) => {
  return (
    <View style={[styles.card, { backgroundColor: hex }]}>
      <View style={styles.innerCard}>
        <Text style={styles.hexText}>{hex}</Text>
        <Text style={styles.timeText}>{new Date(timestamp).toLocaleString()}</Text>
      </View>
    </View>
  );
};


export default ColorCard; 