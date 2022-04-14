import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Cart({ route, navigation }) {
  // move to cart order process
  const confirmOrder = () => {
    const dishList = [{ name: "fried chicken", price: 10.99 }, { name: "fried chicken burger", price: 12.99 }];
    navigation.navigate("TableTimeReservation", {
      dishList: dishList,
      uid: "2sH1gPONg3MvwYMDn4LU3aGRZAN2",
      restaurantid: "L81dYiej2fgz6UQFAMV6",
    });
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <TouchableOpacity style={styles.button} onPress={() => confirmOrder()}>
        <Text style={styles.buttonTitle}> Confirm Order </Text>
      </TouchableOpacity>
    </View>
  );
}
