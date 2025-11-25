import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function connexion(){
   return(
    <text>
        page où on va faire le choix{"\n"}
        <Link href="/second/inscriptionP">{"\n"}Particulier{"\n"}</Link>
        <Link href="/second/inscriptionE">Entreprise</Link>
    </text>
   )
     
   
}