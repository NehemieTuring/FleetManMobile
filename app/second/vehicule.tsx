import { StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";
import { Background } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";


export default function connexion(){
    return(
        <Text>
            Page des vehicules
            <Link href="/second/conducteur">{"\n"}conducteur</Link>
            <Link href="/second/carte">{"\n"}carte</Link>
            <Link href="/second/alerte">{"\n"}alerte</Link>
            <Link href="/second/dashboard">{"\n"}dashboard</Link>

        </Text>

    )
}