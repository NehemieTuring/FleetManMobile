import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Header() {
  const router = useRouter(); 

  const toggleDrawer = () => {
    // Expo Router n'a pas de toggleDrawer natif
    // Si tu veux un drawer réel, il faut configurer le Drawer dans _layout.tsx
    // Sinon tu peux naviguer vers un écran particulier
    // Exemple : router.push("/index")
    console.log("Bouton hamburger pressé");
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.leftIcon}>
        <Ionicons name="menu" size={30} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>FleetMan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 35,
    backgroundColor: "#96c0c7ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  leftIcon: {
    width: 40,
  },
});
