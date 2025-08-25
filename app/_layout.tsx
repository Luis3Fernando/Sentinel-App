import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { COLORS } from "../src/config/colors";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#12172A", height: 90,  paddingBottom: 10 },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.lightGray,
      }}
    >
      <Tabs.Screen
        name="riesgo"
        options={{
          title: "Riesgo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="warning-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="historial"
        options={{
          title: "Historial",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      /> 
      <Tabs.Screen
        name="modalidades"
        options={{
          title: "Modalidades",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="options-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="temporada"
        options={{
          title: "Temporada",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="zonas"
        options={{
          title: "Zonas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
