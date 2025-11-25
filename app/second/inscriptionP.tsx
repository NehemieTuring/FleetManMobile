import { StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";
import { Background } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";


export default function connexion(){
    return(
        <Text>
            Page d'inscription pour les Particulier

            <Link href="/second/inscription">{"\n"}Suivant</Link>
            
        </Text>

    )
}