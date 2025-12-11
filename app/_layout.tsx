import React from "react";
import { Drawer } from "expo-router/drawer";
import Sidebar from "./composant/Sidebar";




export default function RootLayout() {
  return (
    
    <Drawer
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "blue",
        headerTitle : "FleetMan",
        headerStyle: { backgroundColor: "#0055ff" },
        headerTintColor: "white",
        headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen name="Dashboard" options={{ title: "Dashboard" }} />
      <Drawer.Screen name="Vehicule" options={{ title: "Véhicule" }} />
      <Drawer.Screen name="index" options={{ title: "Accueil", headerShown: false }} />
      <Drawer.Screen name="Conducteur" options={{ title: "Conducteur" }} />
      <Drawer.Screen name="Carte" options={{ title: "Carte" }} />
      <Drawer.Screen name="Alerte" options={{ title: "Alerte" }} />
      <Drawer.Screen name="second/choix" options={{ title: "choix", headerShown: false }} />
      <Drawer.Screen name="second/inscription" options={{ title: "inscription", headerShown: false }} />
      <Drawer.Screen name="second/inscriptionP" options={{ title: "inscriptionP", headerShown: false }} />
      <Drawer.Screen name="second/inscriptionE" options={{ title: "inscriptionE", headerShown: false }} />
      <Drawer.Screen name="second/connexion" options={{ title: "connexion", headerShown: false }} />
      <Drawer.Screen name="second/inscription1" options={{ title: "inscription", headerShown: false }} />

      {/*<Drawer.Screen name="ChangePassword" options={{ title: "Changer le mot de passe" }} />
        <Drawer.Screen name="Invite" options={{ title: "Inviter un ami" }} />
        <Drawer.Screen name="Apropos" options={{ title: "À propos" }} />
        */}


      {/* Ajoute d’autres écrans ici si nécessaire */}
    </Drawer>
  );
}
