// Sidebar.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";



export default function Sidebar() {
    const router = useRouter();
    return (
    <DrawerContentScrollView style={styles.drawer}>
        {/* Profil icon */}
        <TouchableOpacity style={styles.rightIcon}>
            <Ionicons name="person-circle" size={120} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => router.push("/")}>
            <Ionicons name="home" size={30} color="white" />
            <Text style={styles.itemText}>Acceuil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push("AjouterAmi")}>
            <Ionicons name="person-add" size={30} color="white" />
            <Text style={styles.itemText}>Inviter un ami</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push("changerpasse")}>
            <Ionicons name="lock-closed" size={30} color="white" />
            <Text style={styles.itemText}>Changer mot de passe</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push("Apropos")}>
            <Ionicons name="information-circle" size={30} color="white" />
            <Text style={styles.itemText}>À propos</Text>
        </TouchableOpacity>

    </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
  drawer: { flex: 1, 
    paddingTop: 20, 
    backgroundColor:  "#0055ff", 
},
  item: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: "#ccc" 
},
  itemText: { 
    marginLeft: 15, 
    fontSize: 18,
    color:"#ffff" 
},
  rightIcon: {
    flex: 1,
    width: 120,
    alignItems: "flex-end",
    marginBottom: 80,
   
  },
});
