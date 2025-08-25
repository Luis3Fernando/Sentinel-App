import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { COLORS } from "../src/config/colors";
import { useHistorial } from "../src/hooks/useHistorial";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 2; 

export default function HistorialScreen() {
  const [ubigeo, setUbigeo] = useState("030101");
  const [mes, setMes] = useState("");
  const { data, loading, error, fetchHistorial } = useHistorial();

  const handleBuscar = () => {
    if (!ubigeo.trim()) {
      alert("El ubigeo es obligatorio");
      return;
    }
    const mesNumber = Number(mes);
    if (!mesNumber || mesNumber < 1 || mesNumber > 12) {
      alert("El mes debe estar entre 1 y 12");
      return;
    }
    fetchHistorial(ubigeo, mesNumber);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={{ marginTop: 10 }}>Cargando información...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Historial</Text>
        <Text style={styles.subtitle}>Ver historial de robos por ubigeo y mes</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={ubigeo}
          onChangeText={setUbigeo}
          placeholder="030101"
          placeholderTextColor={COLORS.gray}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { flex: 0.5, marginLeft: 10 }]}
          value={mes}
          onChangeText={setMes}
          placeholder="Mes"
          placeholderTextColor={COLORS.gray}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleBuscar}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.yearBadge}>
                <Text style={styles.yearText}>{item.anio}</Text>
              </View>
              <Text style={styles.title}>Mes: {item.mes}</Text>
              <Text style={styles.info}>Total de robos: {item.total}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>No se encontraron datos</Text>
      )}
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
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    marginLeft: 10,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 20,
    paddingTop: 20
  },
  card: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 16,
    width: CARD_WIDTH,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: "relative",
  },
  yearBadge: {
    position: "absolute",
    top: -10,
    right: -1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  yearText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "#DDDDDD",
  },
  noDataText: {
    marginTop: 20,
    textAlign: "center",
    color: COLORS.gray,
    fontSize: 16,
  },
});
