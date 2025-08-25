import { StyleSheet, Text, View } from "react-native";

export default function TemporadaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🌦️ Temporada</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, fontWeight: "bold" },
});
