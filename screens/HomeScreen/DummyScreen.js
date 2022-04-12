import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Cart({ route, navigation }) {
  const { dishName, dishPrice } = route.params;
  console.log("dish ", dishName, " price ");
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />

      <Text style={styles.NormalText}>Dish name: {dishName}</Text>
      <Text style={styles.NormalText}>Dish price: {dishPrice}</Text>
    </View>
  );
}
