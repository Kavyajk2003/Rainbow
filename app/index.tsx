import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

import ColorCard from "./components/ColorCard";
import useColorScreen from "./hooks/useColorScreen";
import styles from "./styles/colorScreenStyles";

export default function ColorScreen() {
  const { colors, isOnline, syncing, addColor } = useColorScreen();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Color Code Generator</Text>
        <View style={styles.online}>
          <Text
            style={[
              styles.connectionStatus,
              { color: isOnline ? "green" : "red" },
            ]}
          >
            {isOnline ? "Online" : "Offline"}
          </Text>
          <Text style={styles.syncingText}>
            {syncing || !isOnline ? (
              <Icon name="sync" size={20} color="#007aff" />
            ) : (
              <Icon name="check-circle" size={20} color="green" />
            )}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={addColor}>
        <Text style={styles.buttonText}>Generate Color</Text>
      </TouchableOpacity>
      <View style={styles.body}>
        <FlatList
          data={colors}
          keyExtractor={(item: Color) => item.id}
          renderItem={({ item }: { item: Color }) => <ColorCard {...item} />}
          contentContainerStyle={{ paddingBottom: 24 }}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}
