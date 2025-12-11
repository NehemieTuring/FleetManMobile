import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function connexion() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.frame}>
          <View style={styles.logoBox}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoIcon}>🚗</Text>
            </View>
            <Text style={styles.title}>FleetMAN</Text>
            <Text style={styles.subtitle}>Système de gestion de flotte automobile</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.h1}>Bienvenue !</Text>
            <Text style={styles.h2}>Connectez-vous pour accéder à votre tableau de bord</Text>

            <Text style={styles.label}>Adresse email</Text>
            <View style={styles.inputWrap}>
              <TextInput
                placeholder="exemple@email.com"
                placeholderTextColor="#9AA6C0"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Mot de passe</Text>
            <View style={styles.inputWrap}>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#9AA6C0"
                style={styles.input}
                secureTextEntry
              />
            </View>

            <View style={styles.rowBetween}>
              <Pressable onPress={() => { /* toggle remember - kept simple */ }} style={styles.checkboxWrap}>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxLabel}>Se souvenir de moi</Text>
              </Pressable>

              <TouchableOpacity onPress={() => router.push('/forgot') }>
                <Text style={styles.forgot}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('./dashboard')}>
              <Text style={styles.primaryBtnText}>Se connecter →</Text>
            </TouchableOpacity>

            <View style={styles.orRow}>
              <View style={styles.hr} />
              <Text style={styles.orText}>Ou continuer avec</Text>
              <View style={styles.hr} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} onPress={() => router.push('/auth/google')}>
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialBtn} onPress={() => router.push('/auth/facebook')}>
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomRow}>
              <Text style={styles.noAccount}>Pas encore de compte ?</Text>
              <TouchableOpacity onPress={() => router.push('./choix')}>
                <Text style={styles.create}> Créer un compte</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const PADDING = SCREEN_WIDTH > 900 ? 48 : SCREEN_WIDTH > 600 ? 32 : 20;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f7f9ff',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  frame: {
    width: '100%',
    maxWidth: 680,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: PADDING,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  logoBox: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logoCircle: {
    backgroundColor: '#eaf0ff',
    width: 72,
    height: 72,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoIcon: {
    fontSize: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#002244',
  },
  subtitle: {
    color: '#7b8aa3',
    marginTop: 4,
    fontSize: 13,
  },

  card: {
    width: '100%',
    marginTop: 18,
  },
  h1: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    color: '#12263b',
  },
  h2: {
    color: '#6f7a90',
    marginBottom: 18,
    fontSize: 14,
  },
  label: {
    color: '#475569',
    marginBottom: 8,
    fontSize: 13,
  },
  inputWrap: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'web' ? 10 : 8,
  },
  input: {
    fontSize: 15,
    padding: 0,
    margin: 0,
    color: '#12263b',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  checkboxWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#475569',
  },
  forgot: {
    color: '#0055ff',
    fontSize: 13,
  },

  primaryBtn: {
    backgroundColor: '#0055ff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e6eefc',
  },
  orText: {
    paddingHorizontal: 12,
    color: '#70809f',
    fontSize: 13,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 22,
  },
  socialBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e6eefc',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    fontSize: 15,
    color: '#12263b',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccount: {
    color: '#667788',
    fontSize: 13,
  },
  create: {
    color: '#0055ff',
    fontSize: 13,
    fontWeight: '600',
  },
});
