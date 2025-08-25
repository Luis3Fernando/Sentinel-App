import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useHistorial } from "../src/hooks/useHistorial";

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
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={{ marginTop: 10 }}>Cargando información...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historial por Ubigeo y Mes</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={ubigeo}
          onChangeText={setUbigeo}
          placeholder="030101"
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { flex: 0.5, marginLeft: 10 }]}
          value={mes}
          onChangeText={setMes}
          placeholder="Mes"
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
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>Año: {item.anio}</Text>
              <Text style={styles.info}>Mes: {item.mes}</Text>
              <Text style={styles.info}>Total de robos: {item.total}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={{ marginTop: 20, textAlign: "center" }}>
          No se encontraron datos
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f8",
    paddingTop: 50,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#0066cc",
    marginLeft: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  info: {
    fontSize: 15,
    color: "#555",
  },
});
