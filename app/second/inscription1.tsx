import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function Inscription1() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Vérifie si le mot de passe respecte les règles
  const passwordIsValid = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  // Vérifie si le bouton Valider doit être activé
  const canValidate = () => {
    return passwordIsValid() && confirm === password;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer votre mot de passe</Text>

      {/* MOT DE PASSE */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputWithIcon}
          placeholder="Mot de passe"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={22}
          color="#555"
          />
        </TouchableOpacity>
      </View>


      {/* CONFIRMATION */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputWithIcon}
          placeholder="Confirmer le mot de passe"
          secureTextEntry={!showConfirm}
          value={confirm}
          onChangeText={setConfirm}
        />

        <TouchableOpacity
          onPress={() => setShowConfirm(!showConfirm)}
          style={styles.eyeIcon}
        >
          <Ionicons
          name={showConfirm ? "eye-off" : "eye"}
          size={22}
          color="#555"
          />
        </TouchableOpacity>
      </View>


      {/* MESSAGES D'ERREUR */}
      {!passwordIsValid() && password.length > 0 && (
        <Text style={styles.error}>
          Le mot de passe doit contenir :
          {"\n"}• 8 caractères minimum
          {"\n"}• 1 lettre majuscule
          {"\n"}• 1 lettre minuscule
          {"\n"}• 1 chiffre
        </Text>
      )}

      {confirm.length > 0 && confirm !== password && (
        <Text style={styles.error}>Les mots de passe ne correspondent pas.</Text>
      )}

      {/* ---------- BOUTONS ---------- */}
      <View style={styles.buttonRow}>
    
        {/* BOUTON PRÉCÉDENT */}
        <TouchableOpacity
          style={[styles.button, styles.prevButton]}
          onPress={() => router.push("/second/inscription")}
          >
          <Text style={styles.buttonText}>Précédent</Text>
        </TouchableOpacity>
    
        {/* BOUTON VALIDER */}
        <TouchableOpacity
          style={[styles.button, styles.validateButton, !canValidate() && styles.buttonDisabled]}
          disabled={!canValidate()}
          onPress={() => {
            if (canValidate()) {
              router.push("/second/inscription2");
            }
          }}
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
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0055ff",
    textAlign: "center",
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 8,
    padding: 12,
  },
  showButton: {
    marginLeft: 10,
    backgroundColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  showButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  disabled: {
    opacity: 0.5,
  },

  inputWrapper: {
  width: "100%",
  position: "relative",
  marginBottom: 15,
  },

  inputWithIcon: {
  width: "100%",
  borderWidth: 1,
  borderColor: "#777",
  borderRadius: 8,
  padding: 12,
  paddingRight: 40, // important pour que le texte ne chevauche pas l’icône
  },

  eyeIcon: {
  position: "absolute",
  right: 10,
  top: "50%",
  transform: [{ translateY: -12 }],
  padding: 5,
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
