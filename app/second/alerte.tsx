import React from "react";
import { StyleSheet, Text, View } from "react-native";
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




export default function alerte(){
    const router = useRouter();
    return(
        <SafeAreaView style = {styles.container}>
            <View style ={styles.container2}>
                <Text>Alerte</Text>
            </View>

            {/* Appel du Footer */}
            <Footer />

        </SafeAreaView>     
    )
}

const styles = StyleSheet.create({
    container :{
        flex :1,
    },
    container2:{
        flex:1,
    },

});
