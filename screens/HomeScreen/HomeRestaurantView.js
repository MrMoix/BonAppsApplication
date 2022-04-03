import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import icons from "../../constants/icons";

function MyAccount(props) {
  const onLogOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => props.navigate("Login"));
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>My account!</Text>
      <View style={{ marginTop: 100, marginLeft: 50 }}>
        {/* <Text style={styles.title}>Home Screen</Text> */}
        <TouchableOpacity style={styles.button} onPress={() => onLogOutPress()}>
          <Text style={styles.buttonTitle}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Dishes(props) {
  return (
    <View style={{ flex: 1 }}>
      {props.dishes.map((dish) => (
        <View style={styles.dishBox}>
          <Text style={styles.restaurantText}>Dish Name: {dish.name}</Text>
          <Text style={styles.restaurantText}>Dish Price: {dish.price}</Text>
          <Image style={styles.logoPicture} source={icons.burger} />
          <View
            style={{
              flex: 1,
              //marginLeft: 15,
              flexDirection: "row",
              //marginTop: 20,
            }}
          >
            <Image style={styles.dsihBoxIcons} source={icons.setting} />
            <Image style={styles.dsihBoxIcons} source={icons.delete_icon} />
          </View>
        </View>
      ))}
      <View
        style={{
          marginBottom: 15,
          marginTop: 10,
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={props.navigation.navigate("AddDish")}>
          <Text style={{ color: "#ff6c44", fontSize: 20, fontWeight: "bold" }}>
            ADD
          </Text>
          <Image style={styles.icons} source={icons.plus} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function HomeRestaurantView({ navigation }) {
  const restaurantTitle = "kfc";

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
          tabBarLabelStyle: { fontSize: 20 },
          //tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: "#4BBE77" },
        }}
        //style={styles.top}
      >
        <Tab.Screen name="My Account" component={() => MyAccount(navigation)} />
        <Tab.Screen name="Dishes">
          {() => <Dishes dishes={dishes} navigation={navigation}></Dishes>}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
