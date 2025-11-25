import { StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";
import { Background } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";


export default function connexion(){
    return(
        <Text>
            Page des alerte{'\n'}
            <Link href="/second/vehicule">{"\n"}vehicule{"\n"}</Link>
            <Link href="/second/conducteur">conducteur{"\n"}</Link>
            <Link href="/second/carte">carte{"\n"}</Link>
            <Link href="/second/dashboard">dashboard</Link>

        </Text>

    )
}