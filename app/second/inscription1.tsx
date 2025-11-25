import { StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";
import { Background } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";


export default function connexion(){
    return(
        <Text>
            troixième page d'inscription

            <Link href="/second/inscription2">{"\n"}Suivant</Link>
            
        </Text>

    )
}