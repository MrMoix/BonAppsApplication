import React, { useState } from "react";
import { firebase } from "../../firebase/config";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function RestaurantInfo({ route, navigation }) {
  const { restaurantTitle } = route.params;

  const [restaurantDescription, setRestaurantDescription] = useState("");

  const restaurantDataSnapshot = firebase
    .firestore()
    .collection("Restaurant")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if(doc.data().name == restaurantTitle){
          setRestaurantDescription(doc.data().description)
        }
      });
    })
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
