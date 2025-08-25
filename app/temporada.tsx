import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../src/config/colors";
import { useTemporal } from "../src/hooks/useTemporal";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function TemporadaScreen() {
  const { data, loading, error, fetchTemporal } = useTemporal();

  useEffect(() => {
    fetchTemporal();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Cargando temporada...</Text>
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

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>No hay registros de temporada</Text>
      </View>
    );
  }

  return (
     <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Temporada</Text>
        <Text style={styles.subtitle}>Total de robos por temporada</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
        renderItem={({ item }) => {
          const mesIndex = item.mes - 1;
          const mesNombre = MONTHS[mesIndex] || item.mes;
          return (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{mesNombre}</Text>
              <Text style={styles.cardSubtitle}>{item.total} robos</Text>
            </View>
          );
        }}
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
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#DDDDDD",
  },
});