import React, { useState } from "react";
import { firebase } from "../../firebase/config";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function RestaurantInfo({ route, navigation }) {
  const { restaurantTitle } = route.params;

  const [restaurantDescription, setRestaurantDescription] = useState("");

  const restaurantData = firebase
    .firestore()
    .collection("Restaurant")
    .where("name", "=", restaurantTitle)
    .get()
    .data()
    .then(setRestaurantDescription(restaurantData.description));
  return (
    <Text
      style={{
        marginTop: 100,
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 50,
      }}
    >
      {restaurantDescription}
    </Text>
  );
}
