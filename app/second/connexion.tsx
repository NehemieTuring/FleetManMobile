import { StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";
import { Background } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";


export default function connexion(){
    return(
        <Text>
            Page de connexion{'\n'}
            <Link href="/second/dashboard">{"\n"}Se connecter</Link>
            <Link href="/second/choix">{"\n"}S'inscrire</Link>

        </Text>

    )
}