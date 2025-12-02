import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
const BUTTON_WIDTH = width * 0.5;

export const unstable_settings = {
  headerShown: false,
};

export const options = {
  headerShown: false,
};


export default function Choix() {
  // on gère hovered et pressed séparément
  const [hovered1, setHovered1] = useState(false);
  const [pressed1, setPressed1] = useState(false);

  const [hovered2, setHovered2] = useState(false);
  const [pressed2, setPressed2] = useState(false);

  // helper pour décider de la couleur
  const bgFor = (hovered, pressed) => (hovered || pressed ? "#0055ff" : "#d3d3d3");

  return (
    <View style={styles.container}>
      <Pressable
        accessible={true}
        accessibilityRole="button"
        onPress={() => router.push("/second/inscriptionP")}
        onPressIn={() => setPressed1(true)}
        onPressOut={() => setPressed1(false)}
        onHoverIn={() => setHovered1(true)}
        onHoverOut={() => setHovered1(false)}
        style={[
          styles.button,
          { backgroundColor: bgFor(hovered1, pressed1) },
        ]}
      >
        <Text style={styles.buttonText}>Particuler</Text>
      </Pressable>

      <Pressable
        accessible={true}
        accessibilityRole="button"
        onPress={() => router.push("/second/inscriptionE")}
        onPressIn={() => setPressed2(true)}
        onPressOut={() => setPressed2(false)}
        onHoverIn={() => setHovered2(true)}
        onHoverOut={() => setHovered2(false)}
        style={[
          styles.button,
          { backgroundColor: bgFor(hovered2, pressed2) },
        ]}
      >
        <Text style={styles.buttonText}>Entreprise</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    // gap est pratique si supporté, sinon marginVertical sur boutons
    gap: 15,
  },
  button: {
    width: BUTTON_WIDTH,
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 15,
    elevation: 3,
  },
  buttonText: {
    fontSize: Math.max(14, width * 0.045), // responsive, pas trop petit
    color: "#ffffff",
    fontWeight: "600",
  },
});



































