import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Inscription() {
  const router = useRouter();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  // -----------------------------
  //     VALIDATIONS / CONTRAINTES
  // -----------------------------

  // email doit contenir un @
  const emailValide = email.includes("@");

  // téléphone : uniquement chiffres
  const telephoneValide = /^[0-9]+$/.test(telephone);

  // date : format JJ/MM/AAAA
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const dateValide = dateRegex.test(dateNaissance);

  const formValide =
    nom.trim() !== "" &&
    prenom.trim() !== "" &&
    emailValide &&
    telephoneValide &&
    dateValide;

  const handleSubmit = () => {
    if (!formValide) return;
    router.push("/second/inscription1");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      {/* Nom */}
      <TextInput
        style={styles.input}
        placeholder="Nom"
        placeholderTextColor="#888"
        value={nom}
        onChangeText={setNom}
      />

      {/* Prénom */}
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        placeholderTextColor="#888"
        value={prenom}
        onChangeText={setPrenom}
      />

      {/* Date de naissance */}
      <TextInput
        style={styles.input}
        placeholder="Date de naissance (JJ/MM/AAAA)"
        placeholderTextColor="#888"
        value={dateNaissance}
        onChangeText={setDateNaissance}
      />
      {!dateValide && dateNaissance.length > 0 && (
        <Text style={styles.error}>
          Format requis : JJ/MM/AAAA
        </Text>
      )}

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {!emailValide && email.length > 0 && (
        <Text style={styles.error}>
          L'email doit contenir un "@"
        </Text>
      )}

      {/* Téléphone */}
      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={telephone}
        onChangeText={setTelephone}
      />
      {!telephoneValide && telephone.length > 0 && (
        <Text style={styles.error}>
          Le téléphone doit contenir uniquement des chiffres
        </Text>
      )}

      {/* ---------- BOUTONS ---------- */}
      <View style={styles.buttonRow}>

        {/* BOUTON PRÉCÉDENT */}
        <TouchableOpacity
          style={[styles.button, styles.prevButton]}
          onPress={() => router.push("/second/inscriptionE")}
        >
          <Text style={styles.buttonText}>Précédent</Text>
        </TouchableOpacity>

        {/* BOUTON VALIDER */}
        <TouchableOpacity
          disabled={!formValide}
          onPress={handleSubmit}
          style={[
            styles.button,
            styles.validateButton,
            !formValide && styles.buttonDisabled
          ]}
        >
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

// ---------------------------------
//            STYLES
// ---------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0055ff",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 13,
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
