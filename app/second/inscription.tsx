import { StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";
import { Background } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";


export default function connexion(){
    return(
        <Text>
            deuxième Page d'inscription

            <Link href="/second/inscription1">{"\n"}Suivant</Link>
            
        </Text>

    )
}