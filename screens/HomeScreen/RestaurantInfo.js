import React, { useState } from "react";
import { firebase } from "../../firebase/config";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

function Menu() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Menu!</Text>
    </View>
  );
}
const [restaurantDescription, setRestaurantDescription] = useState("");
const [restaurantAddress, setRestaurantAddress] = useState("");
const [restaurantEmail, setRestaurantEmail] = useState("");
const [restaurantPhone, setRestaurantPhone] = useState("");
const [restaurantName, setRestaurantName] = useState("");

function Info() {
  return (
    <View style={{ marginTop: 120 }}>
      <Image
        style={styles.logoPicture}
        source={require("../../assets/images/great_food.png")}
      />
      <Text style={styles.title}>{restaurantName}</Text>
      <Text style={styles.restaurantText}>About: {restaurantDescription}</Text>
      <Text style={styles.restaurantText}>Address: {restaurantAddress}</Text>
      <Text style={styles.restaurantText}>Email: {restaurantEmail}</Text>
      <Text style={styles.restaurantText}>Phone number: {restaurantPhone}</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function RestaurantInfo({ route, navigation }) {
  const { restaurantTitle } = route.params;

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
          setRestaurantName(restaurantTitle);
        }
      });
    });

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Menu" component={Menu} />
        <Tab.Screen name="Info" component={Info} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// export default function RestaurantInfo({ route, navigation }) {
//   const { restaurantTitle } = route.params;

//   const [restaurantDescription, setRestaurantDescription] = useState("");
//   const [restaurantAddress, setRestaurantAddress] = useState("");
//   const [restaurantEmail, setRestaurantEmail] = useState("");
//   const [restaurantPhone, setRestaurantPhone] = useState("");

//   const restaurantDataSnapshot = firebase
//     .firestore()
//     .collection("Restaurant")
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         if (doc.data().name == restaurantTitle) {
//           setRestaurantDescription(doc.data().description);
//           setRestaurantAddress(doc.data().address);
//           setRestaurantEmail(doc.data().email);
//           setRestaurantPhone(doc.data().phoneNumber);
//           console.log(restaurantLogo);
//         }
//       });
//     });
//   return (
//     <View style={{ marginTop: 120 }}>
//       <Image
//         style={styles.logoPicture}
//         source={require("../../assets/images/great_food.png")}
//       />
//       <Text style={styles.title}>{restaurantTitle}</Text>
//       <Text style={styles.restaurantText}>About: {restaurantDescription}</Text>
//       <Text style={styles.restaurantText}>Address: {restaurantAddress}</Text>
//       <Text style={styles.restaurantText}>Email: {restaurantEmail}</Text>
//       <Text style={styles.restaurantText}>Phone number: {restaurantPhone}</Text>
//     </View>
//   );
// }
