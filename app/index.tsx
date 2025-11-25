import { StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";
import { Background } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style = {styles.container}>
      <Text>PAGE DE TOUT DEBUT</Text>
      <Link href = "/second/choix" >COMMENCER</Link>
      <Link href = "/second/connexion" >connecter vous ici!</Link>
      
    </SafeAreaView> 
  );
}
const styles = StyleSheet.create({
  container:{backgroundColor:"#FF0000",padding:24}
})