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
import { useModalidades } from "../src/hooks/useModalidades";

import { COLORS } from "../src/config/colors";


export default function ModalidadesScreen() {
  const [ubigeo, setUbigeo] = useState("030101");
  const [query, setQuery] = useState("030101");

  const { data, loading, error, fetchModalidades } = useModalidades();

  const handleBuscar = () => {
    if (ubigeo.trim()) {
      setQuery(ubigeo.trim());
      fetchModalidades(ubigeo.trim());
    }
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
        <Text style={styles.header}>Modalidades</Text>
        <Text style={styles.subtitle}>Total de robos agrupados por modalidad</Text>
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
              <Text style={styles.title}>{item.p_modalidades}</Text>
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
  },
  card: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 6,
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