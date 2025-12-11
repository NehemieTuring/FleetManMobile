import { Link } from "expo-router";
import React from "react";
import { useRouter } from "expo-router";
import {
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Background image */}
      <ImageBackground
        source={require("./Image/Acceuil.jpeg")}
        style={styles.background}
      >
        {/* Fond sombre */}
        <View style={styles.overlay} />

        {/* Contenu principal */}
        <View style={styles.content}>
          <Text style={styles.title1}>Bienvenue sur FLEETMAN</Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => router.push("/second/choix")}
          >
            <Text style={styles.btnText}>COMMENCER</Text>
          </TouchableOpacity>
        </View>

        {/* Deuxième section */}
        <View style={styles.content2}>
          <Text style={styles.title2}>Avez vous déjà un compte ?</Text>
          <Link href="/second/connexion" style={styles.link}>
            Connectez-vous ici !
          </Link>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  content2: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },

  title1: {
    fontSize: 48,
    color: "lightblue",
    marginBottom: 20,
  },

  title2: {
    flex:1,
    fontSize: 18,
    color: "white",
  },

  btn: {
    backgroundColor: "#0055FF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },

  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  link: {
    flex:1,
    fontSize: 18,
    color: "yellow",
    marginLeft: 5, 
  },
});
