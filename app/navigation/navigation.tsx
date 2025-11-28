import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


import InscriptionE from '../second/inscriptionE';
import Inscription from '../second/inscription';
import Choix from '../second/choix';
// On importe les pages que l'on veut inclure dans la navigation

// On définit les types TypeScript pour notre navigation
// Chaque écran peut avoir des paramètres (ici, aucun paramètre, donc "undefined")
export type RootStackParamList = {
  InscriptionE: undefined;
  Inscription: undefined;
  Choix: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
// On crée le "Stack Navigator" avec les types définis pour TypeScript
// Stack servira à déclarer les écrans et gérer la navigation entre eux

export default function Navigation() {
  // On crée le composant Navigation qui sera le point central de la navigation
  return (
    <NavigationContainer>
      {/* NavigationContainer enveloppe tous les écrans et gère l'état de navigation */}
      <Stack.Navigator initialRouteName="InscriptionE">
        {/* Stack.Navigator définit la pile d'écrans
            initialRouteName indique la première page affichée */}
        <Stack.Screen 
          name="InscriptionE" 
          component={InscriptionE} 
          options={{ headerShown: false }} 
          // On désactive le header par défaut pour pouvoir créer un header personnalisé
        />
        <Stack.Screen 
          name="Inscription" 
          component={Inscription} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Choix" 
          component={Choix} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
