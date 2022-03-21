import React, { useState } from "react";
import { firebase } from "../../firebase/config";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function RestaurantInfo({ route, navigation }) {
  const { restaurantTitle, logo } = route.params;

  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [restaurantPhone, setRestaurantPhone] = useState("");
  const [restaurantLogo, setRestaurantLogo] = useState("");

  const restaurantDataSnapshot = firebase
    .firestore()
    .collection("Restaurant")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().name == restaurantTitle) {
          setRestaurantDescription(doc.data().description);
          setRestaurantAddress(doc.data().address);
          setRestaurantEmail(doc.data().email);
          setRestaurantPhone(doc.data().phoneNumber);
          setRestaurantLogo("require(" + logo + ")");
          console.log(restaurantLogo);
        }
      });
    });
  return (
    <View style={{ marginTop: 120 }}>
      <Image style={styles.icons} source={restaurantLogo} />
      <Text style={styles.title}>{restaurantTitle}</Text>
      <Text style={styles.restaurantText}>About: {restaurantDescription}</Text>
      <Text style={styles.restaurantText}>Address: {restaurantAddress}</Text>
      <Text style={styles.restaurantText}>Email: {restaurantEmail}</Text>
      <Text style={styles.restaurantText}>Phone number: {restaurantPhone}</Text>
    </View>
  );
}
