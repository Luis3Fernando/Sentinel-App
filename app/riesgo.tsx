import { FontAwesome5 } from "@expo/vector-icons";
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
import { COLORS } from '../src/config/colors';
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
      <View style={styles.header}>
        <Text style={styles.appName}>Sentinel</Text>
        <Text style={styles.subtitle}>
          Sentinel es una app informativa sobre robos en Perú
        </Text>
      </View>

      {/* Buscador */}
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
          <FontAwesome5 name="search" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Lista de resultados */}
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Icono de policía */}
              <View style={styles.iconCircle}>
                <FontAwesome5 name="user-shield" size={28} color={COLORS.white} />
              </View>
              {/* Información */}
              <Text style={styles.title}>{item.dist_hecho}</Text>
              <Text style={styles.info}>Robos: {item.total_robos}</Text>
              <Text style={styles.info}>Riesgo: {item.nivel_riesgo}</Text>
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
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.white,
    marginTop: 6,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
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
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconCircle: {
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
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
    color: COLORS.gray,
    textAlign: "center",
    fontSize: 16,
  },
});