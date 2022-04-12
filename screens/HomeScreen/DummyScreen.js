import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "../OrderPlacing/styles";

export default function Cart({ route, navigation }) {
  const { dishName } = route.params;
  console.log("dish ", dishName, " price ");
  return (
    <View style={styles.container}>
      {/* <Image style={styles.logo} source={require("../../assets/logo.png")} /> */}

      <Text>Dish name: {dishName}</Text>
    </View>
  );
}
