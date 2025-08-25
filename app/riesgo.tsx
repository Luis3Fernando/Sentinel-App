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
import { useRiesgo } from "../src/hooks/useRiesgo";

export default function RiesgoScreen() {
  const [ubigeo, setUbigeo] = useState("030101");
  const [query, setQuery] = useState("030101");

  const { data, loading, error } = useRiesgo(query);

  const handleBuscar = () => {
    if (ubigeo.trim()) setQuery(ubigeo.trim());
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={ubigeo}
          onChangeText={setUbigeo}
          placeholder="030101"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleBuscar}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item: any) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.dist_hecho}</Text>
              <Text style={styles.info}>Robos: {item.total_robos}</Text>
              <Text style={styles.info}>Riesgo: {item.nivel_riesgo}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={{ marginTop: 20 }}>No se encontraron datos</Text>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
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
