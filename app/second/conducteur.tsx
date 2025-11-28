import { StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";
import { Background } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";


export default function connexion(){
    return(
        <Text>
            Page des conducteurs{'\n'}
            <Link href="/second/vehicule">{"\n"}vehicule</Link>
            <Link href="/second/carte">{"\n"}carte</Link>
            <Link href="/second/alerte">{"\n"}alerte</Link>
            <Link href="/second/dashboard">{"\n"}dashboard</Link>

        </Text>

    )
}