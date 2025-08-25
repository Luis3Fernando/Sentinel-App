import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../src/config/colors";
import { useZonas } from "../src/hooks/useZonas";

export default function ZonasScreen() {
  const { data, loading, error } = useZonas();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Cargando zonas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.subtitle, { color: "red" }]}>Error: {error}</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>No hay registros de zonas</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Zonas de mayor incidencia</Text>
        <Text style={styles.subtitle}>Total de robos por lugar</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.dist_hecho}</Text>
            <Text style={styles.cardSubtitle}>{item.total} robos</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 50,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.white,
    marginTop: 4,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.gray,
    margin: 8,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 6,
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#DDDDDD",
  },
});
