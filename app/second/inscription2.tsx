import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function inscription2() {
  const router = useRouter();
  const [selected, setSelected] = useState(""); // "" = aucune sélection

  const handleValidate = () => {
    if (selected === "mobile") {
      router.push("/second/connexion"); // Orange/Mobile Money → connexion
    } else if (selected === "card") {
      // Carte bancaire → pour l'instant rien
      alert("Paiement par carte bancaire non implémenté pour le moment.");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Choisissez votre mode de paiement</Text>

      {/* ------------------- BOUTONS DE PAIEMENT ------------------- */}
      <View style={styles.paymentContainer}>
        
        {/* Carte Bancaire */}
        <TouchableOpacity
          style={[
            styles.paymentButton,
            selected === "card" && styles.selectedButton
          ]}
          onPress={() => setSelected("card")}
        >
          <Text style={styles.paymentText}>Carte Bancaire</Text>
        </TouchableOpacity>

        {/* Orange / Mobile Money */}
        <TouchableOpacity
          style={[
            styles.paymentButton,
            selected === "mobile" && styles.selectedButton
          ]}
          onPress={() => setSelected("mobile")}
        >
          <Text style={styles.paymentText}>Orange / Mobile Money</Text>
        </TouchableOpacity>

      </View>

      {/* ------------------- BOUTONS DU BAS ------------------- */}
      <View style={styles.buttonRow}>

        {/* Précédent */}
        <TouchableOpacity
          style={[styles.button, styles.prevButton]}
          onPress={() => router.push("/second/inscription1")}
        >
          <Text style={styles.buttonText}>Précédent</Text>
        </TouchableOpacity>

        {/* Valider */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.validateButton,
            !selected && styles.buttonDisabled
          ]}
          disabled={!selected}
          onPress={handleValidate}
        >
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0055ff",
    textAlign: "center",
    marginBottom: 40,
  },

  paymentContainer: {
    width: "100%",
    alignItems: "center",
    gap: 15,
    marginBottom: 40,
  },

  paymentButton: {
    width: "80%",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 10,
    alignItems: "center",
  },

  selectedButton: {
    backgroundColor: "#0055ff22",
    borderColor: "#0055ff",
  },

  paymentText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  prevButton: {
    backgroundColor: "#ffa500",
    marginRight: 10,
  },

  validateButton: {
    backgroundColor: "#0055ff",
    marginLeft: 10,
  },

  buttonDisabled: {
    backgroundColor: "#888",
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});