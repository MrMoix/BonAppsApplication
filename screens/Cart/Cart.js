import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Cart({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
    </View>
  );
}
