import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./styles/colorScreenStyles";

export default function ColorScreen() {
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
      </View>
    </SafeAreaView>
  );
}
