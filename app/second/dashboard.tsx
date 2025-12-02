import React, { useState } from "react";
import { StyleSheet, Text, View , Pressable} from "react-native";
import {Link} from "expo-router";
import { useRouter } from "expo-router";
import { Background } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../composant/Header";
import Footer from "../composant/Footer";
import Sidebar from "../composant/Sidebar";
import ConducteurScreen from "./conducteur";
import VehiculeScreen from "./vehicule";


let vitesse = 20;

type CardProps = {
  iconName: string;
  iconColor: string;
  title: string;
  value: number;
};


export default function Dashboard() {
  const router = useRouter();
  let vehicule = 25;
  let vehiclesActifs = 20;
  let vehiclesInactifs = 5;
  let drivers = 25;
  let driversEnService =  20;
  let driversAuRepos = 5;
  let alerts = 5;
  const [fleetData] = useState({
    
    
    
    
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* ========== GRILLE DES 3 CARTES STATISTIQUES ========== */}
      <View style={styles.statsGrid}>
            {/* CARTE 1 - VÉHICULES */}
            <View style={styles.card}>
            {/* En-tête de la carte avec icône */}
            <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                <Ionicons name="car-outline" size={24} color="#2563eb" />
                </View>
                <Text style={styles.cardLabel}>Véhicules</Text>
            </View>

            {/* Nombre principal */}
            <Text style={styles.cardNumber}>{vehicule}</Text>

            {/* Sous-titre */}
            <Text style={styles.cardSubtitle}>Total De Véhicules</Text>

            {/* Badges Actifs/Inactifs */}
            <View style={styles.badgeContainer}>
                <View style={styles.badgeGreen}>
                <Text style={styles.badgeText}>{vehiclesActifs} Actifs</Text>
                </View>
                <View style={styles.badgeGray}>
                <Text style={styles.badgeTextGray}>{vehiclesInactifs} Inactifs</Text>
                </View>
            </View>
            </View> {/* <-- Fin carte */}

            {/* CARTE 2 - CHAUFFEURS */}
            {/* Fond blanc avec bordure bleue */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="people-outline" size={24} color="#2563eb" />
                    </View>
                    <Text style={styles.cardLabel}>Chauffeurs</Text>
                </View>
                <Text style={styles.cardNumber}>{drivers}</Text>
                <Text style={styles.cardSubtitle}>Nombre De Chauffeurs</Text>
                <View style={styles.badgeContainer}>
                    <View style={styles.badgeGreen}>
                        <Text style={styles.badgeText}>
                            {driversEnService} En Service
                        </Text>
                    </View>
                    <View style={styles.badgeGray}>
                        <Text style={styles.badgeTextGray}>
                            {driversAuRepos} Au Repos
                        </Text>
                    </View>
                </View>
            </View>
            {/* CARTE 3 - ALERTES */}
                {/* Fond blanc avec bordure bleue */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                    <Ionicons name="alert-circle-outline" size={24} color="#2563eb" />
                </View>
                <Text style={styles.cardLabel}>Alertes</Text>
                </View>
                {/* Nombre en orange pour les alertes */}
                <Text style={styles.cardNumberOrange}>{alerts}</Text>
                <Text style={styles.cardSubtitle}>Alertes Non Lues</Text>
            </View>

             {/* ========== SECTION ACTIONS RAPIDES ========== */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ACTIONS RAPIDES</Text>
                
                {/* Grille de 3 boutons d'action avec fond blanc */}
                <View style={styles.actionsGrid}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="add-circle-outline" size={28} color="#2563eb" />
                        <Text style={styles.actionText}>Ajouter Un Véhicule</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="person-add-outline" size={28} color="#2563eb" />
                        <Text style={styles.actionText}>Ajouter Un Chauffeur</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                    <   Ionicons name="location-outline" size={28} color="#2563eb" />
                        <Text style={styles.actionText}>Voir Les Positions</Text>
                    </TouchableOpacity>
                </View>
            </View>      
        </View>
        {/* ========== SECTION ACTIVITÉ RÉCENTE ========== */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACTIVITÉ RÉCENTE</Text>
            
            {/* Carte d'activité avec fond blanc */}
            <View style={styles.activityCard}>
                <View style={styles.activityHeader}>
                    <Text style={styles.activityTitle}>Derniers Trajets</Text>
                </View>
                
                {/* Zone vide pour les trajets avec fond gris clair */}
                <View style={styles.activityEmpty}>
                <View style={styles.emptyIcon}>
                    <Ionicons name="car-sport-outline" size={32} color="#9ca3af" />
                </View>
                    <Text style={styles.emptyText}>
                        Les Trajets Récent S'afficheront Ici
                    </Text>
                </View>
            </View>
        </View>

      {/* Appel du Footer */}
      <Footer />
    </SafeAreaView>
  );
}


{/*const styles = StyleSheet.create({
    container1 :{
        flex :1,
    },
    container: {
    flex: 0.25,
    padding: 5,
    backgroundColor: "#f0f2f5",
    flexDirection: "row",       // Aligne les cartes horizontalement
    justifyContent: "space-between", 
    },
    card: {
    flex: 1,                    // Chaque carte prend une part égale
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 25,        // petit espace entre les cartes
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  title: {

    fontSize: 14,
    color: "#6b7280",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  percentage: {
    fontSize: 14,
    fontWeight: "bold",
  },
    


});*/}

const styles = StyleSheet.create({
  // CONTENEUR PRINCIPAL avec fond gris clair
  container: {
    flex: 1,
    backgroundColor: '#e5e7eb', // 👈 FOND GRIS CLAIR DE L'APP
  },
  
  /* ========== BARRE SUPÉRIEURE ========== */
  topBar: {
    backgroundColor: '#1e3a8a', // 👈 FOND BLEU FONCÉ
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  appTitleRed: {
    color: '#ef4444',
  },
  adminButton: {
    backgroundColor: '#f97316', // 👈 FOND ORANGE DU BOUTON
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  
  /* ========== CONTENU DU DASHBOARD ========== */
  dashboardContent: {
    flex: 1,
    padding: 20, // 👈 PADDING GÉNÉRAL DU CONTENU
  },
  
  // EN-TÊTE
  headerSection: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  
  /* ========== GRILLE DES CARTES STATISTIQUES ========== */
  // FlexDirection row + flexWrap pour avoir plusieurs cartes sur la même ligne
  statsGrid: {
    flexDirection: 'row', // 👈 DISPOSITION HORIZONTALE
    flexWrap: 'wrap',     // 👈 PERMET LE RETOUR À LA LIGNE
    justifyContent: 'space-between', // 👈 ESPACE ENTRE LES CARTES
    marginBottom: 24,
  },
  
  /* ========== STYLE DE CHAQUE CARTE ========== */
  // Chaque carte prend environ 31% de la largeur (pour avoir 3 cartes)
  card: {
    width: '31%',         // 👈 LARGEUR DE CHAQUE CARTE (3 cartes = 31% chacune)
    backgroundColor: '#ffffff', // 👈 FOND BLANC DE LA CARTE
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 12,
    padding: 20,          // 👈 PADDING INTERNE DE LA CARTE
    marginBottom: 16,
    shadowColor: '#000',  // 👈 OMBRE POUR EFFET DE PROFONDEUR
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#dbeafe', // 👈 FOND BLEU CLAIR DE L'ICÔNE
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardLabel: {
    fontWeight: '600',
    color: '#374151',
    fontSize: 16,
  },
  cardNumber: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
  },
  cardNumberOrange: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 12,
  },
  
  // BADGES (Actifs/Inactifs) avec fonds colorés
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badgeGreen: {
    backgroundColor: '#4ade80', // 👈 FOND VERT DU BADGE
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  badgeGray: {
    backgroundColor: '#d1d5db', // 👈 FOND GRIS DU BADGE
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  badgeTextGray: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
  },
  
  /* ========== SECTIONS ========== */
  section: {
    
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  
  /* ========== GRILLE DES ACTIONS RAPIDES ========== */
  actionsGrid: {
    flexDirection: 'row',   // 👈 DISPOSITION HORIZONTALE
    flexWrap: 'wrap',       // 👈 RETOUR À LA LIGNE SI NÉCESSAIRE
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '31%',           // 👈 LARGEUR DE CHAQUE BOUTON (3 boutons)
    backgroundColor: '#ffffff', // 👈 FOND BLANC DU BOUTON
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    minHeight: 100,
    shadowColor: '#000',  // 👈 OMBRE
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    color: '#2563eb',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 13,
  },
  
  /* ========== CARTE ACTIVITÉ RÉCENTE ========== */
  activityCard: {
    backgroundColor: '#ffffff', // 👈 FOND BLANC DE LA CARTE
    borderWidth: 2,
    borderColor: '#93c5fd',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',  // 👈 OMBRE
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 12,
    marginBottom: 16,
  },
  activityTitle: {
    fontWeight: '600',
    color: '#374151',
    fontSize: 16,
  },
  activityEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#f9fafb', // 👈 FOND GRIS TRÈS CLAIR DE LA ZONE VIDE
    borderRadius: 8,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#e5e7eb', // 👈 FOND GRIS DE L'ICÔNE
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 14,
  },
});


