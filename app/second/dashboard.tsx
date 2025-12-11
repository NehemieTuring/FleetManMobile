import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../composant/Footer";


let vitesse = 20;

type CardProps = {
  iconName: string;
  iconColor: string;
  title: string;
  value: number;
};

import { Dimensions } from 'react-native';
const { width } = Dimensions.get("window");

const buttonWidth = width * 0.5;
const fontSize = buttonWidth * 0.2;

export default function Dashboard() {
  const router = useRouter();
  let vehicule = 25;
  let vehiclesActifs = 20;
  let vehiclesInactifs = 5;
  let drivers = 25;
  let driversEnService = 20;
  let driversAuRepos = 5;
  let alerts = 5;
  const [fleetData] = useState({});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ========== GRILLE DES 3 CARTES STATISTIQUES ========== */}
        <View style={styles.statsGrid}>
          {/* CARTE 1 - VÉHICULES */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="car-outline" size={24} color="#2563eb" />
              </View>
              <Text style={styles.cardLabel} numberOfLines={1} adjustsFontSizeToFit>
                Véhicules
              </Text>
            </View>
            <Text style={styles.cardNumber} numberOfLines={1} adjustsFontSizeToFit>
              {vehicule}
            </Text>
            <Text style={styles.cardSubtitle} numberOfLines={2} adjustsFontSizeToFit>
              Total De Véhicules
            </Text>
            <View style={styles.badgeContainer}>
              <View style={styles.badgeGreen}>
                <Text style={styles.badgeText} numberOfLines={1} adjustsFontSizeToFit>
                  {vehiclesActifs} Actifs
                </Text>
              </View>
              <View style={styles.badgeGray}>
                <Text style={styles.badgeTextGray} numberOfLines={1} adjustsFontSizeToFit>
                  {vehiclesInactifs} Inactifs
                </Text>
              </View>
            </View>
          </View>

          {/* CARTE 2 - CHAUFFEURS */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="people-outline" size={24} color="#2563eb" />
              </View>
              <Text style={styles.cardLabel} numberOfLines={1} adjustsFontSizeToFit>
                Chauffeurs
              </Text>
            </View>
            <Text style={styles.cardNumber} numberOfLines={1} adjustsFontSizeToFit>
              {drivers}
            </Text>
            <Text style={styles.cardSubtitle} numberOfLines={2} adjustsFontSizeToFit>
              Nombre De Chauffeurs
            </Text>
            <View style={styles.badgeContainer}>
              <View style={styles.badgeGreen}>
                <Text style={styles.badgeText} numberOfLines={1} adjustsFontSizeToFit>
                  {driversEnService} En Service
                </Text>
              </View>
              <View style={styles.badgeGray}>
                <Text style={styles.badgeTextGray} numberOfLines={1} adjustsFontSizeToFit>
                  {driversAuRepos} Au Repos
                </Text>
              </View>
            </View>
          </View>

          {/* CARTE 3 - ALERTES */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="alert-circle-outline" size={24} color="#2563eb" />
              </View>
              <Text style={styles.cardLabel} numberOfLines={1} adjustsFontSizeToFit>
                Alertes
              </Text>
            </View>
            <Text style={styles.cardNumberOrange} numberOfLines={1} adjustsFontSizeToFit>
              {alerts}
            </Text>
            <Text style={styles.cardSubtitle} numberOfLines={2} adjustsFontSizeToFit>
              Alertes Non Lues
            </Text>
          </View>
        </View>

        {/* ========== SECTION ACTIONS RAPIDES ========== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} numberOfLines={1} adjustsFontSizeToFit>
            ACTIONS RAPIDES
          </Text>

          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <Ionicons name="add-circle-outline" size={28} color="#2563eb" />
              </View>
              <Text style={styles.actionText} numberOfLines={2} adjustsFontSizeToFit>
                Ajouter Un Véhicule
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <Ionicons name="person-add-outline" size={28} color="#2563eb" />
              </View>
              <Text style={styles.actionText} numberOfLines={2} adjustsFontSizeToFit>
                Ajouter Un Chauffeur
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <Ionicons name="location-outline" size={28} color="#2563eb" />
              </View>
              <Text style={styles.actionText} numberOfLines={2} adjustsFontSizeToFit>
                Voir Les Positions
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ========== SECTION ACTIVITÉ RÉCENTE ========== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} numberOfLines={1} adjustsFontSizeToFit>
            ACTIVITÉ RÉCENTE
          </Text>

          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityTitle} numberOfLines={1} adjustsFontSizeToFit>
                Derniers Trajets
              </Text>
            </View>

            <View style={styles.activityEmpty}>
              <View style={styles.emptyIcon}>
                <Ionicons name="car-sport-outline" size={32} color="#9ca3af" />
              </View>
              <Text style={styles.emptyText} numberOfLines={2} adjustsFontSizeToFit>
                Les Trajets Récent S'afficheront Ici
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Appel du Footer */}
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // CONTENEUR PRINCIPAL
  container: {
    flex: 1,
    backgroundColor: '#e5e7eb',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: '2%',
    paddingVertical: 10,
  },

  /* ========== GRILLE DES CARTES STATISTIQUES ========== */
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },

  /* ========== STYLE DE CHAQUE CARTE ========== */
  card: {
    width: '31.5%',
    minWidth: 120,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 12,
    padding: '3%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    flexShrink: 0,
  },
  cardLabel: {
    fontWeight: '600',
    color: '#374151',
    fontSize: 14,
    flex: 1,
  },
  cardNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 6,
  },
  cardNumberOrange: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 10,
  },

  // BADGES
  badgeContainer: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  badgeGreen: {
    backgroundColor: '#4ade80',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    flexShrink: 1,
    minWidth: 0,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  badgeGray: {
    backgroundColor: '#d1d5db',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    flexShrink: 1,
    minWidth: 0,
  },
  badgeTextGray: {
    color: '#374151',
    fontSize: 10,
    fontWeight: '600',
  },

  /* ========== SECTIONS ========== */
  section: {
    marginBottom: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },

  /* ========== GRILLE DES ACTIONS RAPIDES ========== */
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIconContainer: {
    marginBottom: 8,
  },
  actionText: {
    color: '#2563eb',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
    width: '100%',
  },

  /* ========== CARTE ACTIVITÉ RÉCENTE ========== */
  activityCard: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#93c5fd',
    borderRadius: 12,
    padding: '3%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  activityHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 10,
    marginBottom: 12,
  },
  activityTitle: {
    fontWeight: '600',
    color: '#374151',
    fontSize: 14,
  },
  activityEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#e5e7eb',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});