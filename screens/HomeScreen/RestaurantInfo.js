import React, { useState } from "react";
import { firebase } from "../../firebase/config";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

function Menu(props) {
  console.log('TEST' + props)
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.restaurantText}>Menu start</Text>
      
      {props.forEach((dish) => {
        <Text style={styles.restaurantText}>Dish Name: {dish.dishName}</Text>,
        <Text style={styles.restaurantText}>Dish Price: {dish.price}</Text>
      })}
      <Text style={styles.restaurantText}>Menu end</Text>
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
  const [dishes, setDishes] = useState([]);
  
  const dishList = [];

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
          dishList = doc.get().collection('Dishes').get().then((dishSnapshot) => {
            dishSnapshot.forEach((dish) => {
              dish.data().name;
            });
          })
          setDishes(dishList)
      }});
    });
    console.log("dishName2"+ dishList.length)
    const restaurantData = {restaurantName, restaurantAddress, restaurantDescription, restaurantEmail, restaurantPhone};
    console.log('amount of dishes2: ' + dishes.length)
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Menu" component={() => Menu(dishes)} /> 
        <Tab.Screen name="Info" component={() => Info(restaurantData)} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}
