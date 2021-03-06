import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";
import { collection, doc, setDoc, arrayUnion } from "firebase/firestore";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import icons from "../../constants/icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { setStatusBarBackgroundColor } from "expo-status-bar";

function Menu(props) {
  const addToOrder = (dish) => {
    const currentUid = firebase.auth().currentUser.uid;

    const currentUserCart = firebase
      .firestore()
      .collection("Clients")
      .doc(currentUid);

    currentUserCart.update({
      currentCartItem: firebase.firestore.FieldValue.arrayUnion(dish),
    });

    alert("Item added to cart !");
  };
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View
      style={{
        flex: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4BBE77",
      }}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%", borderRadius: 5 }}
        keyboardShouldPersistTaps="always"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {props.dishes.map((dish) => (
          <View style={styles.dishBox}>
            <Image style={styles.logoPicture} source={icons.burger} />
            <Text style={styles.restaurantText}> Dish Name : {dish.name}</Text>
            <Text style={styles.restaurantText}>
              {" "}
              Dish Price : {dish.price}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={() => addToOrder(dish)}>
                <Image style={styles.dishBoxIcons} source={icons.plus} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </KeyboardAwareScrollView>
    </View>
  );
}

function Info(props) {
  return (
    <View
      style={{
        flex: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4BBE77",
      }}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%", borderRadius: 5 }}
        keyboardShouldPersistTaps="always"
      >
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
      </KeyboardAwareScrollView>
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
      //const user = firebase.auth().currentUser;
      // route param uid instead of name

      const snapshot = await firebase
        .firestore()
        .collection("Restaurant")
        .where("name", "==", restaurantTitle)
        .get();
      const uid = snapshot.docs[0].id;

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
        console.log(dish);
      });
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
