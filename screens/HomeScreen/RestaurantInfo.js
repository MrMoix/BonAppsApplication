import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import icons from "../../constants/icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function Menu(props) {
  console.log("TEST" + props);
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        {props.dishes.map((dish) => (
          <View style={styles.dishBox}>
            <Text style={styles.restaurantText}>Dish Name: {dish.name}</Text>
            <Text style={styles.restaurantText}>Dish Price: {dish.price}</Text>
            <Image style={styles.logoPicture} source={icons.burger} />
          </View>
        ))}
      </KeyboardAwareScrollView>
    </View>
  );
}

function Info(props) {
  return (
    <View style={styles.container}>
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
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 20, color: "white" },
          //tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: "#4BBE77" },
        }}
      >
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
