import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import DashboardScreen from "./second/dashboard";
import AcceuilScreen from "./index";
import ConducteurScreen from "./second/conducteur";
import CarteScreen from "./second/carte";
import AlerteScreen from "./second/alerte";
import VehiculeScreen from "./second/vehicule";
import Header from "./composant/Header";
import Sidebar from "./composant/Sidebar";
import ChoixScreen from "./second/choix";



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
      <Drawer.Screen name="second/choix" options={{ title: "Choix", headerShown: false }} />

      {/*<Drawer.Screen name="ChangePassword" options={{ title: "Changer le mot de passe" }} />
        <Drawer.Screen name="Invite" options={{ title: "Inviter un ami" }} />
        <Drawer.Screen name="Apropos" options={{ title: "À propos" }} />
        */}


      {/* Ajoute d’autres écrans ici si nécessaire */}
    </Drawer>
  );
}
