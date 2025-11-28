import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function InscriptionE() {
  const [nomEntreprise, setNomEntreprise] = useState("");
  const router = useRouter(); // pour naviguer

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Veuillez entrer le nom de votre entreprise : </Text>

      {/* Champ de saisie */}
      <TextInput
        style={styles.input}
        placeholder="Entrez le nom"
        placeholderTextColor="#888"
        value={nomEntreprise}
        onChangeText={setNomEntreprise}
      />

      {/* ----------- BOUTONS CÔTE À CÔTE ----------- */}
      <View style={styles.buttonRow}>

        {/* BOUTON PRÉCÉDENT */}
        <TouchableOpacity
          style={[styles.button, styles.prevButton]}
          onPress={() => router.push("/second/choix")}
        >
          <Text style={styles.buttonText}>Précédent</Text>
        </TouchableOpacity>

        {/* BOUTON VALIDER */}
        <TouchableOpacity
          disabled={nomEntreprise.trim().length === 0}
          style={[
            styles.button,
            styles.validateButton,
            nomEntreprise.trim().length === 0 && styles.disabledButton
          ]}
          onPress={() => {
            if (nomEntreprise.trim().length > 0) {
              router.push("/second/inscription");
            }
          }}
        >
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>


      </View>
      {/* ------------------------------------------- */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0055ff",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    minWidth: 120,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  prevButton: {
    backgroundColor: "#ffa500",
    marginRight: 10,
  },
  validateButton: {
    backgroundColor: "#0055ff",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  
  disabledButton: {
    backgroundColor: "#888", // gris, bouton inactif
    opacity: 0.6
  },


});
