import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import icons from "../../constants/icons";

function Menu(props) {
  console.log("TEST" + props);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {props.dishes.map((dish) => (
        <View style={styles.dishBox}>
          <Text style={styles.restaurantText}>Dish Name: {dish.name}</Text>
          <Text style={styles.restaurantText}>Dish Price: {dish.price}</Text>
          <Image style={styles.logoPicture} source={icons.burger} />
        </View>
      ))}
    </View>
  );
}

function Info(props) {
  return (
    <View style={{ marginTop: 120 }}>
      <Image
        style={styles.logoPicture}
        source={require("../../assets/images/great_food.png")}
      />
      <Text style={styles.title}>{props.restaurantData.name}</Text>
      <Text style={styles.restaurantText}>
        About: {props.restaurantData.description}
      </Text>
      <Text style={styles.restaurantText}>
        Address: {props.restaurantData.address}
      </Text>
      <Text style={styles.restaurantText}>
        Email: {props.restaurantData.email}
      </Text>
      <Text style={styles.restaurantText}>
        Phone number: {props.restaurantData.phoneNumber}
      </Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function RestaurantInfo({ route, navigation }) {
  const { restaurantTitle } = route.params;

  const [restaurantData, setRestaurantData] = useState({});
  const [dishes, setDishes] = useState([]);

  const dishList = [];

  useEffect(() => {
    async function fetchMenu() {
      // route param uid instead of name
      const snapshot = await firebase
        .firestore()
        .collection("Restaurant")
        .where("name", "==", restaurantTitle)
        .get();

      console.log("docs", snapshot.docs);

      const uid = snapshot.docs[0].id;
      console.log("restaurant uid", uid);

      //

      const restaurantRef = firebase
        .firestore()
        .collection("Restaurant")
        .doc(uid);
      const restaurantDoc = await restaurantRef.get();
      setRestaurantData(restaurantDoc.data());

      const restaurantDishes = await restaurantRef.collection("Dishes").get();

      let dishList = [];

      restaurantDishes.forEach(async (dish) => {
        dishList.push(dish.data());
      });

      console.log("restaurant dishes", dishList);

      setDishes(dishList);
    }

    fetchMenu();
    // console.log("dishName2 "+ dishList.length)
    // const restaurantData = {restaurantName, restaurantAddress, restaurantDescription, restaurantEmail, restaurantPhone};
    // console.log('amount of dishes2: ' + dishes.length)
  }, [restaurantTitle]);

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Menu">
          {() => <Menu dishes={dishes}></Menu>}
        </Tab.Screen>
        <Tab.Screen name="Info">
          {() => <Info restaurantData={restaurantData}></Info>}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
