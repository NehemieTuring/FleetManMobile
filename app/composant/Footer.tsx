import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const navItems = [
    { route: "/second/vehicule", icon: "car", id: "vehicule" },
    { route: "/second/conducteur", icon: "people", id: "conducteur" },
    { route: "/second/dashboard", icon: "grid", id: "dashboard" },
    { route: "/second/carte", icon: "location", id: "carte" },
    { route: "/second/alerte", icon: "notifications", id: "alerte" },
  ];

  const isActive = (route) => pathname === route;

  return (
    <View style={styles.footer}>
      {navItems.map((item) => {
        const active = isActive(item.route);
        const hovered = hoveredIcon === item.id;
        const showCircle = active || hovered;

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(item.route)}
            onMouseEnter={() => setHoveredIcon(item.id)}
            onMouseLeave={() => setHoveredIcon(null)}
            style={styles.iconContainer}
          >
            <View
              style={[
                styles.iconWrapper,
                showCircle && styles.activeCircle,
              ]}
            >
              <Ionicons name={item.icon} size={34} color="white" />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 15,
    backgroundColor: "#0055ff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
  activeCircle: {
    backgroundColor: '#ff6b35',
  },
});