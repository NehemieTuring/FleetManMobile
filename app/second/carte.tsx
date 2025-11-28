// import { StyleSheet, Text, View } from "react-native";
// import {Link} from "expo-router";
// import { Background } from "@react-navigation/elements";
// import { SafeAreaView } from "react-native-safe-area-context";
// import React from "react";


// export default function connexion(){
//     return(
//         <Text>
//             Page de la carte
//             <Link href="/second/vehicule">{"\n"}vehicule</Link>
//             <Link href="/second/conducteur">{"\n"}conducteur</Link>
//             <Link href="/second/alerte">{"\n"}alerte</Link>
//             <Link href="/second/dashboard">{"\n"}dashboard</Link>

//         </Text>

//     )
// } 


import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Dashboard() {
  const [selectedFooter, setSelectedFooter] = useState("home");

  return (
    <View style={styles.container}>

      {/* ------------------- HEADER ------------------- */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/android-icon-background.png")} // Remplace par ton logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Mon Application</Text>
      </View>

      <View style={styles.mainContent}>

        {/* ------------------- SIDEBAR ------------------- */}
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.sidebarButton}>
            <Text style={styles.sidebarText}>À propos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarButton}>
            <Text style={styles.sidebarText}>Inviter un ami</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarButton}>
            <Text style={styles.sidebarText}>Moi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sidebarButton, { marginTop: "auto", backgroundColor: "#ff4d4d" }]}>
            <Text style={styles.sidebarText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>

        {/* ------------------- CARTE ------------------- */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 3.848,
              longitude: 11.5021,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {/* Exemple de marker */}
            <Marker coordinate={{ latitude: 3.848, longitude: 11.5021 }} title="Vous êtes ici" />
          </MapView>
        </View>

      </View>

      {/* ------------------- FOOTER ------------------- */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setSelectedFooter("home")}>
          <Ionicons
            name="home"
            size={28}
            color={selectedFooter === "home" ? "#0055ff" : "#777"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedFooter("search")}>
          <Ionicons
            name="search"
            size={28}
            color={selectedFooter === "search" ? "#0055ff" : "#777"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedFooter("add")}>
          <Ionicons
            name="add-circle"
            size={32}
            color={selectedFooter === "add" ? "#0055ff" : "#777"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedFooter("notifications")}>
          <Ionicons
            name="notifications"
            size={28}
            color={selectedFooter === "notifications" ? "#0055ff" : "#777"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedFooter("profile")}>
          <Ionicons
            name="person"
            size={28}
            color={selectedFooter === "profile" ? "#0055ff" : "#777"}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* ------------------- HEADER ------------------- */
  header: {
    height: 80,
    backgroundColor: "#0055ff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  /* ------------------- MAIN CONTENT ------------------- */
  mainContent: {
    flex: 1,
    flexDirection: "row",
  },

  /* ------------------- SIDEBAR ------------------- */
  sidebar: {
    width: 120,
    backgroundColor: "#f0f0f0",
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
  },
  sidebarButton: {
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  sidebarText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },

  /* ------------------- CARTE ------------------- */
  mapContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },

  /* ------------------- FOOTER ------------------- */
  footer: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
});
