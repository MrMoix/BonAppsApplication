import React, { useState } from "react";
import { firebase } from "../../firebase/config";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

function Menu(props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* {props.forEach((dish) => {
        <Text style={styles.restaurantText}>Dish Name: s{dish.name}</Text>,
        <Text style={styles.restaurantText}>Dish Price: {dish.price}</Text>
      })} */}
      <Text style={styles.restaurantText}>Menu!</Text>
    </View>
  );
}


function Info(props){
  return (
    <View style={{ marginTop: 120 }}>
      <Image
        style={styles.logoPicture}
        source={require("../../assets/images/great_food.png")}
      />
      <Text style={styles.title}>{props.restaurantName}</Text>
      <Text style={styles.restaurantText}>About: {props.restaurantDescription}</Text>
      <Text style={styles.restaurantText}>Address: {props.restaurantAddress}</Text>
      <Text style={styles.restaurantText}>Email: {props.restaurantEmail}</Text>
      <Text style={styles.restaurantText}>Phone number: {props.restaurantPhone}</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function RestaurantInfo({ route, navigation }) {
  const { restaurantTitle } = route.params;

  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [restaurantPhone, setRestaurantPhone] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [dishes, setDishes] = useState({});
  
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
          //setDishes(doc.data().Dishes)
        }
      });
    });
    const restaurantData = {restaurantName, restaurantAddress, restaurantDescription, restaurantEmail, restaurantPhone};

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Menu" component={() => Menu(dishes)} /> 
        <Tab.Screen name="Info" component={() => Info(restaurantData)} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}
