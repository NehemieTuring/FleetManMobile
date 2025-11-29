import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


export default function Footer() {
  const router = useRouter();

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => router.push("/second/vehicule")}>
        <Ionicons name="car" size={34} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/second/conducteur")}>
        <Ionicons name="people" size={34} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/second/dashboard")}>
        <Ionicons name="grid" size={34} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/second/carte")}>
        <Ionicons name="location" size={34} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/second/alerte")}>
        <Ionicons name="notifications" size={34} color="white" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 0,
    backgroundColor: "#96c0c7ff",
    alignItems: "center",
    flexDirection: "row",        // <- horizontal
    justifyContent: "space-around", // espace entre icônes
  },
  icons: {
    flexDirection: "row",
    gap: 15,
  },
});